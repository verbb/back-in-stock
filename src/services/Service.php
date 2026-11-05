<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;
use verbb\backinstock\events\SubscriptionMessageEvent;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Inventory;
use verbb\backinstock\models\Settings;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\queue\jobs\SendEmailNotification;
use verbb\backinstock\records\Log as LogRecord;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;
use verbb\backinstock\queue\jobs\EvaluateAvailability;

use Craft;
use craft\base\Component;
use craft\errors\InvalidFieldException;
use craft\helpers\App;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\mail\Message;

use yii\base\InvalidConfigException;
use yii\web\TooManyRequestsHttpException;

use Throwable;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\events\InventoryMovementEvent;
use craft\commerce\events\UpdateInventoryLevelEvent;
use craft\commerce\Plugin as Commerce;

class Service extends Component
{
    // Constants
    // =========================================================================

    public const EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE = 'beforeSendSubscriptionMessage';

    private const REGISTRATION_ATTEMPT_LIMIT = 10;
    private const REGISTRATION_ATTEMPT_WINDOW = 300;
    private const REGISTRATION_RATE_LIMIT_CACHE_PREFIX = 'back-in-stock:registration-rate-limit:';
    private const REGISTRATION_RATE_LIMIT_MUTEX_PREFIX = 'back-in-stock:registration-rate-limit-lock:';


    // Public Methods
    // =========================================================================

    public function checkInventoryLevel(UpdateInventoryLevelEvent $event): bool
    {
        $variantId = $event->updateInventoryLevel->getInventoryItem()?->purchasableId;

        return $variantId && $this->_queueDemandEvaluations((int)$variantId);
    }

    public function checkInventoryMovement(InventoryMovementEvent $event): bool
    {
        $variantId = $event->inventoryMovement->getInventoryItem()?->purchasableId;

        return $variantId && $this->_queueDemandEvaluations((int)$variantId);
    }

    public function syncVariantStockState(Variant $variant): bool
    {
        // ERP and catalogue syncs save every variant per site, so skip those nobody depends on.
        if (!$variant->id || !$this->_hasAvailabilityDemand($variant->id)) {
            return false;
        }

        return $this->queueVariantEvaluation($variant);
    }

    public function queueVariantEvaluation(Variant $variant): bool
    {
        if (!$variant->id || !$variant->siteId) {
            return false;
        }

        Craft::$app->getQueue()->push(new EvaluateAvailability([
            'variantId' => $variant->id,
            'siteId' => $variant->siteId,
        ]));

        return true;
    }

    public function isVariantInStock(Variant $variant): bool
    {
        $settings = BackInStock::$plugin->getSettings();

        try {
            $stock = $this->getVariantStock($variant);
        } catch (InvalidConfigException $exception) {
            Craft::error($exception->getMessage(), __METHOD__);

            return false;
        }

        $hasStock = ($stock === null || $stock > $settings->stockThreshold);

        return ($hasStock && (!$settings->includeAvailableForPurchase || $variant->availableForPurchase));
    }

    /**
     * Returns whole available units, or null for unlimited native inventory.
     * A configured custom field remains authoritative even when Commerce allows backorders.
     */
    public function getVariantStock(Variant $variant): ?int
    {
        $handle = trim(BackInStock::$plugin->getSettings()->stockFieldHandle ?? '');

        if ($handle === '') {
            return $variant->getHasUnlimitedStock() ? null : $variant->getStock();
        }

        try {
            $value = $variant->getFieldValue($handle);
        } catch (InvalidFieldException $exception) {
            throw new InvalidConfigException("Stock field “{$handle}” is not available on variant {$variant->id}.", 0, $exception);
        }

        // Empty fields represent no stock; malformed values must never fall back to unlimited inventory.
        if ($value === null || $value === '') {
            return 0;
        }

        if (!is_numeric($value) || !is_finite((float)$value) || $value >= PHP_INT_MAX || $value < PHP_INT_MIN) {
            throw new InvalidConfigException("Stock field “{$handle}” must contain a finite numeric quantity on variant {$variant->id}.");
        }

        return (int)floor((float)$value);
    }

    public function getLiveVariant(int $variantId, int $siteId): ?Variant
    {
        return Variant::find()
            ->id($variantId)
            ->siteId($siteId)
            ->productStatus(Product::STATUS_LIVE)
            ->one();
    }

