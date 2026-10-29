<?php
namespace verbb\backinstock\migrations;

use verbb\backinstock\BackInStock;

use Craft;
use craft\db\Migration;

class Install extends Migration
{
    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        $this->createTables();
        $this->createIndexes();
        $this->createForeignKeys();

        return true;
    }

    public function safeDown(): bool
    {
        $this->dropForeignKeys();
        $this->dropTables();

        return true;
    }

    public function createTables(): void
    {
        $this->archiveTableIfExists('{{%backinstock_records}}');
        $this->createTable('{{%backinstock_records}}', [
            'id' => $this->primaryKey(),
            'email' => $this->string(255)->notNull()->defaultValue(''),
            'variantId' => $this->integer()->notNull(),
            'siteId' => $this->integer()->notNull(),
            'locale' => $this->string(255),
            'options' => $this->text(),
            'isNotified' => $this->boolean()->defaultValue(false),
            'pendingKey' => $this->char(64),
            'recipientKey' => $this->char(64)->notNull(),
            'userId' => $this->integer(),
            'storeId' => $this->integer()->notNull(),
            'state' => $this->string(32)->notNull()->defaultValue('active'),
            'activeKey' => $this->char(64),
            'verificationTokenHash' => $this->char(64),
            'verificationExpiresAt' => $this->dateTime(),
            'verifiedAt' => $this->dateTime(),
            'notifiedAt' => $this->dateTime(),
            'cancelledAt' => $this->dateTime(),
            'expiredAt' => $this->dateTime(),
            'cancelSource' => $this->string(32),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        $this->archiveTableIfExists('{{%backinstock_inventory}}');
        $this->createTable('{{%backinstock_inventory}}', [
            'id' => $this->primaryKey(),
            'variantId' => $this->integer()->notNull(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        $this->archiveTableIfExists('{{%backinstock_runs}}');
        $this->createTable('{{%backinstock_runs}}', [
            'id' => $this->primaryKey(),
            'variantId' => $this->integer()->notNull(),
            'storeId' => $this->integer()->notNull(),
            'status' => $this->string(32)->notNull()->defaultValue('open'),
            'availabilityKey' => $this->char(64),
            'observedStock' => $this->integer(),
            'notificationPolicy' => $this->string(32)->notNull(),
            'subscribersPerUnit' => $this->integer()->notNull()->defaultValue(1),
            'eligibleCount' => $this->integer()->notNull()->defaultValue(0),
            'selectedCount' => $this->integer()->notNull()->defaultValue(0),
            'sentCount' => $this->integer()->notNull()->defaultValue(0),
            'failedCount' => $this->integer()->notNull()->defaultValue(0),
            'cancelledCount' => $this->integer()->notNull()->defaultValue(0),
            'unknownCount' => $this->integer()->notNull()->defaultValue(0),
            'openedAt' => $this->dateTime()->notNull(),
            'lastEvaluatedAt' => $this->dateTime()->notNull(),
            'closedAt' => $this->dateTime(),
            'nextBatchAt' => $this->dateTime(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        $this->archiveTableIfExists('{{%backinstock_delivery_attempts}}');
        $this->createTable('{{%backinstock_delivery_attempts}}', [
            'id' => $this->primaryKey(),
            'runId' => $this->integer()->notNull(),
            'subscriptionId' => $this->integer()->notNull(),
            'attemptNumber' => $this->integer()->notNull()->defaultValue(1),
            'status' => $this->string(32)->notNull()->defaultValue('pending'),
            'dueAt' => $this->dateTime()->notNull(),
            'claimedAt' => $this->dateTime(),
            'completedAt' => $this->dateTime(),
            'errorCode' => $this->string(64),
            'errorMessage' => $this->string(1024),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);
    }

    public function createIndexes(): void
    {
        $this->createIndex(null, '{{%backinstock_records}}', ['variantId'], false);
        $this->createIndex(null, '{{%backinstock_records}}', ['siteId'], false);
        $this->createIndex(null, '{{%backinstock_records}}', ['pendingKey'], true);
        $this->createIndex(null, '{{%backinstock_records}}', ['recipientKey'], false);
        $this->createIndex(null, '{{%backinstock_records}}', ['storeId'], false);
        $this->createIndex(null, '{{%backinstock_records}}', ['state'], false);
        $this->createIndex(null, '{{%backinstock_records}}', ['activeKey'], true);
        $this->createIndex(null, '{{%backinstock_inventory}}', ['variantId'], false);
        $this->createIndex(null, '{{%backinstock_runs}}', ['variantId', 'storeId'], false);
        $this->createIndex(null, '{{%backinstock_runs}}', ['availabilityKey'], true);
        $this->createIndex(null, '{{%backinstock_runs}}', ['status', 'nextBatchAt'], false);
        $this->createIndex(null, '{{%backinstock_delivery_attempts}}', ['runId', 'status', 'dueAt'], false);
        $this->createIndex(null, '{{%backinstock_delivery_attempts}}', ['subscriptionId'], false);
        $this->createIndex(null, '{{%backinstock_delivery_attempts}}', ['runId', 'subscriptionId', 'attemptNumber'], true);
    }

    public function createForeignKeys(): void
    {
        if ($this->db->tableExists('{{%commerce_variants}}')) {
            $this->addForeignKey(null, '{{%backinstock_records}}', ['variantId'], '{{%commerce_variants}}', ['id'], 'CASCADE', 'CASCADE');
            $this->addForeignKey(null, '{{%backinstock_inventory}}', ['variantId'], '{{%commerce_variants}}', ['id'], 'CASCADE', 'CASCADE');
        }

        $this->addForeignKey(null, '{{%backinstock_records}}', ['siteId'], '{{%sites}}', ['id'], 'CASCADE', 'CASCADE');
        $this->addForeignKey(null, '{{%backinstock_records}}', ['userId'], '{{%users}}', ['id'], 'SET NULL', 'CASCADE');

        if ($this->db->tableExists('{{%commerce_stores}}')) {
            $this->addForeignKey(null, '{{%backinstock_records}}', ['storeId'], '{{%commerce_stores}}', ['id'], 'CASCADE', 'CASCADE');
            $this->addForeignKey(null, '{{%backinstock_runs}}', ['storeId'], '{{%commerce_stores}}', ['id'], 'CASCADE', 'CASCADE');
        }

        if ($this->db->tableExists('{{%commerce_variants}}')) {
            $this->addForeignKey(null, '{{%backinstock_runs}}', ['variantId'], '{{%commerce_variants}}', ['id'], 'CASCADE', 'CASCADE');
        }

        $this->addForeignKey(null, '{{%backinstock_delivery_attempts}}', ['runId'], '{{%backinstock_runs}}', ['id'], 'CASCADE', 'CASCADE');
        $this->addForeignKey(null, '{{%backinstock_delivery_attempts}}', ['subscriptionId'], '{{%backinstock_records}}', ['id'], 'CASCADE', 'CASCADE');
    }

    public function dropTables(): void
    {
        $this->dropTableIfExists('{{%backinstock_records}}');
        $this->dropTableIfExists('{{%backinstock_inventory}}');
        $this->dropTableIfExists('{{%backinstock_delivery_attempts}}');
        $this->dropTableIfExists('{{%backinstock_runs}}');
    }

    public function dropForeignKeys(): void
    {
        if ($this->db->tableExists('{{%backinstock_records}}')) {
            $this->dropForeignKeyIfExists('{{%backinstock_records}}', 'variantId');
            $this->dropForeignKeyIfExists('{{%backinstock_records}}', 'siteId');
            $this->dropForeignKeyIfExists('{{%backinstock_records}}', 'userId');
            $this->dropForeignKeyIfExists('{{%backinstock_records}}', 'storeId');
        }

        if ($this->db->tableExists('{{%backinstock_inventory}}')) {
            $this->dropForeignKeyIfExists('{{%backinstock_inventory}}', 'variantId');
        }

        if ($this->db->tableExists('{{%backinstock_delivery_attempts}}')) {
            $this->dropForeignKeyIfExists('{{%backinstock_delivery_attempts}}', 'runId');
            $this->dropForeignKeyIfExists('{{%backinstock_delivery_attempts}}', 'subscriptionId');
        }

        if ($this->db->tableExists('{{%backinstock_runs}}')) {
            $this->dropForeignKeyIfExists('{{%backinstock_runs}}', 'storeId');
            $this->dropForeignKeyIfExists('{{%backinstock_runs}}', 'variantId');
        }
    }
}
