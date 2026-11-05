<?php

use verbb\backinstock\BackInStock;
use verbb\backinstock\controllers\DashboardController;
use verbb\backinstock\migrations\m261005_000000_subscription_lifecycle;
use verbb\backinstock\migrations\m261005_010000_canonical_active_identity;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\queue\jobs\EvaluateAvailability;
use verbb\backinstock\queue\jobs\SendSubscriptionMessage;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use craft\commerce\collections\InventoryMovementCollection;
use craft\commerce\enums\InventoryTransactionType;
use craft\commerce\models\inventory\InventoryCommittedMovement;
use craft\commerce\Plugin as Commerce;
use craft\db\Query;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;
use craft\services\Gc;
use craft\web\View;

use Symfony\Component\Mailer\Transport;

use yii\mail\BaseMailer;
use yii\mail\MailEvent;
use yii\queue\PushEvent;
use yii\queue\Queue;

uses(verbb\backinstock\tests\Integration\TestCase::class);

function commitStock(craft\commerce\elements\Variant $variant, int $quantity): void
{
    $level = $variant->getInventoryLevels()->first();
    $movement = new InventoryCommittedMovement();
    $movement->inventoryItemId = $level->inventoryItemId;
    $movement->fromInventoryLocation = $level->getInventoryLocation();
    $movement->toInventoryLocation = $level->getInventoryLocation();
    $movement->fromInventoryTransactionType = InventoryTransactionType::AVAILABLE;
    $movement->toInventoryTransactionType = InventoryTransactionType::COMMITTED;
    $movement->quantity = $quantity;

    Commerce::getInstance()->getInventory()->executeInventoryMovements(InventoryMovementCollection::make([$movement]));
}

function withMailResult(bool $accepted, callable $callback): void
{
    $mailer = Craft::$app->getMailer();
    $mailer->setTransport(Transport::fromDsn('null://null'));
    $handler = function(MailEvent $event) use ($accepted): void {
        $event->isValid = $accepted;
    };
    $mailer->on(BaseMailer::EVENT_BEFORE_SEND, $handler);

    try {
        $callback();
    } finally {
        $mailer->off(BaseMailer::EVENT_BEFORE_SEND, $handler);
    }
}

function collectEvaluationJobs(callable $callback): array
{
    $jobs = [];
    $handler = function(PushEvent $event) use (&$jobs): void {
        if ($event->job instanceof EvaluateAvailability) {
            $jobs[] = $event->job;
        }
    };
    $queue = Craft::$app->getQueue();
    $queue->on(Queue::EVENT_AFTER_PUSH, $handler);

    try {
        $callback();
    } finally {
        $queue->off(Queue::EVENT_AFTER_PUSH, $handler);
    }

    return $jobs;
}

it('never sends lifecycle links through the param Craft reserves for its own tokens', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = true;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'links@example.test');
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $token = $subscriptions->prepareVerification($subscription);
    $reserved = Craft::$app->getConfig()->getGeneral()->tokenParam;

    parse_str((string)parse_url($subscriptions->getVerificationUrl($subscription, $token), PHP_URL_QUERY), $verification);
    parse_str((string)parse_url($subscriptions->getCancellationUrl($subscription), PHP_URL_QUERY), $cancellation);

    expect($verification)->not->toHaveKey($reserved)
        ->and($verification['verificationToken'])->toBe($token)
        ->and($cancellation)->not->toHaveKey($reserved)
        ->and($subscriptions->validateCancellationToken($subscription, $cancellation['cancellationToken']))->toBeTrue();
});

