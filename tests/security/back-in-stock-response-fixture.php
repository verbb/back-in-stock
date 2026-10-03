<?php

use verbb\backinstock\BackInStock;
use verbb\backinstock\controllers\BaseController;
use verbb\backinstock\models\Log;
use verbb\backinstock\services\Logs;
use verbb\backinstock\services\Service;

use craft\commerce\elements\Variant;

$bootstrapPath = getenv('BACK_IN_STOCK_CRAFT_BOOTSTRAP');

if (!$bootstrapPath || !is_file($bootstrapPath)) {
    throw new RuntimeException('Set BACK_IN_STOCK_CRAFT_BOOTSTRAP to a Craft 5 application bootstrap.php file.');
}

$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['REMOTE_ADDR'] = '192.0.2.83';
$_SERVER['HTTP_ACCEPT'] = 'application/json';
$_SERVER['HTTP_HOST'] ??= 'localhost';
$_SERVER['SCRIPT_FILENAME'] ??= __FILE__;

require $bootstrapPath;

/** @var craft\web\Application $app */
$app = require CRAFT_VENDOR_PATH . '/craftcms/cms/bootstrap/web.php';
$plugin = Craft::$app->getPlugins()->getPlugin('craft-commerce-back-in-stock');

if (!$plugin instanceof BackInStock) {
    throw new RuntimeException('Back In Stock must be installed and enabled in the fixture application.');
}

function fixtureAssert(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

final class BackInStockResponseFixtureLogs extends Logs
{
    public int $attempt = 0;

    public function saveLog(Log $log, bool $runValidation = true): bool
    {
        $this->attempt++;

        if (in_array($this->attempt, [1, 4], true)) {
            $log->id = 999999999;
            return true;
        }

        $log->markAsDuplicate();

        if ($this->attempt === 3) {
            $log->addError('options', 'Invalid fixture options.');
        }

        return false;
    }
}

final class BackInStockResponseFixtureService extends Service
{
    public function enforceRegistrationRateLimit(?string $email): void
    {
    }
}

$siteId = Craft::$app->getSites()->getCurrentSite()->id;
$variant = null;

foreach (Variant::find()->siteId($siteId)->limit(500)->all() as $candidate) {
    if ($plugin->getService()->getLiveVariant((int)$candidate->id, $siteId)) {
        $variant = $candidate;
        break;
    }
}

if (!$variant) {
    throw new RuntimeException('The fixture application needs one live variant.');
}

$settings = $plugin->getSettings();
$originalSendConfirmation = $settings->sendConfirmation;
$originalLogs = $plugin->getLogs();
$originalService = $plugin->getService();
$fixtureLogs = new BackInStockResponseFixtureLogs();
$plugin->set('logs', $fixtureLogs);
$plugin->set('service', new BackInStockResponseFixtureService());
$settings->sendConfirmation = true;
$email = sprintf('security-response-%s@example.test', bin2hex(random_bytes(8)));
$transaction = Craft::$app->getDb()->beginTransaction();

try {
    $request = Craft::$app->getRequest();
    $request->getHeaders()->set('Accept', 'application/json');
    $request->setBodyParams([
        'variantId' => $variant->id,
        'email' => $email,
    ]);

    $queueCount = Craft::$app->getQueue()->getTotalJobs();
    $controller = new BaseController('base', $plugin);
    $firstResponse = $controller->actionRegisterInterest();
    $firstData = $firstResponse?->data;
    fixtureAssert(($firstData['success'] ?? false) === true, 'A valid new request must retain its successful JSON response.');
    fixtureAssert(Craft::$app->getQueue()->getTotalJobs() === $queueCount + 1, 'A valid new request must retain its configured confirmation job.');

    Craft::$app->set('response', new craft\web\Response());
    $duplicateResponse = $controller->actionRegisterInterest();
    $duplicateData = $duplicateResponse?->data;
    fixtureAssert($duplicateResponse?->statusCode === $firstResponse?->statusCode, 'New and duplicate JSON requests must use the same HTTP status.');
    fixtureAssert($duplicateData === $firstData, 'New and duplicate JSON requests must return the same body.');
    fixtureAssert(Craft::$app->getQueue()->getTotalJobs() === $queueCount + 1, 'A duplicate request must not queue another confirmation.');

    $request->setBodyParams([
        'variantId' => $variant->id,
        'email' => $email,
        'options' => 'not-json',
    ]);
    Craft::$app->set('response', new craft\web\Response());
    $invalidResponse = $controller->actionRegisterInterest();
    fixtureAssert(($invalidResponse?->data['success'] ?? true) === false, 'A duplicate request must not hide invalid options.');
    fixtureAssert(Craft::$app->getQueue()->getTotalJobs() === $queueCount + 1, 'Invalid options must not queue another confirmation.');

    $request->getHeaders()->set('Accept', 'text/html');
    $request->setAcceptableContentTypes(['text/html' => ['q' => 1]]);
    $request->setBodyParams([
        'variantId' => $variant->id,
        'email' => $email,
    ]);
    Craft::$app->set('response', new craft\web\Response());
    $firstFormResponse = $controller->actionRegisterInterest();
    $firstNotice = Craft::$app->getSession()->getFlash('notice', null, true);
    $formQueueCount = Craft::$app->getQueue()->getTotalJobs();
    fixtureAssert($formQueueCount === $queueCount + 2, 'A valid form request must retain its configured confirmation job.');

    Craft::$app->set('response', new craft\web\Response());
    $duplicateFormResponse = $controller->actionRegisterInterest();
    $duplicateNotice = Craft::$app->getSession()->getFlash('notice', null, true);
    fixtureAssert($duplicateFormResponse?->statusCode === $firstFormResponse?->statusCode, 'New and duplicate form requests must use the same HTTP status.');
    fixtureAssert($duplicateFormResponse?->getHeaders()->get('Location') === $firstFormResponse?->getHeaders()->get('Location'), 'New and duplicate form requests must use the same redirect.');
    fixtureAssert($duplicateNotice === $firstNotice, 'New and duplicate form requests must use the same notice.');
    fixtureAssert(Craft::$app->getSession()->getFlash('error', null, true) === null, 'A duplicate form request must not expose an error flash.');
    fixtureAssert(Craft::$app->getQueue()->getTotalJobs() === $formQueueCount, 'A duplicate form request must not queue another confirmation.');
    fixtureAssert($fixtureLogs->attempt === 5, 'The controller must classify each fixture save result exactly once.');
} finally {
    $settings->sendConfirmation = $originalSendConfirmation;
    $plugin->set('logs', $originalLogs);
    $plugin->set('service', $originalService);
    $transaction->rollBack();
}

echo "Back In Stock response privacy fixture passed.\n";
