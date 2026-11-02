<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;
use verbb\backinstock\queue\jobs\SendEmailNotification;
use verbb\backinstock\records\Log as LogRecord;

use Craft;
use craft\base\Component;
use craft\errors\InvalidFieldException;
use craft\helpers\App;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\mail\Message;

use Throwable;

use craft\commerce\elements\Variant;

class Service extends Component
{
    // Public Methods
    // =========================================================================

    public function isVariantInStock(Variant $variant): bool
    {
        // Registration has always used Commerce's answer without the threshold, so only a stock field changes it.
        if ($this->_getStockFieldHandle() === null) {
            return $variant->hasStock();
        }

        return $this->_isAboveStockThreshold($variant);
    }

    public function isBackInStock(Variant $variant): bool
    {
        if (!$variant->id) {
            return false;
        }

        $hasStockField = $this->_getStockFieldHandle() !== null;

        // Propagated saves repeat the change for other sites, and would otherwise notify customers again.
        if ($hasStockField && $variant->propagating) {
            return false;
        }

        // Get the saved (original) variant. Field values can differ per site, so compare against the site being saved.
        $original = $hasStockField ? Variant::findOne(['id' => $variant->id, 'siteId' => $variant->siteId]) : Variant::findOne($variant->id);

        if (!$original) {
            return false;
        }

        $wasOutOfStock = !$this->_isAboveStockThreshold($original);
        $isNowInStock = $this->_isAboveStockThreshold($variant);

        if ($wasOutOfStock && $isNowInStock) {
            $this->findInterestedEmails($variant->id);

            return true;
        }

        return false;
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
        $originalLanguage = $log->locale ? $log->locale : Craft::$app->language;
        Craft::$app->language = $originalLanguage;

        if (strpos($templatePath, 'craft-commerce-back-in-stock/emails') !== false) {
            $view->setTemplateMode($view::TEMPLATE_MODE_CP);
        } else {
            $view->setTemplateMode($view::TEMPLATE_MODE_SITE);
        }

        if (!$log->variantId) {
            $error = Craft::t('craft-commerce-back-in-stock', 'Could not find Variant for Back In Stock Notification email.');

            BackInStock::error($error);

            $view->setTemplateMode($oldTemplateMode);

            return false;
        }

        $variant = Variant::findOne($log->variantId);

        if (!$variant) {
            $error = Craft::t('craft-commerce-back-in-stock', 'Could not find Variant for Back In Stock Notification email.');

            BackInStock::error($error);

            $view->setTemplateMode($oldTemplateMode);

            return false;
        }

        // making sure that the subject is correct for the preheader text
        $subject = Craft::t('craft-commerce-back-in-stock', $subject, [
            'variant' => $variant,
        ]);

        $subject = $view->renderString($subject, [
            'variant' => $variant,
        ]);

        // template variables
        $renderVariables = [
            'subject' => $subject,
            'variant' => $variant,
        ];

        // Add the log options, if available
        if ($log && is_string($log->options)) {
            $renderVariables['options'] = Json::decode($log->options);
        }

        $templatePath = $view->renderString($templatePath, $renderVariables);

        // validate that the email template exists
        if (!$view->doesTemplateExist($templatePath)) {
            $error = Craft::t('craft-commerce-back-in-stock', 'Email template does not exist at “{templatePath}”.', [
                'templatePath' => $templatePath,
            ]);

            BackInStock::error($error);

            $view->setTemplateMode($oldTemplateMode);

            return false;
        }

        $settings = BackInStock::$plugin->getSettings();

        // build the email
        $newEmail = new Message();
        $newEmail->setFrom([$settings->getFromEmail() => $settings->getFromName()]);
        $newEmail->setTo($log->email);
        $newEmail->setSubject($subject);
        $newEmail->setHtmlBody($view->renderTemplate($templatePath, $renderVariables));

        try {
            if (!Craft::$app->getMailer()->send($newEmail)) {
                $error = Craft::t('craft-commerce-back-in-stock', 'Back In Stock email “{email}” could not be sent');

                BackInStock::error($error);

                $view->setTemplateMode($oldTemplateMode);

                return false;
            }
        } catch (Throwable $e) {
            $error = Craft::t('craft-commerce-back-in-stock', 'Back In Stock email could not be sent', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'order' => $order->id,
            ]);

            BackInStock::error($error);

            $view->setTemplateMode($oldTemplateMode);

            return false;
        }

        return true;
    }


    // Private Methods
    // =========================================================================

    private function _getStockFieldHandle(): ?string
    {
        $handle = trim(BackInStock::$plugin->getSettings()->stockFieldHandle ?? '');

        return $handle !== '' ? $handle : null;
    }

    private function _isAboveStockThreshold(Variant $variant): bool
    {
        $threshold = BackInStock::$plugin->getSettings()->stockThreshold;
        $handle = $this->_getStockFieldHandle();

        if ($handle === null) {
            return $variant->hasUnlimitedStock || $variant->stock > $threshold;
        }

        // The field replaces Commerce stock entirely, so a bad value must count as unavailable rather than fall back to it.
        try {
            $value = $variant->getFieldValue($handle);
        } catch (InvalidFieldException) {
            BackInStock::error("Stock field “{$handle}” is not available on variant {$variant->id}.");

            return false;
        }

        // Empty fields represent no stock.
        if ($value === null || $value === '') {
            $value = 0;
        }

        if (!is_numeric($value) || !is_finite((float)$value)) {
            BackInStock::error("Stock field “{$handle}” must contain a numeric quantity on variant {$variant->id}.");

            return false;
        }

        return floor((float)$value) > $threshold;
    }
}
