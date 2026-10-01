<?php
namespace verbb\backinstock\migrations;

use Craft;
use craft\db\Migration;

class m261001_000000_add_site_id extends Migration
{
    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        if (!$this->db->columnExists('{{%backinstock_records}}', 'siteId')) {
            $this->addColumn('{{%backinstock_records}}', 'siteId', $this->integer()->after('variantId'));
        }

        // Existing requests were resolved in the primary-site context before site provenance was stored.
        $this->update('{{%backinstock_records}}', [
            'siteId' => Craft::$app->getSites()->getPrimarySite()->id,
        ], ['siteId' => null]);

        $this->alterColumn('{{%backinstock_records}}', 'siteId', $this->integer()->notNull());
        $this->createIndex(null, '{{%backinstock_records}}', ['siteId'], false);
        $this->addForeignKey(null, '{{%backinstock_records}}', ['siteId'], '{{%sites}}', ['id'], 'CASCADE', 'CASCADE');

        return true;
    }

    public function safeDown(): bool
    {
        echo "m261001_000000_add_site_id cannot be reverted.\n";
        return false;
    }
}