it('records the next batch time from pending attempts on every supported database', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->batchSize = 1;
    $settings->batchDelay = 60;
    $settings->sendConfirmation = false;
    $settings->requireVerification = false;
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'batch-one@example.test');
    $this->createSubscription($variant, 'batch-two@example.test');

    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 1);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);

    expect($run->selectedCount)->toBe(2)
        ->and($run->nextBatchAt)->not->toBeNull();

    // Delivery recalculates the same value after each attempt, so both call sites need to run.
    $first = DeliveryAttempt::find()->where(['runId' => $run->id])->orderBy(['dueAt' => SORT_ASC])->one();
    $handler = fn($event) => $event->isValid = false;
    $service = BackInStock::$plugin->getService();
    $service->on(verbb\backinstock\services\Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $handler);

    try {
        BackInStock::$plugin->getDelivery()->deliver((int)$first->id);
    } finally {
        $service->off(verbb\backinstock\services\Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $handler);
    }

    $run->refresh();

    expect($run->nextBatchAt)->not->toBeNull();
});

it('closes a run when stock leaves through a movement so the next restock notifies waiting subscribers', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_STOCK_MATCHED;
    $settings->subscribersPerUnit = 1;
    $settings->batchSize = 100;
    $settings->batchDelay = 0;
    $settings->sendConfirmation = false;
    $settings->requireVerification = false;
    $variant = $this->createVariant();
    $first = $this->createSubscription($variant, 'first-in-line@example.test');
    $second = $this->createSubscription($variant, 'second-in-line@example.test');
    $availability = BackInStock::$plugin->getAvailability();
    $inventory = Commerce::getInstance()->getInventory();

    $inventory->updatePurchasableInventoryLevel($variant, 1);
    $firstRun = $availability->evaluate((int)$variant->id, (int)$variant->siteId);

    expect($firstRun->selectedCount)->toBe(1);

    BackInStock::$plugin->getSubscriptions()->markNotified($first);

    $jobs = collectEvaluationJobs(fn() => commitStock($variant, 1));

    // One job per site in the store, so the count depends on how many sites the installation has.
    expect($jobs)->not->toBeEmpty()
        ->and(array_unique(array_map(fn(EvaluateAvailability $job) => $job->variantId, $jobs)))->toBe([$variant->id]);

    expect($availability->evaluate((int)$variant->id, (int)$variant->siteId))->toBeNull();

    $firstRun->refresh();

    expect($firstRun->availabilityKey)->toBeNull();

    $inventory->updatePurchasableInventoryLevel($variant, 1);
    $secondRun = $availability->evaluate((int)$variant->id, (int)$variant->siteId);

    expect($secondRun->id)->not->toBe($firstRun->id)
        ->and(DeliveryAttempt::find()->where(['runId' => $secondRun->id])->select('subscriptionId')->column())->toBe([$second->id]);
});

it('does not queue work for movements on variants nobody is waiting for', function() {
    $variant = $this->createVariant(5);

    expect(RestockRun::find()->where(['variantId' => $variant->id])->andWhere(['not', ['availabilityKey' => null]])->exists())->toBeFalse()
        ->and(collectEvaluationJobs(fn() => commitStock($variant, 1)))->toBe([]);
});

it('builds lifecycle links from the subscriber’s site', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'site-links@example.test');
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $actionTrigger = Craft::$app->getConfig()->getGeneral()->actionTrigger;

    expect($subscriptions->getCancellationUrl($subscription))->toBe(UrlHelper::siteUrl("$actionTrigger/craft-commerce-back-in-stock/base/cancel", [
        'uid' => $subscription->uid,
        'cancellationToken' => $subscriptions->createCancellationToken($subscription),
    ], null, $subscription->siteId));
});

it('ignores drafts when syncing stock state', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'drafts@example.test');
    $service = BackInStock::$plugin->getService();

    expect(collectEvaluationJobs(fn() => $service->syncVariantStockState($variant)))->toHaveCount(1);

    $draft = Craft::$app->getDrafts()->createDraft($variant->getOwner());
    $variant->setOwner($draft);

    expect(collectEvaluationJobs(fn() => $service->syncVariantStockState($variant)))->toBe([]);
});

