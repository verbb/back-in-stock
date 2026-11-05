# Configuration

You can customise Back in Stock’s settings using a PHP configuration file. This is optional: settings that are not included in the file retain their defaults.

To override a setting, create `craft-commerce-back-in-stock.php` in the Craft project’s `/config` directory and return an array of setting names and values. For example, the following changes the name displayed in the control panel:

```php
<?php

return [
    'pluginName' => 'Product Alerts',
];
```

Values in this file override settings saved through the control panel. Add only the settings that need to differ for the project or environment.

## Configuration Options

### General Settings

::: reference
#### `pluginName`

**Type:** `string` · **Default:** `'Back in Stock'`

The name displayed for the plugin in the control panel.
:::

::: reference
#### `hasCpSection`

**Type:** `bool` · **Default:** `true`

Whether Back in Stock appears in the main control-panel navigation.
:::

### Delivery

::: reference
#### `notificationPolicy`

**Type:** `string` · **Default:** `'stockMatched'`

Controls how many waiting customers are selected when a variant becomes available. Use `'stockMatched'` to start with the oldest requests and limit the number according to the stock on hand, or `'all'` to notify everyone waiting even when demand exceeds stock.
:::

::: reference
#### `subscribersPerUnit`

**Type:** `int` · **Default:** `1`

The number of oldest waiting subscribers selected for each available unit when `notificationPolicy` is `'stockMatched'`. For example, stock of `3` with a value of `2` selects up to six subscribers. A value greater than `1` can account for notified customers who do not complete a purchase.

This field is shown in the control panel only when **Notification Recipients** is set to **Match available stock**.
:::

::: reference
#### `stockFieldHandle`

**Type:** `string|null` · **Default:** `null`

The handle of a numeric custom field on the variant to use instead of Commerce inventory. Set this in `config/craft-commerce-back-in-stock.php` when an ERP or warehouse integration stores stock in a custom field:

```php
<?php

return [
    'stockFieldHandle' => 'warehouseStock',
    'stockThreshold' => 0,
];
```

The field controls availability, stock-matched recipient limits and the stock recorded in notification history, even when Commerce inventory tracking is disabled. Commerce checkout and inventory settings are unaffected. The value must exceed `stockThreshold`; fractional quantities are rounded down to whole units. Empty values count as zero. A missing field or invalid numeric value is treated as unavailable and logs an error instead of falling back to Commerce stock.

Use a field available on every subscribed variant's field layout. Its value is read in the variant's site context; it does not sum Commerce inventory locations. For sites sharing a Commerce store, keep the field's stock quantity consistent across those sites. `includeAvailableForPurchase` still applies when enabled.

