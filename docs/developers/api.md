# Developer API

Back in Stock 4.2 exposes subscriptions, restock runs, and delivery attempts as the canonical lifecycle. The plugin instance is available as `BackInStock::$plugin` in PHP and `craft.backInStock.plugin` in Twig.

## Components

```php
use verbb\backinstock\BackInStock;

$subscriptions = BackInStock::$plugin->getSubscriptions();
$availability = BackInStock::$plugin->getAvailability();
$delivery = BackInStock::$plugin->getDelivery();
```

- `getSubscriptions()` loads, verifies, activates, cancels, expires, and purges subscriptions.
- `getAvailability()` evaluates one variant/site pair or reconciles all active demand.
- `getDelivery()` processes a durable delivery attempt. Prefer queueing availability evaluation over calling delivery directly.
- `getService()` retains shared availability, variant, mail, and registration helpers, plus compatibility entry points.

## Records and states

The canonical Active Record classes are:

```php
use verbb\backinstock\records\Subscription;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\DeliveryAttempt;
```

Subscription states are `pendingVerification`, `active`, `notified`, `cancelled`, and `expired`. Delivery outcomes are `pending`, `processing`, `sent`, `failed`, `cancelled`, and `unknown`. Restock runs are `open`, `completed`, `exhausted`, or `closed`.

Use the constants on the corresponding model classes instead of copying string values:

```php
use verbb\backinstock\models\Subscription as SubscriptionModel;

$active = Subscription::find()
    ->where(['state' => SubscriptionModel::STATE_ACTIVE])
    ->orderBy(['dateCreated' => SORT_ASC, 'id' => SORT_ASC])
    ->all();
```

The physical `backinstock_records` table name is intentionally retained for 4.x database compatibility. Treat it as an implementation detail and use `records\Subscription` in new code.

## Queue an evaluation

When custom code changes availability outside normal Commerce inventory services, queue an evaluation after the transaction has committed:

```php
$variant = craft\commerce\elements\Variant::find()->id($variantId)->one();

if ($variant) {
    BackInStock::$plugin->getService()->queueVariantEvaluation($variant);
}
```

Evaluation is idempotent within the current variant/store availability window. It rechecks live Commerce state before selecting subscriptions.

## Message template variables

Custom confirmation and availability Twig templates receive:

- `variant`: the live Commerce variant in its subscribed site.
- `subscription`: the subscription Active Record.
- `options`: the decoded JSON object supplied during registration.
- `cancelUrl`: a signed public cancellation URL.
- `subject`: the rendered custom subject.

The verification System Message additionally receives `verifyUrl`.

## Public action contract

POST registrations to `craft-commerce-back-in-stock/base/register-interest` with `variantId`, `email`, and optional JSON `options`. HTML requests retain Craft flash and redirect behaviour. JSON clients should send `Accept: application/json` and handle:

```json
{
    "success": true,
    "message": "customer@example.com will be notified when Medium is available.",
    "state": "active"
}
```

The `state` is `pendingVerification` when double opt-in is enabled. Duplicate active registrations return the same success contract without creating another subscription or email job.

## 4.x compatibility layer

The following 4.1 surfaces remain callable but are deprecated for new integrations:

- `verbb\backinstock\models\Log` and `records\Log`.
- `BackInStock::$plugin->getLogs()` and `getInventory()`.
- `services\Service::findInterestedEmails()` and `sendMail()`.
- `queue\jobs\SendEmailNotification`.
- `Logs::EVENT_BEFORE_SAVE_LOG` and `Logs::EVENT_AFTER_SAVE_LOG`.

The adapters write and read canonical subscription data so existing modules do not need an immediate rewrite. They will remain available throughout 4.x; migrate integrations before the next major version.