it('cancels only the affected attempt when a variant is unavailable on the subscriber’s site', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->batchSize = 1;
    $settings->batchDelay = 60;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'unavailable-one@example.test');
    $this->createSubscription($variant, 'unavailable-two@example.test');

    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 5);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);

    $product = $variant->getOwner();
    $product->enabled = false;
    expect(Craft::$app->getElements()->saveElement($product))->toBeTrue();

    $attempts = DeliveryAttempt::find()->where(['runId' => $run->id])->orderBy(['id' => SORT_ASC])->all();
    BackInStock::$plugin->getDelivery()->deliver((int)$attempts[0]->id);

    $attempts[0]->refresh();
    $attempts[1]->refresh();
    $run->refresh();

    expect($attempts[0]->status)->toBe(DeliveryAttemptModel::STATUS_CANCELLED)
        ->and($attempts[0]->errorCode)->toBe('variant-unavailable')
        ->and($attempts[1]->status)->toBe(DeliveryAttemptModel::STATUS_PENDING)
        ->and($run->availabilityKey)->not->toBeNull();
});

it('queues inventory evaluations for the sites people are waiting on, not the current site', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'store@example.test');

    $jobs = collectEvaluationJobs(fn() => Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 3));

    expect(array_map(fn(EvaluateAvailability $job) => $job->siteId, $jobs))->toBe([(int)$variant->siteId]);
});

it('keeps a run’s counts and stock-matched limit when purgeRequests is on', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_STOCK_MATCHED;
    $settings->subscribersPerUnit = 1;
    $settings->batchDelay = 0;
    $settings->purgeRequests = true;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $first = $this->createSubscription($variant, 'purge-first@example.test');
    $this->createSubscription($variant, 'purge-second@example.test');
    $availability = BackInStock::$plugin->getAvailability();

    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 1);
    $run = $availability->evaluate((int)$variant->id, (int)$variant->siteId);
    $attempt = DeliveryAttempt::find()->where(['runId' => $run->id])->one();

    withMailResult(true, fn() => BackInStock::$plugin->getDelivery()->deliver((int)$attempt->id));

    $availability->evaluate((int)$variant->id, (int)$variant->siteId);
    $run->refresh();
    $first->refresh();

    expect($run->sentCount)->toBe(1)
        ->and($run->selectedCount)->toBe(1)
        ->and($first->email)->toBe('')
        ->and($first->state)->toBe(SubscriptionModel::STATE_NOTIFIED);
});

it('flags interrupted attempts and requeues lost ones', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'interrupted@example.test');
    $this->createSubscription($variant, 'lost@example.test');

    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 5);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);
    [$interrupted, $lost] = DeliveryAttempt::find()->where(['runId' => $run->id])->orderBy(['id' => SORT_ASC])->all();
    $longAgo = Db::prepareDateForDb((new DateTime())->modify('-2 hours'));
    DeliveryAttempt::updateAll(['status' => DeliveryAttemptModel::STATUS_PROCESSING, 'claimedAt' => $longAgo], ['id' => $interrupted->id]);
    DeliveryAttempt::updateAll(['dueAt' => $longAgo], ['id' => $lost->id]);

    $recovered = BackInStock::$plugin->getDelivery()->recoverStalled();

    expect($recovered['interrupted'])->toBeGreaterThanOrEqual(1)
        ->and($recovered['requeued'])->toBeGreaterThanOrEqual(1);

    $interrupted->refresh();
    $lost->refresh();
    $run->refresh();

    expect($interrupted->status)->toBe(DeliveryAttemptModel::STATUS_UNKNOWN)
        ->and($interrupted->errorCode)->toBe('worker-interrupted')
        ->and($run->unknownCount)->toBe(1)
        ->and($lost->status)->toBe(DeliveryAttemptModel::STATUS_PENDING)
        ->and($lost->dueAt)->not->toBe($longAgo)
        ->and(BackInStock::$plugin->getDelivery()->recoverStalled())->toBe(['interrupted' => 0, 'requeued' => 0]);
});

