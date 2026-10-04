# Configuration

Configure Back in Stock from **Settings → Back in Stock**, or create `craft-commerce-back-in-stock.php` in the Craft project’s `config` directory. A PHP configuration file is useful when settings need to be consistent across environments.

```php
<?php

return [
    'notificationPolicy' => 'stockMatched',
    'subscribersPerUnit' => 1,
    'batchSize' => 100,
    'batchDelay' => 60,
    'requireVerification' => true,
];
```

Values in the PHP file override control-panel values. Settings that are not listed keep their defaults.

## General settings

::: reference
### `pluginName`

**Type:** `string` · **Default:** `'Back in Stock'`

The name displayed for the plugin in the control panel.
:::

::: reference
### `hasCpSection`

**Type:** `bool` · **Default:** `true`

Whether Back in Stock appears in the main control-panel navigation.
:::

::: reference
### `stockThreshold`

**Type:** `int` · **Default:** `0`

The stock level a tracked variant must exceed before it is considered available. With the default of `0`, a stock level of `1` or more is available.
:::

::: reference
### `includeAvailableForPurchase`

**Type:** `bool` · **Default:** `false`

Whether a variant must also be enabled for purchase before it is considered available.
:::

## Notification selection

::: reference
### `notificationPolicy`

**Type:** `string` · **Default:** `'stockMatched'`

Use `'stockMatched'` to select a cohort based on current stock, or `'all'` to notify every eligible subscriber in the availability window. Existing installations upgraded from 4.1 retain `'all'` until this setting is changed.
:::

::: reference
### `subscribersPerUnit`

**Type:** `int` · **Default:** `1`

The number of oldest eligible subscribers selected for each available unit under the stock-matched policy. For example, stock of `3` with a value of `2` selects up to six subscribers.
:::

::: reference
### `batchSize`

**Type:** `int` · **Default:** `100`

The number of selected deliveries scheduled in each internal queue batch.
:::

::: reference
### `batchDelay`

**Type:** `int` · **Default:** `60`

The delay in seconds between internal queue batches. A value of `0` schedules every batch immediately.
:::

::: reference
### `maximumAttempts`

**Type:** `int` · **Default:** `3`

The maximum number of delivery attempts for a failed notification. Retries use a bounded exponential delay. An uncertain outcome is retained for review and is not retried automatically because the mail transport may have accepted it.
:::

## Subscription lifecycle

::: reference
### `requireVerification`

**Type:** `bool` · **Default:** `false`

Whether a new subscription must be confirmed through a signed email link before it can receive a stock notification.
:::

::: reference
### `verificationWindow`

**Type:** `int` · **Default:** `48`

The number of hours a verification link remains valid.
:::

::: reference
### `pendingExpiry`

**Type:** `int` · **Default:** `7`

The number of days an unverified subscription can remain pending before reconciliation marks it expired.
:::

::: reference
### `activeExpiry`

**Type:** `int` · **Default:** `365`

The number of days an active subscription can remain without notification before reconciliation marks it expired.
:::

::: reference
### `historyRetention`

**Type:** `int` · **Default:** `90`

The number of days notified, cancelled, and expired subscriptions remain available before reconciliation purges them. Use `0` to retain lifecycle history indefinitely.
:::

## Email settings

::: reference
### `sendConfirmation`

**Type:** `bool` · **Default:** `false`

Whether to send a confirmation after an immediately active subscription is created. When verification is required, Back in Stock sends the verification message instead.
:::

::: reference
### `fromEmail`

**Type:** `string|null` · **Default:** `null`

The sender email address. Environment variables and aliases are supported. When omitted, Craft’s system email address is used.
:::

::: reference
### `fromName`

**Type:** `string|null` · **Default:** `null`

The sender name. Environment variables and aliases are supported. When omitted, Craft’s system sender name is used.
:::

::: reference
### `confirmationEmailTemplate`

**Type:** `string|null` · **Default:** `null`

An optional site Twig template that completely replaces the `back_in_stock_confirmation` System Message body. The template receives `variant`, `subscription`, `options`, `cancelUrl`, and `subject`.
:::

::: reference
### `confirmationEmailSubject`

**Type:** `string` · **Default:** `'Back in stock notification confirmation for {{ variant.title }}'`

The Twig-enabled subject used with `confirmationEmailTemplate`. Craft’s editable System Message subject is used when no custom template is configured.
:::

::: reference
### `emailTemplate`

**Type:** `string|null` · **Default:** `null`

An optional site Twig template that completely replaces the `back_in_stock_available` System Message body. It receives the same variables as the confirmation template.
:::

::: reference
### `emailSubject`

**Type:** `string` · **Default:** `'Order today, {{ variant.title }} is now in stock'`

The Twig-enabled subject used with `emailTemplate`. Craft’s editable System Message subject is used when no custom template is configured.
:::

## Deprecated compatibility setting

::: reference
### `purgeRequests`

**Type:** `bool` · **Default:** `false`

Deletes a subscription immediately after successful delivery. This 4.1 setting remains supported throughout 4.x, but `historyRetention` is preferred because it preserves delivery history for a bounded period.
:::

## System Messages

When a custom Twig template is not configured, edit the three Back in Stock emails under **Settings → Email → System Messages**. The available keys are `back_in_stock_confirmation`, `back_in_stock_verification`, and `back_in_stock_available`.

## Reconciliation

Run the reconciliation command on a regular schedule so missed Commerce signals are recovered and lifecycle retention is applied:

```shell
php craft craft-commerce-back-in-stock/reconcile
```

The command is safe to run repeatedly. A five-minute interval is a reasonable starting point for most stores; queue workers must also be running to deliver scheduled jobs.