Saving a variant queues an availability check when customers are waiting for it. Integrations that bypass element saves should run the [scheduled check](#scheduled-checks) after syncing. Use `craft.backInStock.isVariantInStock(variant)` in storefront form conditions so they follow the same field and threshold; see [Example Form](docs:template-guides/example-form). Leave this setting `null` or empty to use Commerce inventory.
:::

::: reference
#### `stockThreshold`

**Type:** `int` · **Default:** `0`

The native or custom stock level a variant must exceed before it is considered available. With the default of `0`, the variant needs at least one unit in stock.
:::

::: reference
#### `includeAvailableForPurchase`

**Type:** `bool` · **Default:** `false`

Whether Commerce must also consider a variant available for purchase before Back in Stock sends notifications.
:::

::: reference
#### `batchSize`

**Type:** `int` · **Default:** `100`

The maximum number of selected emails scheduled together through Craft’s queue.
:::

::: reference
#### `batchDelay`

**Type:** `int` · **Default:** `60`

The delay in seconds before each additional notification batch is scheduled. A value of `0` schedules every batch immediately.
:::

::: reference
#### `maximumAttempts`

**Type:** `int` · **Default:** `3`

The maximum number of delivery attempts for a notification that definitely failed. Sending results that cannot be confirmed are retained for review and are not retried automatically because the mail transport may already have accepted the message.
:::

### Subscription

::: reference
#### `requireVerification`

**Type:** `bool` · **Default:** `false`

Whether a new subscription must be confirmed through a signed email link before it can receive an availability notification.
:::

::: reference
#### `verificationWindow`

**Type:** `int` · **Default:** `48`

The number of hours after subscribing that a customer can use the emailed verification link. Once this window closes, the link can no longer activate the request.

This field is shown in the control panel only when **Require Email Verification** is enabled.
:::

::: reference
#### `pendingExpiry`

**Type:** `int` · **Default:** `7`

The number of days an unverified request can remain pending before the scheduled check marks it expired. Expired requests cannot receive notifications and no longer prevent the customer from subscribing again. Use a period at least as long as `verificationWindow`.

This field is shown in the control panel only when **Require Email Verification** is enabled.
:::

::: reference
#### `activeExpiry`

**Type:** `int` · **Default:** `365`

The number of days a waiting request can remain without a successful availability notification before the scheduled check marks it expired. Expired requests cannot receive notifications and the customer can subscribe again.
:::

::: reference
#### `historyRetention`

**Type:** `int` · **Default:** `90`

The number of days notified, cancelled, and expired requests remain visible under **Products** before the scheduled check removes them. Pending and waiting requests are unaffected. Use `0` to retain completed history indefinitely.
:::

### Email

::: reference
#### `sendConfirmation`

**Type:** `bool` · **Default:** `false`

Whether to send a confirmation after an immediately active subscription is created. When email verification is required, Back in Stock sends the verification message instead.
:::

::: reference
#### `fromEmail`

**Type:** `string|null` · **Default:** `null`

The sender email address. Environment variables and aliases are supported. When omitted, Craft’s system email address is used.
:::

::: reference
#### `fromName`

**Type:** `string|null` · **Default:** `null`

The sender name. Environment variables and aliases are supported. When omitted, Craft’s system sender name is used.
:::

::: reference
#### `confirmationEmailTemplate`

**Type:** `string|null` · **Default:** `null`

An optional site Twig template that completely replaces the `back_in_stock_confirmation` System Message body. The template receives `variant`, `subscription`, `options`, `cancelUrl`, and `subject`.
:::

::: reference
#### `confirmationEmailSubject`

**Type:** `string` · **Default:** `'Back in stock notification confirmation for {{ variant.title }}'`

The Twig-enabled subject used with `confirmationEmailTemplate`. Craft’s editable System Message subject is used when no custom template is configured.
:::

::: reference
#### `emailTemplate`

**Type:** `string|null` · **Default:** `null`

An optional site Twig template that completely replaces the `back_in_stock_available` System Message body. It receives the same variables as the confirmation template.
:::

::: reference
#### `emailSubject`

**Type:** `string` · **Default:** `'Order today, {{ variant.title }} is now in stock'`

The Twig-enabled subject used with `emailTemplate`. Craft’s editable System Message subject is used when no custom template is configured.
:::

## Control Panel

You can manage the main settings through **Settings → Plugins → Back in Stock**. The settings are separated into General Settings, Delivery, Subscription, and Email. `stockFieldHandle` is configured only in the PHP config file. Options that depend on stock matching or email verification appear only when the related feature is enabled.

## System Messages

When a custom Twig template is not configured, edit the confirmation, verification, and availability emails under **Utilities → System Messages**. The message keys are `back_in_stock_confirmation`, `back_in_stock_verification`, and `back_in_stock_available`.

## Scheduled Checks

Normal Commerce inventory changes trigger availability checks automatically and do not depend on this command. Schedule it when the store needs to catch changes made by imports or integrations that do not report the expected Commerce inventory event. The command also applies the subscription expiry and completed-history settings.

```shell
php craft craft-commerce-back-in-stock/reconcile
```

The command is safe to run repeatedly. A five-minute interval is a reasonable starting point for most stores.

::: tip
Ensure Craft’s queue is being processed, either by its automatic queue runner or a dedicated worker. Availability checks and notification deliveries use queued jobs and will wait until the queue runs.
:::
