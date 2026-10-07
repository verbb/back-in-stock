# Events

Back in Stock provides events for responding to subscription and notification changes. Modules and plugins can register listeners, typically in their `init()` methods.

## Subscription Creation

### The `beforeCreateSubscription` Event

The event that is triggered after a new subscription has been prepared and before it is saved. Set `$event->isValid` to `false` to stop the subscription from being created; the `afterCreateSubscription` event will not run for that request.

```php
use verbb\backinstock\events\SubscriptionEvent;
use verbb\backinstock\services\Subscriptions;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_BEFORE_CREATE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        $subscription = $event->subscription;
    },
);
```

### The `afterCreateSubscription` Event

The event that is triggered after a new subscription has been saved.

```php
Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_CREATE_SUBSCRIPTION,
    function(SubscriptionEvent $event) {
        $subscription = $event->subscription;
    },
);
```

## Subscription State Changes

### The `afterChangeSubscriptionState` Event

The event that is triggered after an existing subscription is verified, cancelled, expired, or notified. The event contains the previous and new states. Its `source` is `verification`, `delivery`, `reconciliation`, or the source supplied when the subscription was cancelled.

```php
use verbb\backinstock\events\SubscriptionStateEvent;
use verbb\backinstock\services\Subscriptions;
use yii\base\Event;

Event::on(
    Subscriptions::class,
    Subscriptions::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE,
    function(SubscriptionStateEvent $event) {
        $subscription = $event->subscription;
        $previousState = $event->previousState;
        $newState = $event->newState;
        $source = $event->source;
    },
);
```

## Recipient Selection

### The `afterSelectNotificationRecipients` Event

The event that is triggered after subscribers have been selected for a restock notification. It contains the notification run, Commerce variant, and subscriptions added during that selection.

```php
use verbb\backinstock\events\RecipientSelectionEvent;
use verbb\backinstock\services\Availability;
use yii\base\Event;

Event::on(
    Availability::class,
    Availability::EVENT_AFTER_SELECT_NOTIFICATION_RECIPIENTS,
    function(RecipientSelectionEvent $event) {
        $run = $event->run;
        $variant = $event->variant;
        $subscriptions = $event->subscriptions;
    },
);
```

This event reports the completed selection. Changing its `subscriptions` array does not alter the queued deliveries.

## Outgoing Subscription Messages

### The `beforeSendSubscriptionMessage` Event

The event that is triggered immediately before a confirmation, verification, or availability message is handed to Craft’s mailer. Listeners can modify the Craft message or set `$event->isValid` to `false` to cancel delivery. Cancelling the event does not cancel or delete the subscription.

```php
use verbb\backinstock\events\SubscriptionMessageEvent;
use verbb\backinstock\services\Service;
use yii\base\Event;

Event::on(
    Service::class,
    Service::EVENT_BEFORE_SEND_SUBSCRIPTION_MESSAGE,
    function(SubscriptionMessageEvent $event) {
        $message = $event->message;
        $subscription = $event->subscription;
        $variant = $event->variant;
        $messageKey = $event->messageKey;

        $message->setReplyTo('support@example.com');
    },
);
```

## Completed Delivery Attempts

### The `afterCompleteDeliveryAttempt` Event

The event that is triggered after an availability delivery attempt has been processed and its notification totals have been refreshed. Read the attempt’s `status`, `errorCode`, and `errorMessage` for the recorded outcome.

```php
use verbb\backinstock\events\DeliveryAttemptEvent;
use verbb\backinstock\services\Delivery;
use yii\base\Event;

Event::on(
    Delivery::class,
    Delivery::EVENT_AFTER_COMPLETE_DELIVERY_ATTEMPT,
    function(DeliveryAttemptEvent $event) {
        $attempt = $event->attempt;
        $run = $event->run;
        $subscription = $event->subscription;
    },
);
```
