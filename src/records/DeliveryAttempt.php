<?php
namespace verbb\backinstock\records;

use craft\db\ActiveRecord;

class DeliveryAttempt extends ActiveRecord
{
    // Public Methods
    // =========================================================================

    public static function tableName(): string
    {
        return '{{%backinstock_delivery_attempts}}';
    }
}
