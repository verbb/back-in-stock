<?php
namespace verbb\backinstock\services;

use verbb\backinstock\events\InventoryEvent;
use verbb\backinstock\models\Inventory as InventoryModel;
use verbb\backinstock\records\Inventory as InventoryRecord;

use Craft;
use craft\base\MemoizableArray;
use craft\db\Query;
use craft\helpers\ArrayHelper;
use craft\helpers\Db;
use craft\helpers\Json;

use yii\base\Component;

use Exception;
use Throwable;

class Inventory extends Component
{
    // Constants
    // =========================================================================

    public const EVENT_BEFORE_SAVE_INVENTORY = 'beforeSaveInventory';
    public const EVENT_AFTER_SAVE_INVENTORY = 'afterSaveInventory';
    public const EVENT_BEFORE_DELETE_INVENTORY = 'beforeDeleteInventory';
    public const EVENT_AFTER_DELETE_INVENTORY = 'afterDeleteInventory';


    // Properties
    // =========================================================================

    private ?MemoizableArray $_inventory = null;


    // Public Methods
    // =========================================================================

    public function getAllInventorys(): array
    {
        return $this->_inventory()->all();
    }

    public function getInventoryById(int $id): ?InventoryModel
    {
        return $this->_inventory()->firstWhere('id', $id);
    }

    public function getInventoryByVariantId(int $variantId): ?InventoryModel
    {
        return $this->_inventory()->firstWhere('variantId', $variantId);
    }

    public function getInventoryByUid(string $uid): ?InventoryModel
    {
        return $this->_inventory()->firstWhere('uid', $uid, true);
    }

    public function saveInventory(InventoryModel $inventory, bool $runValidation = true): bool
    {
        $isNewInventory = !$inventory->id;

        // Fire a 'beforeSaveInventory' event
        if ($this->hasEventHandlers(self::EVENT_BEFORE_SAVE_INVENTORY)) {
            $this->trigger(self::EVENT_BEFORE_SAVE_INVENTORY, new InventoryEvent([
                'inventory' => $inventory,
                'isNew' => $isNewInventory,
            ]));
        }

        if ($runValidation && !$inventory->validate()) {
            Craft::info('Inventory not saved due to validation error.', __METHOD__);
            return false;
        }

        $inventoryRecord = $this->_getInventoryRecordById($inventory->id);
        $inventoryRecord->variantId = $inventory->variantId;

        $inventoryRecord->save(false);

        if (!$inventory->id) {
            $inventory->id = $inventoryRecord->id;
        }

        // Fire an 'afterSaveInventory' event
        if ($this->hasEventHandlers(self::EVENT_AFTER_SAVE_INVENTORY)) {
            $this->trigger(self::EVENT_AFTER_SAVE_INVENTORY, new InventoryEvent([
                'inventory' => $inventory,
                'isNew' => $isNewInventory,
            ]));
        }

        return true;
    }

    public function deleteInventoryById(int $id): bool
    {
        $inventory = $this->getInventoryById($id);

        if (!$inventory) {
            return false;
        }

        return $this->deleteInventory($inventory);
    }

    public function deleteInventory(InventoryModel $inventory): bool
    {
        // Fire a 'beforeDeleteInventory' event
        if ($this->hasEventHandlers(self::EVENT_BEFORE_DELETE_INVENTORY)) {
            $this->trigger(self::EVENT_BEFORE_DELETE_INVENTORY, new InventoryEvent([
                'inventory' => $inventory,
            ]));
        }

        Db::delete('{{%backinstock_inventory}}', [
            'uid' => $inventory->uid,
        ]);

        // Fire a 'afterDeleteInventory' event
        if ($this->hasEventHandlers(self::EVENT_AFTER_DELETE_INVENTORY)) {
            $this->trigger(self::EVENT_AFTER_DELETE_INVENTORY, new InventoryEvent([
                'inventory' => $inventory,
            ]));
        }

        return true;
    }


    // Private Methods
    // =========================================================================

    private function _inventory(): MemoizableArray
    {
        if (!isset($this->_inventory)) {
            $this->_inventory = new MemoizableArray(
                $this->_createInventoryQuery()->all(),
                fn(array $result) => new InventoryModel($result),
            );
        }

        return $this->_inventory;
    }

    private function _createInventoryQuery(): Query
    {
        return (new Query())
            ->select([
                'id',
                'variantId',
                'dateCreated',
                'dateUpdated',
                'uid',
            ])
            ->from(['{{%backinstock_inventory}}']);
    }

    private function _getInventoryRecordById(int $inventoryId = null): ?InventoryRecord
    {
        if ($inventoryId !== null) {
            $inventoryRecord = InventoryRecord::findOne(['id' => $inventoryId]);

            if (!$inventoryRecord) {
                throw new Exception(Craft::t('craft-commerce-back-in-stock', 'No inventory exists with the ID “{id}”.', ['id' => $inventoryId]));
            }
        } else {
            $inventoryRecord = new InventoryRecord();
        }

        return $inventoryRecord;
    }

}