it('only replaces a verification link that can no longer work, and marks failed sends as undelivered', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = true;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'pending@example.test');
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $subscriptions->queueVerification($subscription);

    expect($subscriptions->resendStaleVerification($subscription))->toBeFalse();

    $job = new SendSubscriptionMessage(['subscriptionId' => $subscription->id, 'messageKey' => 'back_in_stock_verification']);

    expect(fn() => withMailResult(false, fn() => $job->execute(Craft::$app->getQueue())))->toThrow(Exception::class);

    $subscription->refresh();

    expect($subscription->verificationExpiresAt)->toBeNull()
        ->and($subscriptions->resendStaleVerification($subscription))->toBeTrue();

    $subscription->refresh();
    $subscription->verificationExpiresAt = Db::prepareDateForDb((new DateTime())->modify('-1 hour'));

    expect($subscriptions->resendStaleVerification($subscription))->toBeTrue();
});

it('treats cancelling a finished subscription as done', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'finished@example.test');
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $subscriptions->markNotified($subscription);

    expect($subscriptions->cancel($subscription))->toBeTrue()
        ->and($subscription->state)->toBe(SubscriptionModel::STATE_NOTIFIED);
});

it('counts each waiting subscriber once across repeat evaluations', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_STOCK_MATCHED;
    $settings->subscribersPerUnit = 1;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();

    foreach (['one', 'two', 'three'] as $name) {
        $this->createSubscription($variant, "$name@example.test");
    }

    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 2);
    $availability = BackInStock::$plugin->getAvailability();
    $run = $availability->evaluate((int)$variant->id, (int)$variant->siteId);

    expect($run->eligibleCount)->toBe(3)
        ->and($run->selectedCount)->toBe(2)
        ->and($run->status)->toBe('exhausted');

    $run = $availability->evaluate((int)$variant->id, (int)$variant->siteId);

    expect($run->eligibleCount)->toBe(3)
        ->and($run->selectedCount)->toBe(2);
});

it('reports only each subscriber’s latest outcome on the Overview and returns real dates', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->batchDelay = 0;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'alert@example.test');
    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 1);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);
    $attempt = DeliveryAttempt::find()->where(['runId' => $run->id])->one();
    $controller = new DashboardController('dashboard', BackInStock::$plugin);
    $counts = new ReflectionMethod($controller, '_dashboardCounts');
    $activity = new ReflectionMethod($controller, '_activityData');
    $before = $counts->invoke($controller);

    withMailResult(false, fn() => BackInStock::$plugin->getDelivery()->deliver((int)$attempt->id));
    $retry = DeliveryAttempt::find()->where(['runId' => $run->id, 'attemptNumber' => 2])->one();
    withMailResult(true, fn() => BackInStock::$plugin->getDelivery()->deliver((int)$retry->id));
    $retry->refresh();

    expect($retry->status)->toBe(DeliveryAttemptModel::STATUS_SENT)
        ->and($counts->invoke($controller)['attention'])->toBe($before['attention'])
        ->and($activity->invoke($controller, 1, 8, (int)$variant->id)['entries'][0]['occurredAt'])->toBeInstanceOf(DateTimeInterface::class);

    // A final failure with no retry left is what the alert exists for.
    $settings->maximumAttempts = 1;
    $failing = $this->createVariant();
    $this->createSubscription($failing, 'alert-final@example.test');
    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($failing, 1);
    $failedRun = BackInStock::$plugin->getAvailability()->evaluate((int)$failing->id, (int)$failing->siteId);
    $failedAttempt = DeliveryAttempt::find()->where(['runId' => $failedRun->id])->one();
    withMailResult(false, fn() => BackInStock::$plugin->getDelivery()->deliver((int)$failedAttempt->id));

    expect($counts->invoke($controller)['failed'])->toBe($before['failed'] + 1);
});

it('reports template errors as a retryable failure', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'render@example.test');
    $service = BackInStock::$plugin->getService();
    $handler = function(): void {
        throw new Twig\Error\RuntimeError('Broken template');
    };
    $service->on(verbb\backinstock\services\Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $handler);

    try {
        $result = $service->sendSubscriptionMessage($subscription, 'back_in_stock_available');
    } finally {
        $service->off(verbb\backinstock\services\Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $handler);
    }

    expect($result['status'])->toBe(DeliveryAttemptModel::STATUS_FAILED)
        ->and($result['code'])->toBe('render-failed');
});

