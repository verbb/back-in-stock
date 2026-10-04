<?php
namespace verbb\backinstock\records;

use craft\db\ActiveRecord;

/**
 * @deprecated in 4.2.0. Commerce inventory is authoritative; use [[\verbb\backinstock\records\RestockRun]] for availability history.
 */
class Inventory extends ActiveRecord
{
    // Public Methods
    // =========================================================================

    public static function tableName(): string
    {
        return '{{%backinstock_inventory}}';
    }
}
