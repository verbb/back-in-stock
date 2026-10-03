<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Inventory;
use verbb\backinstock\models\Settings;
use verbb\backinstock\queue\jobs\SendEmailNotification;
use verbb\backinstock\records\Log as LogRecord;

use Craft;
use craft\base\Component;
use craft\helpers\App;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\mail\Message;

use yii\web\TooManyRequestsHttpException;

use Throwable;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\events\UpdateInventoryLevelEvent;

class Service extends Component
{
    // Constants
    // =========================================================================

    private const REGISTRATION_ATTEMPT_LIMIT = 10;
    private const REGISTRATION_ATTEMPT_WINDOW = 300;
    private const REGISTRATION_RATE_LIMIT_CACHE_PREFIX = 'back-in-stock:registration-rate-limit:';
    private const REGISTRATION_RATE_LIMIT_MUTEX_PREFIX = 'back-in-stock:registration-rate-limit-lock:';


    // Public Methods
    // =========================================================================

    public function checkInventoryLevel(UpdateInventoryLevelEvent $event): bool
    {
        $variant = $event->updateInventoryLevel->getInventoryItem()?->getPurchasable();

        if (!$variant instanceof Variant || !$variant->id) {
            return false;
        }

        return $this->syncVariantStockState($variant);
    }

    public function syncVariantStockState(Variant $variant): bool
    {
        if (!$variant->id) {
            return false;
        }

        $isNowInStock = $this->isVariantInStock($variant);
        $isOutOfStock = !$isNowInStock;

        $outOfStockRecord = BackInStock::$plugin->getInventory()->getInventoryByVariantId($variant->id);

        if ($isOutOfStock && !$outOfStockRecord) {
            $inventory = new Inventory([
                'variantId' => $variant->id,
            ]);

            BackInStock::$plugin->getInventory()->saveInventory($inventory);

            return false;
        }

        if ($isNowInStock && $outOfStockRecord) {
            BackInStock::$plugin->getInventory()->deleteInventory($outOfStockRecord);

            $this->findInterestedEmails($variant->id);

            return true;
        }

        return false;
    }

    public function isVariantInStock(Variant $variant): bool
    {
        $settings = BackInStock::$plugin->getSettings();
        $hasStock = ($variant->hasUnlimitedStock || $variant->stock > $settings->stockThreshold);

        return ($hasStock && (!$settings->includeAvailableForPurchase || $variant->availableForPurchase));
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

    public function findInterestedEmails(int $variantId): void
    {
        $logs = LogRecord::find()->where([
            'variantId' => $variantId,
            'isNotified' => false,
        ])->all();

        if ($logs) {
            $template = BackInStock::$plugin->getSettings()->getEmailTemplate();
            $subject = BackInStock::$plugin->getSettings()->emailSubject;

            // Add all emails to send to the queue
            foreach ($logs as $log) {
                Craft::$app->getQueue()->push(new SendEmailNotification([
                    'confirmation' => false,
                    'logId' => $log->id,
                    'subject' => $subject,
                    'template' => $template,
                ]));
            }
        }
    }

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
            if (strpos($templatePath, 'craft-commerce-back-in-stock/emails') !== false) {
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
