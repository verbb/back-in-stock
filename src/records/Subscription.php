<?php
namespace verbb\backinstock\records;

use craft\db\ActiveRecord;

class Subscription extends ActiveRecord
{
    // Public Methods
    // =========================================================================

    public static function tableName(): string
    {
        return '{{%backinstock_records}}';
    }

    public function getVariant(): mixed
    {
        return $this->hasOne(\craft\commerce\records\Variant::class, ['id' => 'variantId']);
    }
}
