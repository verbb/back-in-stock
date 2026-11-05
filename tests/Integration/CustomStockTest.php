<?php

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Settings;
use verbb\backinstock\queue\jobs\EvaluateAvailability;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;

use craft\commerce\elements\Variant;
use craft\fieldlayoutelements\CustomField;
use craft\fields\Number;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use yii\queue\PushEvent;
use yii\queue\Queue;

uses(verbb\backinstock\tests\Integration\TestCase::class);

it('uses saved custom stock for queued evaluations, recipient selection and delivery rechecks', function(string $policy, int $selectedCount) {
    $field = new Number([
        'name' => 'Warehouse Stock',
        'handle' => 'warehouseStock' . bin2hex(random_bytes(4)),
        'decimals' => 0,
    ]);
    expect(Craft::$app->getFields()->saveField($field))->toBeTrue();
    $layout = new FieldLayout(['type' => Variant::class]);
    $tab = new FieldLayoutTab(['name' => 'Inventory']);
    $tab->setLayout($layout);
    $tab->setElements([new CustomField($field)]);
    $layout->setTabs([$tab]);
    $variant = $this->createVariant(0, $layout);
    $variant->inventoryTracked = false;
    $variant->setFieldValue($field->handle, 0);
    expect(Craft::$app->getElements()->saveElement($variant))->toBeTrue();

    $settings = BackInStock::$plugin->getSettings();
    $settings->stockFieldHandle = $field->handle;
    $settings->stockThreshold = 0;
    $settings->notificationPolicy = $policy;
    $settings->subscribersPerUnit = 1;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $settings->batchDelay = 0;
    $availability = BackInStock::$plugin->getAvailability();

    foreach (['first', 'second', 'third'] as $recipient) {
        $this->createSubscription($variant, $recipient . '@example.test');
    }

    expect($availability->evaluate((int)$variant->id, (int)$variant->siteId))->toBeNull();

    $jobs = [];
    $queue = Craft::$app->getQueue();
    $handler = function(PushEvent $event) use (&$jobs): void {
        if ($event->job instanceof EvaluateAvailability) {
            $jobs[] = $event->job;
        }
    };
    $queue->on(Queue::EVENT_BEFORE_PUSH, $handler);

    try {
        $variant->setFieldValue($field->handle, 2);
        expect(Craft::$app->getElements()->saveElement($variant))->toBeTrue();
    } finally {
        $queue->off(Queue::EVENT_BEFORE_PUSH, $handler);
    }

    expect($jobs)->not->toBeEmpty();
    foreach ($jobs as $job) {
        $job->execute($queue);
    }

    $run = RestockRun::find()->where(['variantId' => $variant->id])->one();
    expect($run)->not->toBeNull()
        ->and((int)$run->observedStock)->toBe(2)
        ->and((int)$run->selectedCount)->toBe($selectedCount);
    $repeated = $availability->evaluate((int)$variant->id, (int)$variant->siteId);
    expect($repeated->id)->toBe($run->id)
        ->and((int)DeliveryAttempt::find()->where(['runId' => $run->id])->count())->toBe($selectedCount);

    // A queued notification must see the later custom-field sell-out, despite unlimited native stock.
    $variant->setFieldValue($field->handle, 0);
    expect(Craft::$app->getElements()->saveElement($variant))->toBeTrue();
    $attempt = DeliveryAttempt::find()->where(['runId' => $run->id])->one();
    BackInStock::$plugin->getDelivery()->deliver((int)$attempt->id);
    $attempt->refresh();
    $run->refresh();
    expect($attempt->status)->toBe(DeliveryAttemptModel::STATUS_CANCELLED)
        ->and($attempt->errorCode)->toBe('stock-unavailable')
        ->and($run->availabilityKey)->toBeNull()
        ->and((int)DeliveryAttempt::find()->where(['runId' => $run->id, 'status' => DeliveryAttemptModel::STATUS_CANCELLED])->count())->toBe($selectedCount);

    // Reconciliation reads the same field and can open the next availability window.
    $variant->setFieldValue($field->handle, 3);
    expect(Craft::$app->getElements()->saveElement($variant))->toBeTrue();
    $availability->reconcile();
    $nextRun = RestockRun::find()->where(['variantId' => $variant->id])->andWhere(['not', ['availabilityKey' => null]])->one();
    expect($nextRun)->not->toBeNull()
        ->and($nextRun->id)->not->toBe($run->id)
        ->and((int)$nextRun->observedStock)->toBe(3)
        ->and((int)$nextRun->selectedCount)->toBe(3);

    // A misconfigured source must also cancel delivery rather than leave a processing attempt stranded.
    $settings->stockFieldHandle = 'missingWarehouseStock';
    $nextAttempt = DeliveryAttempt::find()->where(['runId' => $nextRun->id])->one();
    BackInStock::$plugin->getDelivery()->deliver((int)$nextAttempt->id);
    $nextAttempt->refresh();
    expect($nextAttempt->status)->toBe(DeliveryAttemptModel::STATUS_CANCELLED);
})->with([
    'stock matched' => [Settings::NOTIFICATION_POLICY_STOCK_MATCHED, 2],
    'notify everyone' => [Settings::NOTIFICATION_POLICY_ALL, 3],
]);

