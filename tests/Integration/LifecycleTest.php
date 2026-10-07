<?php

use verbb\backinstock\BackInStock;
use verbb\backinstock\events\DeliveryAttemptEvent;
use verbb\backinstock\events\RecipientSelectionEvent;
use verbb\backinstock\events\SubscriptionEvent;
use verbb\backinstock\events\SubscriptionMessageEvent;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\Subscription;
use verbb\backinstock\services\Availability;
use verbb\backinstock\services\Delivery;
use verbb\backinstock\services\Service;
use verbb\backinstock\services\Subscriptions;

use craft\commerce\Plugin as Commerce;
use craft\helpers\Db;

uses(verbb\backinstock\tests\Integration\TestCase::class);

it('installs the complete Craft and Commerce schema', function() {
    $db = Craft::$app->getDb();

    expect(Craft::$app->getPlugins()->isPluginInstalled('commerce'))->toBeTrue()
        ->and(Craft::$app->getPlugins()->isPluginInstalled('craft-commerce-back-in-stock'))->toBeTrue()
        ->and($db->tableExists('{{%backinstock_records}}'))->toBeTrue()
        ->and($db->tableExists('{{%backinstock_runs}}'))->toBeTrue()
        ->and($db->tableExists('{{%backinstock_delivery_attempts}}'))->toBeTrue();
});

it('exposes cancellable subscription creation events around persistence', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $events = [];
    $subscriptions = BackInStock::$plugin->getSubscriptions();
    $beforeHandler = function(SubscriptionEvent $event) use (&$events): void {
        $events[] = ['before', $event->subscription->id, $event->subscription->email];
    };
    $afterHandler = function(SubscriptionEvent $event) use (&$events): void {
        $events[] = ['after', $event->subscription->id, $event->subscription->email];
    };
    $subscriptions->on(Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION, $beforeHandler);
    $subscriptions->on(Subscriptions::EVENT_AFTER_CREATE_SUBSCRIPTION, $afterHandler);

    try {
        $subscription = $this->createSubscription($variant, 'events@example.test');

        expect($events)->toBe([
            ['before', null, 'events@example.test'],
            ['after', $subscription->id, 'events@example.test'],
        ]);

        $cancelHandler = function(SubscriptionEvent $event): void {
            $event->isValid = false;
        };
        $subscriptions->on(Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION, $cancelHandler);

        try {
            $log = new Log([
                'variantId' => $variant->id,
                'siteId' => $variant->siteId,
                'locale' => Craft::$app->language,
            ]);
            $log->setEmail('cancelled@example.test');

            expect(BackInStock::$plugin->getLogs()->saveLog($log))->toBeFalse()
                ->and($log->hasErrors('email'))->toBeTrue()
                ->and(Subscription::find()->where(['email' => 'cancelled@example.test'])->exists())->toBeFalse()
                ->and($events)->toHaveCount(3);
        } finally {
            $subscriptions->off(Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION, $cancelHandler);
        }
    } finally {
        $subscriptions->off(Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION, $beforeHandler);
        $subscriptions->off(Subscriptions::EVENT_AFTER_CREATE_SUBSCRIPTION, $afterHandler);
    }
});

it('persists verification and cancellation through the real subscription service', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->requireVerification = true;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'verification@example.test');

    expect($subscription->state)->toBe(SubscriptionModel::STATE_PENDING_VERIFICATION);

    $token = BackInStock::$plugin->getSubscriptions()->prepareVerification($subscription);

    expect(BackInStock::$plugin->getSubscriptions()->verify((int)$subscription->id, 'incorrect-token'))->toBeFalse()
        ->and(BackInStock::$plugin->getSubscriptions()->verify((int)$subscription->id, $token))->toBeTrue();

    $subscription->refresh();

    expect($subscription->state)->toBe(SubscriptionModel::STATE_ACTIVE)
        ->and(BackInStock::$plugin->getSubscriptions()->cancel($subscription))->toBeTrue();

    $subscription->refresh();

    expect($subscription->state)->toBe(SubscriptionModel::STATE_CANCELLED)
        ->and($subscription->cancelSource)->toBe('recipient');
});

