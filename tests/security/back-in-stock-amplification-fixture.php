<?php

use yii\db\IntegrityException;
use yii\web\Response;

$vendorPath = getenv('BACK_IN_STOCK_CRAFT_VENDOR') ?: dirname(__DIR__, 2) . '/vendor';

if (!is_file($vendorPath . '/autoload.php')) {
    throw new RuntimeException('Set BACK_IN_STOCK_CRAFT_VENDOR to a Craft 5 and Commerce 5 vendor directory.');
}

require $vendorPath . '/autoload.php';
require $vendorPath . '/yiisoft/yii2/Yii.php';
require $vendorPath . '/craftcms/cms/src/Craft.php';
require dirname(__DIR__, 2) . '/src/models/Log.php';
require dirname(__DIR__, 2) . '/src/services/Logs.php';
require dirname(__DIR__, 2) . '/src/services/Service.php';

final class BackInStockSecurityFixtureRequest extends craft\web\Request
{
    public bool $console = false;
    public ?string $remoteIp = null;
    public ?string $userIp = null;

    public function init(): void
    {
    }

    public function getIsConsoleRequest(): bool
    {
        return $this->console;
    }

    public function getRemoteIP(int $filterOptions = 0): ?string
    {
        return $this->remoteIp;
    }

    public function getUserIP(int $filterOptions = 0): ?string
    {
        return $this->userIp;
    }
}

final class BackInStockSecurityFixtureCache
{
    public array $entries = [];
    public bool $failWrites = false;

    public function get(string $key): mixed
    {
        return $this->entries[$key] ?? false;
    }

    public function set(string $key, mixed $value, int $duration = 0): bool
    {
        if ($this->failWrites) {
            return false;
        }

        $this->entries[$key] = $value;

        return true;
    }
}

final class BackInStockSecurityFixtureMutex
{
    public array $acquiredNames = [];
    public array $heldNames = [];
    public bool $failAcquires = false;

    public function acquire(string $name, int $timeout = 0): bool
    {
        $this->acquiredNames[] = $name;

        if ($this->failAcquires || isset($this->heldNames[$name])) {
            return false;
        }

        $this->heldNames[$name] = true;

        return true;
    }

    public function release(string $name): bool
    {
        unset($this->heldNames[$name]);

        return true;
    }
}

final class BackInStockSecurityFixtureApp extends yii\base\Component
{
    public string $charset = 'UTF-8';
    public string $language = 'en';
    public string $sourceLanguage = 'en';
    public BackInStockSecurityFixtureCache $cache;
    public BackInStockSecurityFixtureMutex $mutex;
    public BackInStockSecurityFixtureRequest $request;
    public Response $response;

    public function getCache(): BackInStockSecurityFixtureCache
    {
        return $this->cache;
    }

    public function getErrorHandler(): object
    {
        return (object)['exception' => null];
    }

    public function getI18n(): yii\i18n\I18N
    {
        return new yii\i18n\I18N([
            'translations' => [
                'craft-commerce-back-in-stock' => [
                    'class' => yii\i18n\PhpMessageSource::class,
                    'basePath' => dirname(__DIR__, 2) . '/src/translations',
                ],
            ],
        ]);
    }

    public function getMutex(): BackInStockSecurityFixtureMutex
    {
        return $this->mutex;
    }

    public function getRequest(): BackInStockSecurityFixtureRequest
    {
        return $this->request;
    }

    public function getResponse(): Response
    {
        return $this->response;
    }
}