function createCustomStockLayout(): array
{
    $field = new Number([
        'name' => 'Warehouse Stock',
        'handle' => 'warehouseStock' . bin2hex(random_bytes(4)),
        'decimals' => 0,
    ]);
    expect(Craft::$app->getFields()->saveField($field))->toBeTrue();
    $layout = new FieldLayout(['type' => Variant::class]);
    $tab = new FieldLayoutTab(['name' => 'Inventory']);
    $tab->setLayout($layout);
    $tab->setElements([new CustomField($field)]);
    $layout->setTabs([$tab]);

    $settings = BackInStock::$plugin->getSettings();
    $settings->stockFieldHandle = $field->handle;
    $settings->stockThreshold = 0;
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $settings->batchDelay = 0;

    return [$layout, $field];
}

function saveCustomStock(Variant $variant, string $handle, int $quantity): int
{
    $jobs = 0;
    $queue = Craft::$app->getQueue();
    $handler = function(PushEvent $event) use (&$jobs): void {
        $jobs += (int)($event->job instanceof EvaluateAvailability);
    };
    $queue->on(Queue::EVENT_BEFORE_PUSH, $handler);

    try {
        $variant->setFieldValue($handle, $quantity);
        expect(Craft::$app->getElements()->saveElement($variant))->toBeTrue();
    } finally {
        $queue->off(Queue::EVENT_BEFORE_PUSH, $handler);
    }

    return $jobs;
}

it('ignores catalogue syncs until a customer is waiting, then still closes runs nobody is waiting on', function() {
    [$layout, $field] = createCustomStockLayout();
    $variant = $this->createVariant(0, $layout);
    $availability = BackInStock::$plugin->getAvailability();
    $siteId = (int)$variant->siteId;

    expect(saveCustomStock($variant, $field->handle, 5))->toBe(0)
        ->and($availability->evaluate((int)$variant->id, $siteId))->toBeNull()
        ->and(RestockRun::find()->where(['variantId' => $variant->id])->exists())->toBeFalse();

    saveCustomStock($variant, $field->handle, 0);
    $subscription = $this->createSubscription($variant, 'waiting@example.test');

    expect(saveCustomStock($variant, $field->handle, 5))->toBeGreaterThan(0);
    $run = $availability->evaluate((int)$variant->id, $siteId);
    expect($run)->not->toBeNull();

    // With no active subscribers left, the open run alone must keep the sell-out signal flowing.
    BackInStock::$plugin->getSubscriptions()->markNotified($subscription);
    expect(saveCustomStock($variant, $field->handle, 0))->toBeGreaterThan(0)
        ->and($availability->evaluate((int)$variant->id, $siteId))->toBeNull();
    $run->refresh();
    expect($run->availabilityKey)->toBeNull();
});

it('caps oversized custom stock in the run snapshot instead of failing the evaluation', function() {
    [$layout, $field] = createCustomStockLayout();
    $variant = $this->createVariant(0, $layout);
    $this->createSubscription($variant, 'oversized@example.test');
    saveCustomStock($variant, $field->handle, 3000000000);

    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);
    $run->refresh();

    expect((int)$run->observedStock)->toBe(2147483647)
        ->and((int)$run->selectedCount)->toBe(1);
});