it('selects waiting subscribers and records a cancelled send without using a mail transport', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_STOCK_MATCHED;
    $settings->subscribersPerUnit = 1;
    $settings->batchSize = 100;
    $settings->batchDelay = 0;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $subscriptions = [
        $this->createSubscription($variant, 'first@example.test'),
        $this->createSubscription($variant, 'second@example.test'),
        $this->createSubscription($variant, 'third@example.test'),
    ];

    foreach ($subscriptions as $index => $subscription) {
        Subscription::updateAll([
            'dateCreated' => Db::prepareDateForDb((new DateTime())->modify('-' . (3 - $index) . ' hours')),
        ], ['id' => $subscription->id]);
    }

    $selectedEvent = null;
    $messageEvent = null;
    $completedEvent = null;
    $availability = BackInStock::$plugin->getAvailability();
    $service = BackInStock::$plugin->getService();
    $delivery = BackInStock::$plugin->getDelivery();
    $selectionHandler = function(RecipientSelectionEvent $event) use (&$selectedEvent): void {
        $selectedEvent = $event;
    };
    $messageHandler = function(SubscriptionMessageEvent $event) use (&$messageEvent): void {
        $messageEvent = $event;
        $event->isValid = false;
    };
    $completionHandler = function(DeliveryAttemptEvent $event) use (&$completedEvent): void {
        $completedEvent = $event;
    };
    $availability->on(Availability::EVENT_AFTER_SELECT_NOTIFICATION_RECIPIENTS, $selectionHandler);
    $service->on(Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $messageHandler);
    $delivery->on(Delivery::EVENT_AFTER_COMPLETE_DELIVERY_ATTEMPT, $completionHandler);

    try {
        Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 2);
        $run = $availability->evaluate((int)$variant->id, (int)$variant->siteId);

        expect($run)->not->toBeNull()
            ->and($run->selectedCount)->toBe(2)
            ->and($selectedEvent)->toBeInstanceOf(RecipientSelectionEvent::class)
            ->and(array_map(fn(Subscription $subscription) => $subscription->email, $selectedEvent->subscriptions))->toBe([
                'first@example.test',
                'second@example.test',
            ]);

        $attempt = DeliveryAttempt::find()
            ->where(['runId' => $run->id])
            ->orderBy(['subscriptionId' => SORT_ASC])
            ->one();
        $delivery->deliver((int)$attempt->id);
        $attempt->refresh();

        expect($messageEvent)->toBeInstanceOf(SubscriptionMessageEvent::class)
            ->and($attempt->status)->toBe(DeliveryAttemptModel::STATUS_CANCELLED)
            ->and($attempt->errorCode)->toBe('send-cancelled')
            ->and($completedEvent)->toBeInstanceOf(DeliveryAttemptEvent::class)
            ->and($completedEvent->attempt->id)->toBe($attempt->id);

        $subscriptions[0]->refresh();
        expect($subscriptions[0]->state)->toBe(SubscriptionModel::STATE_ACTIVE);
    } finally {
        $availability->off(Availability::EVENT_AFTER_SELECT_NOTIFICATION_RECIPIENTS, $selectionHandler);
        $service->off(Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE, $messageHandler);
        $delivery->off(Delivery::EVENT_AFTER_COMPLETE_DELIVERY_ATTEMPT, $completionHandler);
    }
});

it('expires stale requests and removes only old completed history', function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->pendingExpiry = 7;
    $settings->activeExpiry = 30;
    $settings->historyRetention = 90;
    $settings->sendConfirmation = false;
    $variant = $this->createVariant();
    $active = $this->createSubscription($variant, 'old-active@example.test');
    $settings->requireVerification = true;
    $pending = $this->createSubscription($variant, 'old-pending@example.test');
    $settings->requireVerification = false;
    $notified = $this->createSubscription($variant, 'old-notified@example.test');
    BackInStock::$plugin->getSubscriptions()->markNotified($notified);

    Subscription::updateAll(['dateCreated' => Db::prepareDateForDb((new DateTime())->modify('-31 days'))], ['id' => $active->id]);
    Subscription::updateAll(['dateCreated' => Db::prepareDateForDb((new DateTime())->modify('-8 days'))], ['id' => $pending->id]);
    Subscription::updateAll(['dateUpdated' => Db::prepareDateForDb((new DateTime())->modify('-91 days'))], ['id' => $notified->id]);

    expect(BackInStock::$plugin->getSubscriptions()->expireStale())->toBe(2);

    $active->refresh();
    $pending->refresh();

    expect($active->state)->toBe(SubscriptionModel::STATE_EXPIRED)
        ->and($pending->state)->toBe(SubscriptionModel::STATE_EXPIRED);

    Subscription::updateAll(['dateUpdated' => Db::prepareDateForDb((new DateTime())->modify('-91 days'))], ['id' => $active->id]);

    expect(BackInStock::$plugin->getSubscriptions()->purgeHistory())->toBe(2)
        ->and(Subscription::findOne($active->id))->toBeNull()
        ->and(Subscription::findOne($notified->id))->toBeNull()
        ->and(Subscription::findOne($pending->id))->not->toBeNull();
});