it('renders the cancellation prompt with a form and results without one', function() {
    $view = Craft::$app->getView();
    $variables = ['language' => 'en', 'message' => 'Stop <now>?', 'homeUrl' => 'https://example.test/', 'siteName' => 'Example'];
    $prompt = $view->renderTemplate('craft-commerce-back-in-stock/lifecycle', $variables + ['needsConfirmation' => true], View::TEMPLATE_MODE_CP);
    $result = $view->renderTemplate('craft-commerce-back-in-stock/lifecycle', $variables + ['needsConfirmation' => false], View::TEMPLATE_MODE_CP);

    expect($prompt)->toContain('method="post"')
        ->and($prompt)->toContain('Stop &lt;now&gt;?')
        ->and($result)->not->toContain('<form');
});

it('expires requests by last update and also runs retention during garbage collection', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->activeExpiry = 30;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $legacy = $this->createSubscription($variant, 'legacy-age@example.test');
    $stale = $this->createSubscription($variant, 'stale@example.test');
    $old = Db::prepareDateForDb((new DateTime())->modify('-2 years'));
    Subscription::updateAll(['dateCreated' => $old], ['id' => $legacy->id]);
    Subscription::updateAll(['dateCreated' => $old, 'dateUpdated' => $old], ['id' => $stale->id]);

    Craft::$app->getGc()->trigger(Gc::EVENT_RUN);

    $legacy->refresh();
    $stale->refresh();

    expect($legacy->state)->toBe(SubscriptionModel::STATE_ACTIVE)
        ->and($stale->state)->toBe(SubscriptionModel::STATE_EXPIRED);
});