    public function enforceRegistrationRateLimit(?string $email): void
    {
        $request = Craft::$app->getRequest();

        if ($request->getIsConsoleRequest()) {
            return;
        }

        $identities = [
            hash('sha256', 'peer:' . ($request->getRemoteIP() ?: 'unknown')),
            hash('sha256', 'recipient:' . Log::normalizeRecipient($email)),
        ];
        $cacheKeys = array_map(fn(string $identity) => self::REGISTRATION_RATE_LIMIT_CACHE_PREFIX . $identity, $identities);
        $mutexKeys = array_map(fn(string $identity) => self::REGISTRATION_RATE_LIMIT_MUTEX_PREFIX . $identity, $identities);
        // A stable order prevents requests sharing only one identity from deadlocking each other.
        sort($mutexKeys, SORT_STRING);
        $acquiredMutexKeys = [];

        try {
            $mutex = Craft::$app->getMutex();

            foreach ($mutexKeys as $mutexKey) {
                if (!($mutex?->acquire($mutexKey, 0) ?? false)) {
                    $this->_rejectRegistrationAttempt(1);
                }

                $acquiredMutexKeys[] = $mutexKey;
            }

            $cache = Craft::$app->getCache();
            $now = time();
            $entries = [];
            $retryAfter = 0;

            foreach ($cacheKeys as $cacheKey) {
                $storedEntry = $cache->get($cacheKey);
                $isCurrentEntry = is_array($storedEntry) &&
                    isset($storedEntry['count'], $storedEntry['resetAt']) &&
                    (int)$storedEntry['resetAt'] > $now;
                $entry = $isCurrentEntry ? $storedEntry : [
                    'count' => 0,
                    'resetAt' => $now + self::REGISTRATION_ATTEMPT_WINDOW,
                ];
                $entries[$cacheKey] = $entry;

                if ((int)$entry['count'] >= self::REGISTRATION_ATTEMPT_LIMIT) {
                    $retryAfter = max($retryAfter, (int)$entry['resetAt'] - $now);
                }
            }

            if ($retryAfter > 0) {
                $this->_rejectRegistrationAttempt($retryAfter);
            }

            foreach ($entries as $cacheKey => $entry) {
                $entry['count'] = (int)$entry['count'] + 1;
                $duration = max(1, (int)$entry['resetAt'] - $now);

                if (!$cache->set($cacheKey, $entry, $duration) || $cache->get($cacheKey) !== $entry) {
                    $this->_rejectRegistrationAttempt(1);
                }
            }
        } catch (TooManyRequestsHttpException $e) {
            throw $e;
        } catch (Throwable) {
            $this->_rejectRegistrationAttempt(1);
        } finally {
            foreach (array_reverse($acquiredMutexKeys) as $mutexKey) {
                try {
                    $mutex?->release($mutexKey);
                } catch (Throwable) {
                    // The mutex will be released automatically when the request ends.
                }
            }
        }
    }

    /**
     * @deprecated in 4.2.0. Use [[queueVariantEvaluation()]] instead.
     */
    public function findInterestedEmails(int $variantId): void
    {
        $subscription = Subscription::find()
            ->where(['variantId' => $variantId, 'state' => \verbb\backinstock\models\Subscription::STATE_ACTIVE])
            ->orderBy(['id' => SORT_ASC])
            ->one();

        if ($subscription) {
            $variant = $this->getLiveVariant($variantId, $subscription->siteId);

            if ($variant) {
                $this->queueVariantEvaluation($variant);
            }
        }
    }

