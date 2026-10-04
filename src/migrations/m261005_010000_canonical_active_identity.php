<?php
namespace verbb\backinstock\migrations;

use verbb\backinstock\models\Subscription;

use craft\db\Migration;
use craft\db\Query;

class m261005_010000_canonical_active_identity extends Migration
{
    // Constants
    // =========================================================================

    private const BATCH_SIZE = 500;


    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        $lastId = 0;

        while (true) {
            $rows = (new Query())
                ->select(['id', 'email', 'variantId', 'siteId', 'storeId', 'locale'])
                ->from('{{%backinstock_records}}')
                ->where(['state' => Subscription::ACTIVE_STATES])
                ->andWhere(['>', 'id', $lastId])
                ->orderBy(['id' => SORT_ASC])
                ->limit(self::BATCH_SIZE)
                ->all($this->db);

            if (!$rows) {
                return true;
            }

            $lastId = (int)end($rows)['id'];

            foreach ($rows as $row) {
                $this->update('{{%backinstock_records}}', [
                    'activeKey' => Subscription::createActiveKey(
                        $row['email'],
                        (int)$row['variantId'],
                        (int)$row['siteId'],
                        (int)$row['storeId'],
                        $row['locale'],
                    ),
                ], ['id' => $row['id']]);
            }
        }
    }

    public function safeDown(): bool
    {
        echo "m261005_010000_canonical_active_identity cannot be reverted.\n";

        return false;
    }
}
