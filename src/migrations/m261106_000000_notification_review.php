<?php
namespace verbb\backinstock\migrations;

use craft\db\Migration;

class m261106_000000_notification_review extends Migration
{
    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        // Records when a store manager dealt with a notification's failed or unconfirmed sends.
        if (!$this->db->columnExists('{{%backinstock_runs}}', 'reviewedAt')) {
            $this->addColumn('{{%backinstock_runs}}', 'reviewedAt', $this->dateTime()->after('nextBatchAt'));
        }

        return true;
    }

    public function safeDown(): bool
    {
        echo "m261106_000000_notification_review cannot be reverted.\n";

        return false;
    }
}
