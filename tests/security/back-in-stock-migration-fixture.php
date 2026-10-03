<?php

use craft\db\Connection;
use craft\db\Migration;
use craft\db\Query;

$vendorPath = getenv('BACK_IN_STOCK_CRAFT_VENDOR') ?: dirname(__DIR__, 2) . '/vendor';
$driver = getenv('BACK_IN_STOCK_DB_DRIVER') ?: 'mysql';

if (!is_file($vendorPath . '/autoload.php')) {
    throw new RuntimeException('Set BACK_IN_STOCK_CRAFT_VENDOR to a Craft 5 vendor directory.');
}

if (!in_array($driver, ['mysql', 'pgsql'], true)) {
    throw new RuntimeException('Set BACK_IN_STOCK_DB_DRIVER to mysql or pgsql.');
}

require $vendorPath . '/autoload.php';
require $vendorPath . '/yiisoft/yii2/Yii.php';
require $vendorPath . '/craftcms/cms/src/Craft.php';
require dirname(__DIR__, 2) . '/src/models/Log.php';
require dirname(__DIR__, 2) . '/src/queue/jobs/SendEmailNotification.php';
require dirname(__DIR__, 2) . '/src/records/Log.php';
require dirname(__DIR__, 2) . '/src/services/Logs.php';
require dirname(__DIR__, 2) . '/src/migrations/m261003_000000_subscription_controls.php';

final class BackInStockMigrationFixtureApp extends yii\di\ServiceLocator
{
    public string $charset = 'UTF-8';
    public string $language = 'en';
    public string $sourceLanguage = 'en';

    public function getDb(): Connection
    {
        return $this->get('db');
    }

    public function getI18n(): yii\i18n\I18N
    {
        return $this->get('i18n');
    }

    public function getIsInstalled(): bool
    {
        return true;
    }
}

