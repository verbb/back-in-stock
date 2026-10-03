<?php
namespace verbb\backinstock\models;

use verbb\backinstock\BackInStock;
use verbb\backinstock\records\Log as LogRecord;

use Craft;
use craft\base\Model;
use craft\helpers\App;
use craft\helpers\Json;

use DateTime;
use JsonException;

use yii\validators\InlineValidator;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;

class Log extends Model
{
    // Static Methods
    // =========================================================================

    public static function normalizeRecipient(?string $email): string
    {
        $email = trim($email ?? '');

        if ($email === '' || !mb_check_encoding($email, 'UTF-8')) {
            return '';
        }

        $separatorPosition = strrpos($email, '@');

        if ($separatorPosition === false) {
            return strtolower($email);
        }

        $localPart = strtolower(substr($email, 0, $separatorPosition));
        $domain = substr($email, $separatorPosition + 1);

        if (function_exists('idn_to_ascii')) {
            $asciiDomain = idn_to_ascii($domain, IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46);

            if ($asciiDomain === false) {
                return '';
            }

            $domain = $asciiDomain;
        } elseif (preg_match('/[^\x20-\x7E]/', $domain)) {
            return '';
        }

        return $localPart . '@' . strtolower($domain);
    }

    public static function createPendingKey(?string $email, ?int $variantId, ?int $siteId, ?string $locale): ?string
    {
        $email = self::normalizeRecipient($email);

        if ($email === '' || !$variantId || !$siteId) {
            return null;
        }

        // Options provide template context but must not create unbounded subscription identities.
        return hash('sha256', Json::encode([
            'email' => $email,
            'variantId' => $variantId,
            'siteId' => $siteId,
            'locale' => $locale,
        ]));
    }


    // Constants
    // =========================================================================

    public const MAX_OPTIONS_BYTES = 8192;
    public const MAX_OPTIONS_DEPTH = 8;


    // Properties
    // =========================================================================

    public ?string $id = null;
    public ?int $variantId = null;
    public ?int $siteId = null;
    public ?string $locale = null;
    public array $options = [];
    public bool $isNotified = false;
    public ?string $pendingKey = null;
    public ?DateTime $dateCreated = null;
    public ?DateTime $dateUpdated = null;
    public ?string $uid = null;

    private ?string $_email = null;
    private ?Variant $_variant = null;
    private ?string $_optionsError = null;
    private bool $_hasDuplicateError = false;


    // Public Methods
    // =========================================================================

    public function beforeValidate(): bool
    {
        $this->_hasDuplicateError = false;

        return parent::beforeValidate();
    }

    public function defineRules(): array
    {
        $rules = parent::defineRules();
        $rules[] = [['email', 'variantId'], 'required'];
        $rules[] = [['email'], 'email', 'enableIDN' => App::supportsIdn(), 'enableLocalIDN' => false];
        $rules[] = [['variantId', 'siteId'], 'number', 'integerOnly' => true];
        $rules[] = [['variantId'], 'validateVariant'];
        $rules[] = [['variantId'], 'validateLog'];
        $rules[] = [['options'], 'validateOptions', 'skipOnEmpty' => false];

        return $rules;
    }

    public function getEmail(): ?string
    {
        return $this->_email;
    }

    public function setEmail(?string $email): void
    {
        $this->_email = trim(strtolower($email));
    }

    public function setOptionsFromRequest(mixed $options): void
    {
        $this->_optionsError = null;
        $this->options = [];

        if ($options === null || $options === '') {
            return;
        }

        if (!is_string($options) || strlen($options) > self::MAX_OPTIONS_BYTES || !str_starts_with(ltrim($options), '{')) {
            $this->_optionsError = Craft::t('craft-commerce-back-in-stock', 'Options must be a valid JSON object no larger than 8 KB.');
            return;
        }

        try {
            $decoded = json_decode($options, true, self::MAX_OPTIONS_DEPTH, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            $this->_optionsError = Craft::t('craft-commerce-back-in-stock', 'Options must be a valid JSON object no larger than 8 KB.');
            return;
        }

        if (!is_array($decoded)) {
            $this->_optionsError = Craft::t('craft-commerce-back-in-stock', 'Options must be a valid JSON object no larger than 8 KB.');
            return;
        }

        $this->options = $decoded;
    }

    public function getPendingIdentityKey(): ?string
    {
        if ($this->isNotified) {
            return null;
        }

        return self::createPendingKey($this->getEmail(), $this->variantId, $this->siteId, $this->locale);
    }

    public function getHasOnlyDuplicateError(): bool
    {
        return $this->_hasDuplicateError && count($this->getErrors()) === 1 && count($this->getErrors('variantId')) === 1;
    }

    public function markAsDuplicate(): void
    {
        if (!$this->_hasDuplicateError) {
            $this->_hasDuplicateError = true;
            $this->addError('variantId', Craft::t('craft-commerce-back-in-stock', 'Your email is already subscribed to receive updates for this product.'));
        }
    }

    public function getVariant(): ?Variant
    {
        if ($this->variantId) {
            $this->siteId ??= Craft::$app->getSites()->getCurrentSite()->id;

            // Reuse the live variant that passed validation for the immediate response. Email delivery revalidates it independently.
            if (!$this->_variant || $this->_variant->id !== $this->variantId || $this->_variant->siteId !== $this->siteId) {
                $this->_variant = BackInStock::$plugin->getService()->getLiveVariant($this->variantId, $this->siteId);
            }

            return $this->_variant;
        }

        return null;
    }

    public function getProduct(): ?Product
    {
        if ($variant = $this->getVariant()) {
            return $variant->getProduct();
        }

        return null;
    }

    public function validateVariant(string $attribute, ?array $params, InlineValidator $validator): void
    {
        $variant = $this->getVariant();

        if (!$variant) {
            $validator->addError($this, $attribute, Craft::t('craft-commerce-back-in-stock', 'Unable to find variant.'), $params);
        }

        if ($variant && BackInStock::$plugin->getService()->isVariantInStock($variant)) {
            $validator->addError($this, $attribute, Craft::t('craft-commerce-back-in-stock', 'Variant is in stock.'), $params);
        }
    }

    public function validateLog(string $attribute, ?array $params, InlineValidator $validator): void
    {
        $pendingKey = $this->getPendingIdentityKey();

        if (!$pendingKey) {
            return;
        }

        $duplicateQuery = LogRecord::find()->where(['pendingKey' => $pendingKey]);

        if ($this->id) {
            $duplicateQuery->andWhere(['not', ['id' => $this->id]]);
        }

        if ($duplicateQuery->exists()) {
            $this->markAsDuplicate();
        }
    }

    public function validateOptions(string $attribute, ?array $params, InlineValidator $validator): void
    {
        if ($this->_optionsError || strlen(Json::encode($this->options)) > self::MAX_OPTIONS_BYTES || $this->_optionsDepth($this->options) > self::MAX_OPTIONS_DEPTH) {
            $validator->addError($this, $attribute, $this->_optionsError ?? Craft::t('craft-commerce-back-in-stock', 'Options must be a valid JSON object no larger than 8 KB.'), $params);
        }
    }


    // Private Methods
    // =========================================================================

    private function _optionsDepth(array $options, int $depth = 1): int
    {
        $maximumDepth = $depth;

        foreach ($options as $value) {
            if (is_array($value)) {
                $maximumDepth = max($maximumDepth, $this->_optionsDepth($value, $depth + 1));
            }
        }

        return $maximumDepth;
    }

}
