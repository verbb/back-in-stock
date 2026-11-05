<?php
namespace verbb\backinstock\migrations;

use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;
use verbb\backinstock\models\Subscription;

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
        $this->_preserveUpgradeEmailTemplates();

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
        $columns = [
            'recipientKey' => $this->char(64)->after('pendingKey'),
            'userId' => $this->integer()->after('recipientKey'),
            'storeId' => $this->integer()->after('userId'),
            'state' => $this->string(32)->notNull()->defaultValue('active')->after('storeId'),
            'activeKey' => $this->char(64)->after('state'),
            'verificationTokenHash' => $this->char(64)->after('activeKey'),
            'verificationExpiresAt' => $this->dateTime()->after('verificationTokenHash'),
            'verifiedAt' => $this->dateTime()->after('verificationExpiresAt'),
            'notifiedAt' => $this->dateTime()->after('verifiedAt'),
            'cancelledAt' => $this->dateTime()->after('notifiedAt'),
            'expiredAt' => $this->dateTime()->after('cancelledAt'),
            'cancelSource' => $this->string(32)->after('expiredAt'),
        ];

        // MySQL commits DDL immediately, so a failed upgrade has to resume over whatever it already added.
        foreach ($columns as $name => $type) {
            if (!$this->db->columnExists($table, $name)) {
                $this->addColumn($table, $name, $type);
            }
        }

        $this->createIndexIfMissing($table, ['recipientKey']);
        $this->createIndexIfMissing($table, ['storeId']);
        $this->createIndexIfMissing($table, ['state']);
        $this->createIndexIfMissing($table, ['activeKey'], true);
        $this->_addForeignKeyIfMissing($table, ['userId'], '{{%users}}', 'SET NULL');
        $this->_addForeignKeyIfMissing($table, ['storeId'], '{{%commerce_stores}}', 'CASCADE');
    }

    private function _createRunTable(): void
    {
        if (!$this->db->tableExists('{{%backinstock_runs}}')) {
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
        }

        $this->createIndexIfMissing('{{%backinstock_runs}}', ['variantId', 'storeId']);
        $this->createIndexIfMissing('{{%backinstock_runs}}', ['availabilityKey'], true);
        $this->createIndexIfMissing('{{%backinstock_runs}}', ['status', 'nextBatchAt']);
        $this->_addForeignKeyIfMissing('{{%backinstock_runs}}', ['variantId'], '{{%commerce_variants}}', 'CASCADE');
        $this->_addForeignKeyIfMissing('{{%backinstock_runs}}', ['storeId'], '{{%commerce_stores}}', 'CASCADE');
    }

    private function _createAttemptTable(): void
    {
        if (!$this->db->tableExists('{{%backinstock_delivery_attempts}}')) {
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

        $this->createIndexIfMissing('{{%backinstock_delivery_attempts}}', ['runId', 'status', 'dueAt']);
        $this->createIndexIfMissing('{{%backinstock_delivery_attempts}}', ['subscriptionId']);
        $this->createIndexIfMissing('{{%backinstock_delivery_attempts}}', ['runId', 'subscriptionId', 'attemptNumber'], true);
        $this->_addForeignKeyIfMissing('{{%backinstock_delivery_attempts}}', ['runId'], '{{%backinstock_runs}}', 'CASCADE');
        $this->_addForeignKeyIfMissing('{{%backinstock_delivery_attempts}}', ['subscriptionId'], '{{%backinstock_records}}', 'CASCADE');
    }

    private function _migrateSubscriptions(): void
    {
        $subscriptions = (new \craft\db\Query())
            ->select(['id', 'email', 'variantId', 'siteId', 'locale', 'pendingKey', 'isNotified', 'notifiedAt', 'cancelledAt', 'dateUpdated'])
            ->from('{{%backinstock_records}}')
            ->all($this->db);

        foreach ($subscriptions as $subscription) {
            $storeId = (new \craft\db\Query())
                ->select('storeId')
                ->from('{{%commerce_site_stores}}')
                ->where(['siteId' => $subscription['siteId']])
                ->scalar($this->db);

            if (!$storeId) {
                throw new \RuntimeException("Unable to resolve the Commerce store for Back in Stock subscription {$subscription['id']}.");
            }

            // Expiry and retention are new in this release and count from dateUpdated, which this update resets,
            // so nobody loses a request or history to rules that didn't exist when it was made.
            $email = (string)$subscription['email'];
            $isNotified = (bool)$subscription['isNotified'];
            $isDeliverable = Log::normalizeRecipient($email) !== '';
            $isWaiting = !$isNotified && $isDeliverable;

            // Legacy rows with no usable address could never be sent, and would all share one active key.
            $state = $isNotified ? 'notified' : ($isDeliverable ? 'active' : 'cancelled');

            $this->update('{{%backinstock_records}}', [
                'recipientKey' => Subscription::createRecipientKey($email),
                'storeId' => (int)$storeId,
                'state' => $state,
                'activeKey' => $isWaiting ? Subscription::createActiveKey($email, (int)$subscription['variantId'], (int)$subscription['siteId'], (int)$storeId, $subscription['locale']) : null,
                'notifiedAt' => $isNotified ? ($subscription['notifiedAt'] ?: $subscription['dateUpdated']) : null,
                'cancelledAt' => $state === 'cancelled' ? ($subscription['cancelledAt'] ?: $subscription['dateUpdated']) : null,
                'cancelSource' => $state === 'cancelled' ? 'upgrade' : null,
            ], ['id' => $subscription['id']]);
        }

        $this->alterColumn('{{%backinstock_records}}', 'recipientKey', $this->char(64)->notNull());
        $this->alterColumn('{{%backinstock_records}}', 'storeId', $this->integer()->notNull());
    }

    private function _addForeignKeyIfMissing(string $table, array $columns, string $refTable, string $delete): void
    {
        if (Db::findForeignKey($table, $columns, $this->db) === null) {
            $this->addForeignKey(null, $table, $columns, $refTable, ['id'], $delete, 'CASCADE');
        }
    }

    private function _preserveUpgradeNotificationPolicy(): void
    {
        $path = 'plugins.craft-commerce-back-in-stock.settings.notificationPolicy';

        if (Craft::$app->getProjectConfig()->get($path) === null) {
            Craft::$app->getProjectConfig()->set($path, Settings::NOTIFICATION_POLICY_ALL, 'Preserve Back in Stock upgrade notification behaviour');
        }
    }

    private function _preserveUpgradeEmailTemplates(): void
    {
        // 4.1 fell back to the bundled templates, which is also what makes the saved subjects apply.
        $templates = [
            'confirmationEmailTemplate' => 'craft-commerce-back-in-stock/emails/confirmation',
            'emailTemplate' => 'craft-commerce-back-in-stock/emails/notification',
        ];

        foreach ($templates as $setting => $template) {
            $path = "plugins.craft-commerce-back-in-stock.settings.$setting";

            if (!Craft::$app->getProjectConfig()->get($path)) {
                Craft::$app->getProjectConfig()->set($path, $template, 'Preserve Back in Stock upgrade email templates');
            }
        }
    }
}