it('upgrades real 4.1 subscription rows and can resume after a failed attempt', function() {
    // A prefixed connection keeps this DDL away from the suite's installed schema and rollback transaction.
    $db = clone Craft::$app->getDb();
    $db->tablePrefix = 'bisup_';
    $projectConfig = Craft::$app->getProjectConfig();
    $policyPath = 'plugins.craft-commerce-back-in-stock.settings.notificationPolicy';
    $originalPolicy = $projectConfig->get($policyPath);
    $emailTemplatePath = 'plugins.craft-commerce-back-in-stock.settings.emailTemplate';
    $confirmationTemplatePath = 'plugins.craft-commerce-back-in-stock.settings.confirmationEmailTemplate';
    $tables = ['backinstock_delivery_attempts', 'backinstock_runs', 'backinstock_records', 'commerce_site_stores', 'commerce_variants', 'commerce_stores', 'users'];

    $dropTables = function() use ($db, $tables): void {
        foreach ($tables as $table) {
            if ($db->tableExists("{{%$table}}")) {
                $db->createCommand()->dropTable("{{%$table}}")->execute();
            }
        }
    };
    $dropTables();

    try {
        foreach (['users', 'commerce_stores', 'commerce_variants'] as $table) {
            $db->createCommand()->createTable("{{%$table}}", ['id' => 'pk'])->execute();
        }

        $db->createCommand()->createTable('{{%commerce_site_stores}}', ['siteId' => 'integer', 'storeId' => 'integer'])->execute();
        $db->createCommand()->createTable('{{%backinstock_records}}', [
            'id' => 'pk',
            'email' => "string(255) NOT NULL DEFAULT ''",
            'variantId' => 'integer',
            'siteId' => 'integer',
            'locale' => 'string(12)',
            'options' => 'text',
            'isNotified' => 'boolean',
            'pendingKey' => 'char(64)',
            'dateCreated' => 'datetime NOT NULL',
            'dateUpdated' => 'datetime NOT NULL',
            'uid' => 'char(36)',
        ])->execute();
        $db->createCommand()->insert('{{%commerce_stores}}', ['id' => 7])->execute();
        $db->createCommand()->insert('{{%commerce_site_stores}}', ['siteId' => 3, 'storeId' => 7])->execute();

        $now = '2024-01-01 00:00:00';
        $rows = [
            'waiting' => ['Mixed.Case@Example.test', false],
            'notified' => ['done@example.test', true],
            'blank-one' => ['', false],
            'blank-two' => ['', false],
        ];

        foreach ($rows as [$email, $isNotified]) {
            $db->createCommand()->insert('{{%backinstock_records}}', [
                'email' => $email,
                'variantId' => 11,
                'siteId' => 3,
                'locale' => 'en-US',
                'isNotified' => $isNotified,
                'pendingKey' => $isNotified ? null : Log::createPendingKey($email, 11, 3, 'en-US'),
                'dateCreated' => $now,
                'dateUpdated' => $now,
                'uid' => StringHelper::UUID(),
            ])->execute();
        }

        // Run the migration twice: MySQL keeps the DDL from an interrupted attempt, so the retry starts mid-way.
        (new m261005_000000_subscription_lifecycle(['db' => $db]))->safeUp();
        (new m261005_000000_subscription_lifecycle(['db' => $db]))->safeUp();
        (new m261005_010000_canonical_active_identity(['db' => $db]))->safeUp();

        $migrated = (new Query())->from('{{%backinstock_records}}')->orderBy(['id' => SORT_ASC])->all($db);

        expect($migrated[0]['state'])->toBe(SubscriptionModel::STATE_ACTIVE)
            ->and($migrated[0]['activeKey'])->toBe(SubscriptionModel::createActiveKey('mixed.case@example.test', 11, 3, 7, 'en-US'))
            ->and($migrated[0]['recipientKey'])->toBe(SubscriptionModel::createRecipientKey('mixed.case@example.test'))
            ->and((int)$migrated[0]['storeId'])->toBe(7)
            ->and($migrated[1]['state'])->toBe(SubscriptionModel::STATE_NOTIFIED)
            ->and($migrated[1]['activeKey'])->toBeNull()
            ->and(substr($migrated[1]['notifiedAt'], 0, 10))->toBe('2024-01-01')
            ->and(substr($migrated[0]['dateCreated'], 0, 10))->toBe('2024-01-01')
            ->and(substr($migrated[0]['dateUpdated'], 0, 10))->not->toBe('2024-01-01')
            ->and($migrated[2]['state'])->toBe(SubscriptionModel::STATE_CANCELLED)
            ->and($migrated[2]['cancelSource'])->toBe('upgrade')
            ->and($migrated[3]['state'])->toBe(SubscriptionModel::STATE_CANCELLED)
            ->and($migrated[3]['activeKey'])->toBeNull()
            ->and($db->tableExists('{{%backinstock_runs}}'))->toBeTrue()
            ->and($db->tableExists('{{%backinstock_delivery_attempts}}'))->toBeTrue();

        if ($originalPolicy === null) {
            expect($projectConfig->get($policyPath))->toBe(Settings::NOTIFICATION_POLICY_ALL);
        }

        expect($projectConfig->get($emailTemplatePath))->toBe('craft-commerce-back-in-stock/emails/notification')
            ->and($projectConfig->get($confirmationTemplatePath))->toBe('craft-commerce-back-in-stock/emails/confirmation');
    } finally {
        $dropTables();
        $db->close();

        if ($originalPolicy === null) {
            $projectConfig->remove($policyPath);
        }

        $projectConfig->remove($emailTemplatePath);
        $projectConfig->remove($confirmationTemplatePath);
    }
});