function fixtureAssert(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$dsn = $driver === 'pgsql' ? 'pgsql:host=db;dbname=db' : 'mysql:host=db;dbname=db';
Craft::$app = new BackInStockMigrationFixtureApp();
$db = new Connection([
    'dsn' => $dsn,
    'username' => 'db',
    'password' => 'db',
    'charset' => 'utf8',
    'tablePrefix' => 'bis_security_261003_',
]);
$db->open();
$app = Craft::$app;
$app->set('db', $db);
$app->set('i18n', new yii\i18n\I18N([
    'translations' => [
        'craft-commerce-back-in-stock' => [
            'class' => yii\i18n\PhpMessageSource::class,
            'basePath' => dirname(__DIR__, 2) . '/src/translations',
        ],
    ],
]));
$table = '{{%backinstock_records}}';
$rawTable = $db->getSchema()->getRawTableName($table);

if ($db->tableExists($table)) {
    throw new RuntimeException("Refusing to overwrite the existing fixture table $rawTable.");
}

$setup = new class(['db' => $db]) extends Migration {
    public function safeUp(): bool
    {
        return true;
    }

    public function safeDown(): bool
    {
        return true;
    }
};

try {
    $setup->createTable($table, [
        'id' => $setup->primaryKey(),
        'email' => $setup->string(255)->notNull()->defaultValue(''),
        'variantId' => $setup->integer()->notNull(),
        'siteId' => $setup->integer()->notNull(),
        'locale' => $setup->string(255),
        'options' => $setup->text(),
        'isNotified' => $setup->boolean()->defaultValue(false),
        'dateCreated' => $setup->dateTime()->notNull(),
        'dateUpdated' => $setup->dateTime()->notNull(),
        'uid' => $setup->uid(),
    ]);

    $now = gmdate('Y-m-d H:i:s');
    $rows = [
        ['Person@example.test', 100, 1, 'en-AU', '{"nonce":1}'],
        ['person@example.test', 100, 1, 'en-AU', '{"nonce":2}'],
        [' person@example.test ', 100, 1, 'en-AU', '{"nonce":3}'],
        ['person@example.test', 100, 1, 'fr-FR', '{"nonce":4}'],
    ];

    foreach ($rows as $index => [$email, $variantId, $siteId, $locale, $options]) {
        $db->createCommand()->insert($table, [
            'email' => $email,
            'variantId' => $variantId,
            'siteId' => $siteId,
            'locale' => $locale,
            'options' => $options,
            'isNotified' => false,
            'dateCreated' => $now,
            'dateUpdated' => $now,
            'uid' => sprintf('00000000-0000-4000-8000-%012d', $index + 1),
        ])->execute();
    }

    $crossBatchRows = [];

    for ($index = 0; $index < 501; $index++) {
        $crossBatchRows[] = [
            'person@example.test',
            100,
            1,
            'en-AU',
            '{"batchNonce":' . $index . '}',
            false,
            $now,
            $now,
            sprintf('10000000-0000-4000-8000-%012d', $index + 1),
        ];
    }

    $db->createCommand()->batchInsert($table, [
        'email',
        'variantId',
        'siteId',
        'locale',
        'options',
        'isNotified',
        'dateCreated',
        'dateUpdated',
        'uid',
    ], $crossBatchRows)->execute();

    $migration = new verbb\backinstock\migrations\m261003_000000_subscription_controls(['db' => $db]);
    fixtureAssert($migration->safeUp(), 'The subscription-controls migration must complete.');
    fixtureAssert($db->columnExists($table, 'pendingKey'), 'The migration must add the pending identity column.');
    $pendingKeyIndexes = array_filter(
        $db->getSchema()->getTableIndexes($table, true),
        fn(yii\db\IndexConstraint $index) => $index->isUnique && $index->columnNames === ['pendingKey'],
    );
    fixtureAssert(count($pendingKeyIndexes) === 1, 'The migration must add one prefix-safe unique pending identity index.');

    $migratedRows = (new Query())->from($table)->orderBy(['id' => SORT_ASC])->all($db);
    fixtureAssert(count($migratedRows) === 505, 'The migration must preserve every existing request row across bounded batches.');
    fixtureAssert(count(array_filter($migratedRows, fn(array $row) => !$row['isNotified'])) === 2, 'The migration must retain one pending row per options-independent identity.');
    fixtureAssert(count(array_filter($migratedRows, fn(array $row) => $row['pendingKey'] !== null)) === 2, 'Only canonical pending representatives may retain unique identity keys.');
    $suppressedRow = current(array_filter($migratedRows, fn(array $row) => (bool)$row['isNotified']));
    $suppressedConfirmation = new verbb\backinstock\queue\jobs\SendEmailNotification([
        'logId' => (int)$suppressedRow['id'],
        'confirmation' => true,
        'subject' => 'Fixture',
        'template' => 'fixture',
    ]);
    $suppressedConfirmation->execute(null);

    $pendingKey = verbb\backinstock\models\Log::createPendingKey('person@example.test', 100, 1, 'en-AU');
    $duplicateRejected = false;

    try {
        $db->createCommand()->insert($table, [
            'email' => 'person@example.test',
            'variantId' => 100,
            'siteId' => 1,
            'locale' => 'en-AU',
            'options' => '{"nonce":5}',
            'isNotified' => false,
            'pendingKey' => $pendingKey,
            'dateCreated' => $now,
            'dateUpdated' => $now,
            'uid' => '00000000-0000-4000-8000-000000000005',
        ])->execute();
    } catch (yii\db\IntegrityException) {
        $duplicateRejected = true;
    }

    fixtureAssert($duplicateRejected, 'The database must reject a concurrent options-varying pending duplicate.');

    $logsService = new verbb\backinstock\services\Logs();
    $duplicateLog = new verbb\backinstock\models\Log([
        'variantId' => 100,
        'siteId' => 1,
        'locale' => 'en-AU',
        'options' => ['nonce' => 6],
    ]);
    $duplicateLog->email = 'person@example.test';
    fixtureAssert(!$logsService->saveLog($duplicateLog, false), 'The persistence service must translate a database uniqueness race into the existing duplicate result.');
    fixtureAssert($duplicateLog->hasErrors('variantId'), 'The translated duplicate race must retain the existing validation error contract.');
    fixtureAssert($duplicateLog->getHasOnlyDuplicateError(), 'The translated duplicate race must be eligible for an idempotent public response.');

    $completedLog = new verbb\backinstock\models\Log([
        'variantId' => 102,
        'siteId' => 1,
        'locale' => 'en-AU',
        'options' => ['title' => 'First request'],
    ]);
    $completedLog->email = 'repeat@example.test';
    fixtureAssert($logsService->saveLog($completedLog, false), 'A legitimate new pending identity must remain insertable.');
    $completedLog->isNotified = true;
    fixtureAssert($logsService->saveLog($completedLog, false), 'Completing a request must release its pending identity.');

    $repeatLog = new verbb\backinstock\models\Log([
        'variantId' => 102,
        'siteId' => 1,
        'locale' => 'en-AU',
        'options' => ['title' => 'Later request'],
    ]);
    $repeatLog->email = 'repeat@example.test';
    fixtureAssert($logsService->saveLog($repeatLog, false), 'A recipient must remain able to subscribe again after notification completion.');

    $db->createCommand()->batchInsert($table, [
        'email',
        'variantId',
        'siteId',
        'locale',
        'options',
        'isNotified',
        'pendingKey',
        'dateCreated',
        'dateUpdated',
        'uid',
    ], [
        ['history-1@example.test', 101, 1, 'en-AU', '{}', true, null, $now, $now, '00000000-0000-4000-8000-000000000006'],
        ['history-2@example.test', 101, 1, 'en-AU', '{}', true, null, $now, $now, '00000000-0000-4000-8000-000000000007'],
    ])->execute();
    fixtureAssert((new Query())->from($table)->where(['pendingKey' => null])->count('*', $db) >= 4, 'The unique nullable key must preserve multiple completed history rows.');

    fixtureAssert($migration->safeDown(), 'The subscription-controls migration must be reversible in the fixture.');
    fixtureAssert(!$db->columnExists($table, 'pendingKey'), 'Reverting the fixture migration must remove the pending identity column.');
} finally {
    if ($db->tableExists($table)) {
        $setup->dropTable($table);
    }
}

echo "Back In Stock $driver migration security fixture passed.\n";