    public function sendSubscriptionMessage(Subscription $subscription, string $messageKey, ?string $templatePath = null, ?string $subject = null, array $variables = []): array
    {
        $site = Craft::$app->getSites()->getSiteById($subscription->siteId);
        $variant = $site ? $this->getLiveVariant($subscription->variantId, $site->id) : null;

        if (!$site || !$variant) {
            return ['status' => 'failed', 'code' => 'variant-unavailable', 'message' => 'The subscribed variant or site could not be loaded.'];
        }

        $variables += [
            'variant' => $variant,
            'subscription' => $subscription,
            'options' => is_string($subscription->options) ? Json::decodeIfJson($subscription->options) : $subscription->options,
            'cancelUrl' => BackInStock::$plugin->getSubscriptions()->getCancellationUrl($subscription),
        ];
        $settings = BackInStock::$plugin->getSettings();
        $message = null;

        try {
            if ($templatePath) {
                $view = Craft::$app->getView();
                $oldTemplateMode = $view->getTemplateMode();
                $sites = Craft::$app->getSites();
                $originalSite = $sites->getCurrentSite();
                $originalLanguage = Craft::$app->language;

                try {
                    $sites->setCurrentSite($site);
                    Craft::$app->language = $subscription->locale ?: $site->language;
                    $view->setTemplateMode(str_contains($templatePath, 'craft-commerce-back-in-stock/emails') ? $view::TEMPLATE_MODE_CP : $view::TEMPLATE_MODE_SITE);
                    $renderedTemplate = BackInStock::$plugin->getTemplates()->renderSandboxedString($templatePath, $variables);

                    if (!$view->doesTemplateExist($renderedTemplate)) {
                        return ['status' => 'failed', 'code' => 'template-missing', 'message' => "Email template does not exist at $renderedTemplate."];
                    }

                    $renderedSubject = BackInStock::$plugin->getTemplates()->renderSandboxedString((string)$subject, $variables);
                    $variables['subject'] = $renderedSubject;
                    $message = new Message();
                    $message->setSubject($renderedSubject);
                    $message->setHtmlBody($view->renderTemplate($renderedTemplate, $variables));
                } finally {
                    $view->setTemplateMode($oldTemplateMode);
                    $sites->setCurrentSite($originalSite);
                    Craft::$app->language = $originalLanguage;
                }
            } else {
                $message = Craft::$app->getMailer()->composeFromKey($messageKey, $variables);
            }

            $message->siteId = $site->id;
            $message->language = $subscription->locale ?: $site->language;
            $message->setTo($subscription->email);

            if ($settings->getFromEmail()) {
                $message->setFrom([$settings->getFromEmail() => $settings->getFromName()]);
            }

            $event = new SubscriptionMessageEvent([
                'subscription' => $subscription,
                'variant' => $variant,
                'message' => $message,
                'messageKey' => $messageKey,
            ]);
            $this->trigger(self::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $event);

            if (!$event->isValid) {
                return ['status' => 'cancelled', 'code' => 'send-cancelled', 'message' => 'Message delivery was cancelled by an event listener.'];
            }

            if (!Craft::$app->getMailer()->send($message)) {
                return ['status' => 'failed', 'code' => 'mailer-rejected', 'message' => $message->error?->getMessage() ?? 'The mailer did not accept the message.'];
            }

            return ['status' => 'sent', 'code' => null, 'message' => null];
        } catch (Throwable $e) {
            BackInStock::error($e->getMessage());

            return ['status' => 'unknown', 'code' => 'mailer-exception', 'message' => mb_substr($e->getMessage(), 0, 1024)];
        }
    }

