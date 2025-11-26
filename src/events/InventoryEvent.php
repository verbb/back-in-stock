<?php
namespace verbb\backinstock\events;

use verbb\backinstock\models\Inventory;

use yii\base\Event;

class InventoryEvent extends Event
{
    // Properties
    // =========================================================================

    public Inventory $inventory;
    public bool $isNew = false;

}
