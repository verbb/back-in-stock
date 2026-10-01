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

use Throwable;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\events\UpdateInventoryLevelEvent;

class Service extends Component
{
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
}
