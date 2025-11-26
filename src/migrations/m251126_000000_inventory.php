<?php
namespace verbb\backinstock\migrations;

use Craft;
use craft\db\Migration;

class m251126_000000_inventory extends Migration
{
    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        $this->archiveTableIfExists('{{%backinstock_inventory}}');
        $this->createTable('{{%backinstock_inventory}}', [
            'id' => $this->primaryKey(),
            'variantId' => $this->integer()->notNull(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        $this->createIndex(null, '{{%backinstock_inventory}}', ['variantId'], false);

        if ($this->db->tableExists('{{%commerce_variants}}')) {
            $this->addForeignKey(null, '{{%backinstock_inventory}}', ['variantId'], '{{%commerce_variants}}', ['id'], 'CASCADE', 'CASCADE');
        }

        return true;
    }

    public function safeDown(): bool
    {
        echo "m251126_000000_inventory cannot be reverted.\n";
        return false;
    }
}