<?php
namespace verbb\backinstock\models;

use verbb\backinstock\records\Inventory as InventoryRecord;

use Craft;
use craft\base\Model;
use craft\helpers\App;
use craft\helpers\Json;

use DateTime;

use yii\validators\InlineValidator;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;

class Inventory extends Model
{
    // Properties
    // =========================================================================

    public ?string $id = null;
    public ?int $variantId = null;
    public ?DateTime $dateCreated = null;
    public ?DateTime $dateUpdated = null;
    public ?string $uid = null;


    // Public Methods
    // =========================================================================

    public function defineRules(): array
    {
        $rules = parent::defineRules();
        $rules[] = [['variantId'], 'number', 'integerOnly' => true];
        $rules[] = [['variantId'], 'validateVariant'];

        return $rules;
    }

    public function getVariant(): ?Variant
    {
        if ($this->variantId) {
            return Variant::findOne($this->variantId);
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
    }

}
