<?php
namespace verbb\backinstock\migrations;

use verbb\backinstock\models\Log;

use craft\db\Migration;
use craft\db\Query;

class m261003_000000_subscription_controls extends Migration
{
    // Constants
    // =========================================================================

    private const BATCH_SIZE = 500;


    // Public Methods
    // =========================================================================

    public function safeUp(): bool
    {
        $table = '{{%backinstock_records}}';

        if (!$this->db->tableExists($table)) {
            return true;
        }

        if (!$this->db->columnExists($table, 'pendingKey')) {
            $this->addColumn($table, 'pendingKey', $this->char(64)->after('isNotified'));
        }

        if ($this->_findPendingKeyIndex($table) === null) {
            // Add the authoritative constraint first so each bounded batch can query prior claims efficiently.
            $this->createIndex(null, $table, ['pendingKey'], true);
        }

        $this->_backfillPendingKeys($table);

        return true;
    }

    public function safeDown(): bool
    {
        $table = '{{%backinstock_records}}';

        if (!$this->db->tableExists($table)) {
            return true;
        }

        $indexName = $this->_findPendingKeyIndex($table);

        if ($indexName !== null) {
            $this->dropIndex($indexName, $table);
        }

        if ($this->db->columnExists($table, 'pendingKey')) {
            $this->dropColumn($table, 'pendingKey');
        }

        return true;
    }


    // Private Methods
    // =========================================================================

    private function _backfillPendingKeys(string $table): void
    {
        $lastId = 0;

        while (true) {
            $pendingRows = (new Query())
                ->select(['id', 'email', 'variantId', 'siteId', 'locale'])
                ->from($table)
                ->where(['isNotified' => false])
                ->andWhere(['>', 'id', $lastId])
                ->orderBy(['id' => SORT_ASC])
                ->limit(self::BATCH_SIZE)
                ->all($this->db);

            if (!$pendingRows) {
                return;
            }

            $lastId = (int)end($pendingRows)['id'];
            $groups = [];

            foreach ($pendingRows as $row) {
                $pendingKey = Log::createPendingKey($row['email'], (int)$row['variantId'], (int)$row['siteId'], $row['locale']);

                if ($pendingKey) {
                    $groups[$pendingKey][] = (int)$row['id'];
                }
            }

            if (!$groups) {
                continue;
            }

            $claimedRows = (new Query())
                ->select(['id', 'pendingKey'])
                ->from($table)
                ->where(['pendingKey' => array_keys($groups)])
                ->all($this->db);
            $claimedIds = array_column($claimedRows, 'id', 'pendingKey');
            $duplicateIds = [];

            foreach ($groups as $pendingKey => $ids) {
                if (isset($claimedIds[$pendingKey])) {
                    $representativeId = (int)$claimedIds[$pendingKey];
                    $duplicateIds = array_merge($duplicateIds, array_filter($ids, fn(int $id) => $id !== $representativeId));
                    continue;
                }

                $representativeId = array_shift($ids);
                $this->update($table, ['pendingKey' => $pendingKey], ['id' => $representativeId]);
                $duplicateIds = array_merge($duplicateIds, $ids);
            }

            if ($duplicateIds) {
                // Retain redundant legacy rows as completed history without sending queued mail.
                $this->update($table, [
                    'isNotified' => true,
                    'pendingKey' => null,
                ], ['id' => array_values($duplicateIds)]);
            }
        }
    }

    private function _findPendingKeyIndex(string $table): ?string
    {
        foreach ($this->db->getSchema()->getTableIndexes($table, true) as $index) {
            if ($index->isUnique && $index->columnNames === ['pendingKey']) {
                return $index->name;
            }
        }

        return null;
    }
}