    /**
     * @deprecated in 4.2.0. Use [[sendSubscriptionMessage()]] instead.
     */
    public function sendMail(LogRecord $log, string $subject, ?string $templatePath = null): bool
    {
        $view = Craft::$app->getView();
        $oldTemplateMode = $view->getTemplateMode();
        $sites = Craft::$app->getSites();
        $originalSite = $sites->getCurrentSite();
        $originalLanguage = Craft::$app->language;

        $site = $log->siteId ? $sites->getSiteById($log->siteId) : null;

        if (!$log->variantId || !$site) {
            $error = Craft::t('craft-commerce-back-in-stock', 'Could not find Variant for Back In Stock Notification email.');

            BackInStock::error($error);

            return false;
        }

        $variant = $this->getLiveVariant($log->variantId, $site->id);

        if (!$variant) {
            $error = Craft::t('craft-commerce-back-in-stock', 'Could not find Variant for Back In Stock Notification email.');

            BackInStock::error($error);

            return false;
        }

        $sites->setCurrentSite($site);
        Craft::$app->language = $log->locale ?: $site->language;

        try {
            if (str_contains((string)$templatePath, 'craft-commerce-back-in-stock/emails')) {
                $view->setTemplateMode($view::TEMPLATE_MODE_CP);
            } else {
                $view->setTemplateMode($view::TEMPLATE_MODE_SITE);
            }

            // Make sure that the subject is correct for the preheader text.
            $subject = Craft::t('craft-commerce-back-in-stock', $subject, [
                'variant' => $variant,
            ]);

            $subject = BackInStock::$plugin->getTemplates()->renderSandboxedString($subject, [
                'variant' => $variant,
            ]);

            // Template variables
            $renderVariables = [
                'subject' => $subject,
                'variant' => $variant,
            ];

            // Add the log options, if available.
            if ($log && is_string($log->options)) {
                $renderVariables['options'] = Json::decode($log->options);
            }

            $templatePath = BackInStock::$plugin->getTemplates()->renderSandboxedString($templatePath, $renderVariables);

            // Validate that the email template exists.
            if (!$view->doesTemplateExist($templatePath)) {
                $error = Craft::t('craft-commerce-back-in-stock', 'Email template does not exist at “{templatePath}”.', [
                    'templatePath' => $templatePath,
                ]);

                BackInStock::error($error);

                return false;
            }

            $settings = BackInStock::$plugin->getSettings();

            // Build the email.
            $newEmail = new Message();
            $newEmail->setFrom([$settings->getFromEmail() => $settings->getFromName()]);
            $newEmail->setTo($log->email);
            $newEmail->setSubject($subject);
            $newEmail->setHtmlBody($view->renderTemplate($templatePath, $renderVariables));

            try {
                if (!Craft::$app->getMailer()->send($newEmail)) {
                    $error = Craft::t('craft-commerce-back-in-stock', 'Back In Stock email “{email}” could not be sent');

                    BackInStock::error($error);

                    return false;
                }
            } catch (Throwable $e) {
                $error = Craft::t('craft-commerce-back-in-stock', 'Back In Stock email could not be sent', [
                    'error' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]);

                BackInStock::error($error);

                return false;
            }

            return true;
        } finally {
            $view->setTemplateMode($oldTemplateMode);
            $sites->setCurrentSite($originalSite);
            Craft::$app->language = $originalLanguage;
        }
    }


    // Private Methods
    // =========================================================================

    /**
     * Inventory events aren't tied to a site, and the current site says nothing about which stores the change affects.
     * Every completed order moves stock, so this also queues nothing unless a subscriber or an open run depends on the result.
     */
    private function _queueDemandEvaluations(int $variantId): bool
    {
        $siteIds = Subscription::find()
            ->select('siteId')
            ->distinct()
            ->where(['variantId' => $variantId, 'state' => SubscriptionModel::STATE_ACTIVE])
            ->column();
        $openStoreIds = RestockRun::find()
            ->select('storeId')
            ->where(['variantId' => $variantId])
            ->andWhere(['not', ['availabilityKey' => null]])
            ->column();
        $stores = Commerce::getInstance()->getStores();

        // A run with nobody left waiting still has to close when its store sells out.
        foreach ($openStoreIds as $storeId) {
            $store = $stores->getStoreById((int)$storeId);

            if ($store) {
                array_push($siteIds, ...$stores->getAllSitesForStore($store)->pluck('id')->all());
            }
        }

        $siteIds = array_unique(array_map('intval', $siteIds));

        foreach ($siteIds as $siteId) {
            Craft::$app->getQueue()->push(new EvaluateAvailability([
                'variantId' => $variantId,
                'siteId' => $siteId,
            ]));
        }

        return $siteIds !== [];
    }

    private function _hasAvailabilityDemand(int $variantId): bool
    {
        return Subscription::find()->where(['variantId' => $variantId, 'state' => SubscriptionModel::STATE_ACTIVE])->exists()
            || RestockRun::find()->where(['variantId' => $variantId])->andWhere(['not', ['availabilityKey' => null]])->exists();
    }

    private function _rejectRegistrationAttempt(int $retryAfter): never
    {
        try {
            Craft::$app->getResponse()->getHeaders()->set('Retry-After', (string)max(1, $retryAfter));
        } catch (Throwable) {
            // Rate limiting remains fail-closed if response headers cannot be updated.
        }

        throw new TooManyRequestsHttpException(Craft::t('craft-commerce-back-in-stock', 'Too many notification requests. Please try again later.'));
    }
}
