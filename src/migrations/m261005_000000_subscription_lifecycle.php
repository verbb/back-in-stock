<?php
namespace verbb\backinstock\migrations;

use verbb\backinstock\models\Settings;

use Craft;
use craft\db\Migration;
use craft\helpers\Db;

class m261005_000000_subscription_lifecycle extends Migration
{
    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        $this->_addSubscriptionColumns();
        $this->_createRunTable();
        $this->_createAttemptTable();
        $this->_migrateSubscriptions();
        $this->_preserveUpgradeNotificationPolicy();

        return true;
    }

    public function safeDown(): bool
    {
        echo "m261005_000000_subscription_lifecycle cannot be reverted.\n";

        return false;
    }


    // Private Methods
    // =========================================================================

    private function _addSubscriptionColumns(): void
    {
        $table = '{{%backinstock_records}}';
        $this->addColumn($table, 'recipientKey', $this->char(64)->after('pendingKey'));
        $this->addColumn($table, 'userId', $this->integer()->after('recipientKey'));
        $this->addColumn($table, 'storeId', $this->integer()->after('userId'));
        $this->addColumn($table, 'state', $this->string(32)->notNull()->defaultValue('active')->after('storeId'));
        $this->addColumn($table, 'activeKey', $this->char(64)->after('state'));
        $this->addColumn($table, 'verificationTokenHash', $this->char(64)->after('activeKey'));
        $this->addColumn($table, 'verificationExpiresAt', $this->dateTime()->after('verificationTokenHash'));
        $this->addColumn($table, 'verifiedAt', $this->dateTime()->after('verificationExpiresAt'));
        $this->addColumn($table, 'notifiedAt', $this->dateTime()->after('verifiedAt'));
        $this->addColumn($table, 'cancelledAt', $this->dateTime()->after('notifiedAt'));
        $this->addColumn($table, 'expiredAt', $this->dateTime()->after('cancelledAt'));
        $this->addColumn($table, 'cancelSource', $this->string(32)->after('expiredAt'));
        $this->createIndex(null, $table, ['recipientKey']);
        $this->createIndex(null, $table, ['storeId']);
        $this->createIndex(null, $table, ['state']);
        $this->createIndex(null, $table, ['activeKey'], true);
        $this->addForeignKey(null, $table, ['userId'], '{{%users}}', ['id'], 'SET NULL', 'CASCADE');
        $this->addForeignKey(null, $table, ['storeId'], '{{%commerce_stores}}', ['id'], 'CASCADE', 'CASCADE');
    }

    private function _createRunTable(): void
    {
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
        $this->createIndex(null, '{{%backinstock_runs}}', ['variantId', 'storeId']);
        $this->createIndex(null, '{{%backinstock_runs}}', ['availabilityKey'], true);
        $this->createIndex(null, '{{%backinstock_runs}}', ['status', 'nextBatchAt']);
        $this->addForeignKey(null, '{{%backinstock_runs}}', ['variantId'], '{{%commerce_variants}}', ['id'], 'CASCADE', 'CASCADE');
        $this->addForeignKey(null, '{{%backinstock_runs}}', ['storeId'], '{{%commerce_stores}}', ['id'], 'CASCADE', 'CASCADE');
    }

    private function _createAttemptTable(): void
    {
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
        $this->createIndex(null, '{{%backinstock_delivery_attempts}}', ['runId', 'status', 'dueAt']);
        $this->createIndex(null, '{{%backinstock_delivery_attempts}}', ['subscriptionId']);
        $this->createIndex(null, '{{%backinstock_delivery_attempts}}', ['runId', 'subscriptionId', 'attemptNumber'], true);
        $this->addForeignKey(null, '{{%backinstock_delivery_attempts}}', ['runId'], '{{%backinstock_runs}}', ['id'], 'CASCADE', 'CASCADE');
        $this->addForeignKey(null, '{{%backinstock_delivery_attempts}}', ['subscriptionId'], '{{%backinstock_records}}', ['id'], 'CASCADE', 'CASCADE');
    }

    private function _migrateSubscriptions(): void
    {
        $subscriptions = (new \craft\db\Query())
            ->select(['id', 'email', 'siteId', 'pendingKey', 'isNotified', 'dateUpdated'])
            ->from('{{%backinstock_records}}')
            ->all();

        foreach ($subscriptions as $subscription) {
            $storeId = (new \craft\db\Query())
                ->select('storeId')
                ->from('{{%commerce_site_stores}}')
                ->where(['siteId' => $subscription['siteId']])
                ->scalar();

            if (!$storeId) {
                throw new \RuntimeException("Unable to resolve the Commerce store for Back in Stock subscription {$subscription['id']}.");
            }

            $recipient = strtolower(trim((string)$subscription['email']));
            $isNotified = Db::parseBoolean($subscription['isNotified']);
            $state = $isNotified ? 'notified' : 'active';

            $this->update('{{%backinstock_records}}', [
                'recipientKey' => hash('sha256', $recipient),
                'storeId' => (int)$storeId,
                'state' => $state,
                'activeKey' => $isNotified ? null : $subscription['pendingKey'],
                'notifiedAt' => $isNotified ? $subscription['dateUpdated'] : null,
            ], ['id' => $subscription['id']], [], false);
        }

        $this->alterColumn('{{%backinstock_records}}', 'recipientKey', $this->char(64)->notNull());
        $this->alterColumn('{{%backinstock_records}}', 'storeId', $this->integer()->notNull());
    }

    private function _preserveUpgradeNotificationPolicy(): void
    {
        $path = 'plugins.craft-commerce-back-in-stock.settings.notificationPolicy';

        if (Craft::$app->getProjectConfig()->get($path) === null) {
            Craft::$app->getProjectConfig()->set($path, Settings::NOTIFICATION_POLICY_ALL, 'Preserve Back in Stock upgrade notification behaviour');
        }
    }
}