it('erases a person from every subscription while keeping run history', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $waitingVariant = $this->createVariant();
    $selectedVariant = $this->createVariant();
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $waiting = $this->createSubscription($waitingVariant, 'Erase.Me@example.test');
    $selected = $this->createSubscription($selectedVariant, 'erase.me@example.test');
    $other = $this->createSubscription($waitingVariant, 'keep@example.test');

    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($selectedVariant, 5);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$selectedVariant->id, (int)$selectedVariant->siteId);
    $attempt = DeliveryAttempt::find()->where(['runId' => $run->id, 'subscriptionId' => $selected->id])->one();
    withMailResult(false, fn() => BackInStock::$plugin->getDelivery()->deliver((int)$attempt->id));
    $attempt->refresh();
    $attempt->errorMessage = '550 mailbox erase.me@example.test rejected';
    $attempt->save(false);
    $retry = DeliveryAttempt::find()->where(['runId' => $run->id, 'attemptNumber' => 2])->one();

    $sources = [];
    $handler = function($event) use (&$sources): void {
        $sources[] = [$event->source, $event->subscription->email];
    };
    $subscriptions->on($subscriptions::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE, $handler);

    try {
        $erased = $subscriptions->eraseRecipient($waiting);
    } finally {
        $subscriptions->off($subscriptions::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE, $handler);
    }

    $blankKey = SubscriptionModel::createRecipientKey('');

    foreach ([$waiting, $selected] as $subscription) {
        $subscription->refresh();

        expect($subscription->state)->toBe(SubscriptionModel::STATE_CANCELLED)
            ->and($subscription->cancelSource)->toBe('operator')
            ->and($subscription->email)->toBe('')
            ->and($subscription->recipientKey)->toBe($blankKey)
            ->and($subscription->activeKey)->toBeNull();
    }

    $attempt->refresh();
    $other->refresh();

    // Listeners need to see who is leaving before the address is gone.
    expect($erased)->toBe(2)
        ->and($sources)->toHaveCount(2)
        ->and($sources[0][0])->toBe('operator')
        ->and($sources[0][1])->not->toBe('')
        ->and($attempt->status)->toBe(DeliveryAttemptModel::STATUS_FAILED)
        ->and($attempt->errorCode)->not->toBeNull()
        ->and($attempt->errorMessage)->toBeNull()
        ->and($other->state)->toBe(SubscriptionModel::STATE_ACTIVE)
        ->and($other->email)->toBe('keep@example.test');

    // The retry already queued must not reach a mailer with no address.
    $sent = 0;
    $mailer = Craft::$app->getMailer();
    $counter = function() use (&$sent): void {
        $sent++;
    };
    $mailer->on(BaseMailer::EVENT_BEFORE_SEND, $counter);

    try {
        BackInStock::$plugin->getDelivery()->deliver((int)$retry->id);
    } finally {
        $mailer->off(BaseMailer::EVENT_BEFORE_SEND, $counter);
    }

    $retry->refresh();

    expect($sent)->toBe(0)
        ->and($retry->status)->toBe(DeliveryAttemptModel::STATUS_CANCELLED);

    // Erased rows share a blank key, which must not pull in other people's scrubbed rows.
    expect($subscriptions->eraseRecipient($waiting))->toBe(1);

    // Erasing doesn't block that person from asking again.
    $returning = $this->createSubscription($waitingVariant, 'erase.me@example.test');

    expect($returning->state)->toBe(SubscriptionModel::STATE_ACTIVE);
});

it('drops queued confirmation emails once a subscription has been cancelled', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $subscription = $this->createSubscription($variant, 'queued@example.test');
    $job = new SendSubscriptionMessage([
        'subscriptionId' => $subscription->id,
        'messageKey' => 'back_in_stock_confirmation',
    ]);
    $sent = 0;
    $mailer = Craft::$app->getMailer();
    $counter = function() use (&$sent): void {
        $sent++;
    };
    $mailer->on(BaseMailer::EVENT_BEFORE_SEND, $counter);

    try {
        withMailResult(true, fn() => $job->execute(Craft::$app->getQueue()));
        $sentWhileActive = $sent;

        $subscriptions->cancel($subscription, 'operator');
        withMailResult(true, fn() => $job->execute(Craft::$app->getQueue()));

        $subscriptions->eraseRecipient($subscription);
        withMailResult(true, fn() => $job->execute(Craft::$app->getQueue()));
    } finally {
        $mailer->off(BaseMailer::EVENT_BEFORE_SEND, $counter);
    }

    expect($sentWhileActive)->toBe(1)
        ->and($sent)->toBe(1);
});