function fixtureAssert(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

function fixtureApp(): BackInStockSecurityFixtureApp
{
    $app = new BackInStockSecurityFixtureApp();
    $app->cache = new BackInStockSecurityFixtureCache();
    $app->mutex = new BackInStockSecurityFixtureMutex();
    $app->request = new BackInStockSecurityFixtureRequest();
    Craft::$app = $app;
    $app->response = new Response();

    return $app;
}

function expectRateLimit(callable $attempt, BackInStockSecurityFixtureApp $app, string $message): void
{
    try {
        $attempt();
        throw new RuntimeException($message);
    } catch (yii\web\TooManyRequestsHttpException) {
        $retryAfter = (int)$app->response->getHeaders()->get('Retry-After');
        fixtureAssert($retryAfter >= 1 && $retryAfter <= 300, 'Rate-limited responses must provide a bounded Retry-After header.');
    }
}

fixtureApp();

$firstLog = new verbb\backinstock\models\Log([
    'variantId' => 10,
    'siteId' => 20,
    'locale' => 'en-AU',
    'options' => ['nonce' => 1],
]);
$firstLog->email = ' Person@Example.test ';
$secondLog = new verbb\backinstock\models\Log([
    'variantId' => 10,
    'siteId' => 20,
    'locale' => 'en-AU',
    'options' => ['nonce' => 2],
]);
$secondLog->email = 'person@example.test';

fixtureAssert($firstLog->getPendingIdentityKey() === $secondLog->getPendingIdentityKey(), 'Attacker-controlled options must not create separate pending identities.');
fixtureAssert(strlen((string)$firstLog->getPendingIdentityKey()) === 64, 'Pending identities must use a fixed-width SHA-256 digest.');
$idnKeys = array_map(
    fn(string $email) => verbb\backinstock\models\Log::createPendingKey($email, 10, 20, 'en-AU'),
    [
        'person@bücher.example',
        'person@xn--bcher-kva.example',
        'person@BÜCHER.example',
        'person@bücher。example',
        "person@bu\u{0308}cher.example",
    ],
);
fixtureAssert(count(array_unique($idnKeys)) === 1, 'Equivalent IDN recipient spellings must share one pending identity.');
fixtureAssert(verbb\backinstock\models\Log::createPendingKey("bad\xFF@example.test", 10, 20, 'en-AU') === null, 'Malformed UTF-8 recipients must fall through to normal model validation without throwing.');
$secondLog->locale = 'fr-FR';
fixtureAssert($firstLog->getPendingIdentityKey() !== $secondLog->getPendingIdentityKey(), 'Locale must remain part of the legitimate pending identity.');
$firstLog->isNotified = true;
fixtureAssert($firstLog->getPendingIdentityKey() === null, 'Completed requests must release their pending identity for future subscriptions.');

$validOptions = new verbb\backinstock\models\Log();
$validOptions->setOptionsFromRequest('{"title":"Fixture","details":{"colour":"green"}}');
fixtureAssert($validOptions->validate(['options']), 'A normal JSON object must remain valid options input.');
fixtureAssert($validOptions->options['details']['colour'] === 'green', 'Valid nested options must remain available to email templates.');

$omittedOptions = new verbb\backinstock\models\Log();
$omittedOptions->setOptionsFromRequest(null);
fixtureAssert($omittedOptions->validate(['options']), 'The existing optional options input must remain optional.');

foreach ([
    '["list"]',
    'not-json',
    ['structured' => 'request'],
    '{"tooDeep":{"a":{"b":{"c":{"d":{"e":{"f":{"g":{"h":1}}}}}}}}}',
    '{"oversized":"' . str_repeat('x', verbb\backinstock\models\Log::MAX_OPTIONS_BYTES) . '"}',
] as $index => $invalidOptions) {
    $invalidLog = new verbb\backinstock\models\Log();
    $invalidLog->setOptionsFromRequest($invalidOptions);
    fixtureAssert(!$invalidLog->validate(['options']), "Invalid request options case $index must be rejected.");
}

$directOversizedLog = new verbb\backinstock\models\Log([
    'options' => ['oversized' => str_repeat('x', verbb\backinstock\models\Log::MAX_OPTIONS_BYTES)],
]);
fixtureAssert(!$directOversizedLog->validate(['options']), 'Direct service callers must not bypass the encoded options size limit.');

$duplicateOnlyLog = new verbb\backinstock\models\Log();
$duplicateOnlyLog->markAsDuplicate();
fixtureAssert($duplicateOnlyLog->getHasOnlyDuplicateError(), 'A duplicate-only save failure must be eligible for an idempotent public response.');
$duplicateOnlyLog->addError('options', 'Invalid fixture options.');
fixtureAssert(!$duplicateOnlyLog->getHasOnlyDuplicateError(), 'A duplicate must not hide another validation failure.');
$duplicateOnlyLog->validate(['options']);
fixtureAssert(!$duplicateOnlyLog->getHasOnlyDuplicateError(), 'Revalidation must clear stale duplicate state.');

$service = new verbb\backinstock\services\Service();
$peerLimitedApp = fixtureApp();
$peerLimitedApp->request->remoteIp = '203.0.113.10';

for ($attempt = 1; $attempt <= 10; $attempt++) {
    $peerLimitedApp->request->userIp = "198.51.100.$attempt";
    $service->enforceRegistrationRateLimit("recipient-$attempt@example.test");
}

fixtureAssert($peerLimitedApp->mutex->heldNames === [], 'Registration limiter mutexes must be released after allowed attempts.');
$limiterState = json_encode([$peerLimitedApp->cache->entries, $peerLimitedApp->mutex->acquiredNames]);
fixtureAssert(!str_contains($limiterState, '203.0.113.10'), 'Registration limiter state must not contain the raw direct connection address.');
fixtureAssert(!str_contains($limiterState, 'recipient-'), 'Registration limiter state must not contain raw recipient addresses.');
expectRateLimit(
    fn() => $service->enforceRegistrationRateLimit('recipient-11@example.test'),
    $peerLimitedApp,
    'An eleventh registration from one direct address must be rate limited.',
);

$recipientLimitedApp = fixtureApp();
$idnRecipients = [
    'person@bücher.example',
    'person@xn--bcher-kva.example',
    'person@BÜCHER.example',
    'person@bücher。example',
    "person@bu\u{0308}cher.example",
];

for ($attempt = 1; $attempt <= 10; $attempt++) {
    $recipientLimitedApp->request->remoteIp = "192.0.2.$attempt";
    $service->enforceRegistrationRateLimit($idnRecipients[($attempt - 1) % count($idnRecipients)]);
}

$recipientLimitedApp->request->remoteIp = '192.0.2.11';
expectRateLimit(
    fn() => $service->enforceRegistrationRateLimit('person@xn--bcher-kva.example'),
    $recipientLimitedApp,
    'An eleventh IDN-equivalent registration for one recipient must be rate limited across direct addresses.',
);

$consoleApp = fixtureApp();
$consoleApp->request->console = true;
$consoleApp->mutex->failAcquires = true;
$service->enforceRegistrationRateLimit('console@example.test');
fixtureAssert($consoleApp->cache->entries === [], 'Trusted console execution must not create public registration limiter state.');

$lockFailureApp = fixtureApp();
$lockFailureApp->request->remoteIp = '192.0.2.40';
$lockFailureApp->mutex->failAcquires = true;
expectRateLimit(
    fn() => $service->enforceRegistrationRateLimit('lock@example.test'),
    $lockFailureApp,
    'Registration must fail closed when limiter locking is unavailable.',
);

$cacheFailureApp = fixtureApp();
$cacheFailureApp->request->remoteIp = '192.0.2.41';
$cacheFailureApp->cache->failWrites = true;
expectRateLimit(
    fn() => $service->enforceRegistrationRateLimit('cache@example.test'),
    $cacheFailureApp,
    'Registration must fail closed when limiter state cannot be persisted.',
);
fixtureAssert($cacheFailureApp->mutex->heldNames === [], 'Registration limiter mutexes must be released after cache failure.');

$logsService = new verbb\backinstock\services\Logs();
$duplicateClassifier = new ReflectionMethod($logsService, '_isDuplicateKeyException');
fixtureAssert($duplicateClassifier->invoke($logsService, new IntegrityException('PostgreSQL duplicate', ['23505'])) === true, 'PostgreSQL unique violations must be recognized.');
fixtureAssert($duplicateClassifier->invoke($logsService, new IntegrityException('MySQL duplicate', ['23000', 1062])) === true, 'MySQL unique violations must be recognized.');
fixtureAssert($duplicateClassifier->invoke($logsService, new IntegrityException('Other integrity failure', ['23000', 1452])) === false, 'Unrelated integrity failures must not be hidden as duplicates.');

echo "Back In Stock amplification security fixture passed.\n";
