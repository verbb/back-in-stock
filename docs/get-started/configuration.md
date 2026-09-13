# Configuration

You can customise Back In Stock’s settings using a PHP configuration file. This is optional: each setting has a default, so you only need to include the values you want to change.

To override a setting, create `craft-commerce-back-in-stock.php` in your Craft project’s `/config` directory and return an array of setting names and values. For example, the following will change the name displayed in the control panel:

```php
<?php

return [
    'pluginName' => 'Back In Stock Tools',
];
```

All other settings keep their defaults. Add any further settings you want to change to the same array. The options below explain the available settings and their defaults.

## Configuration Options

::: reference
### `pluginName`

**Type:** `string` · **Default:** `'Back in Stock'`

The name displayed for the plugin in the control panel.
:::

::: reference
### `hasCpSection`

**Type:** `bool` · **Default:** `true`

Whether to enable Back in Stock in the main sidebar navigation.
:::

::: reference
### `stockThreshold`

**Type:** `int` · **Default:** `0`

Set the minimum number of items in stock that should trigger notifications.
:::

::: reference
### `includeAvailableForPurchase`

**Type:** `bool` · **Default:** `false`

Whether variants disabled for purchase should be treated as out of stock, even when stock is available.
:::

::: reference
### `sendConfirmation`

**Type:** `bool` · **Default:** `false`

Whether a confirmation email should be sent to the customer if they request to be notified.
:::

::: reference
### `confirmationEmailTemplate`

**Type:** `string|null` · **Default:** `null`

Use a custom template for the confirmation email.
:::

::: reference
### `confirmationEmailSubject`

**Type:** `string` · **Default:** `'Back in stock notification confirmation for {{ variant.title }}'`

The email subject for the confirmation email.
:::

::: reference
### `emailTemplate`

**Type:** `string|null` · **Default:** `null`

Use a custom template for the notification email.
:::

::: reference
### `emailSubject`

**Type:** `string` · **Default:** `'Order today, {{ variant.title }} is now in stock'`

The email subject for the notification email.
:::

::: reference
### `purgeRequests`

**Type:** `bool` · **Default:** `false`

Purge notification requests from the database when a notification is successfully sent.
:::


## Control Panel
You can also manage configuration settings through the Control Panel by visiting Settings → Back In Stock.
