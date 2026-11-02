# Configuration
Create a `craft-commerce-back-in-stock.php` file under your `/config` directory with the following options available to you. You can also use multi-environment options to change these per environment.

The below shows the defaults already used by Back In Stock, so you don't need to add these options unless you want to modify the values.

```php
<?php

return [
    '*' => [
        'pluginName' => 'Back In Stock',
        'hasCpSection' => true,
        'stockThreshold' => 0,
        'stockFieldHandle' => null,
        'sendConfirmation' => false,
        'confirmationEmailTemplate' => 'craft-commerce-back-in-stock/emails/confirmation',
        'confirmationEmailSubject' =>'Back in stock notification confirmation for {{ variant.title }}',
        'emailTemplate' => 'craft-commerce-back-in-stock/emails/notification',
        'emailSubject' => 'Order today, {{ variant.title }} is now in stock',
        'purgeRequests' => false,
    ]
];
```

## Configuration options
- `pluginName` - If you wish to customise the plugin name.
- `hasCpSection` - Whether to enable Back in Stock in the main sidebar navigation.
- `stockThreshold` - Set the minimum number of items in stock that should trigger notifications.
- `stockFieldHandle` - The handle of a numeric custom field on the variant to use instead of Commerce stock. See [Custom Stock Field](#custom-stock-field).
- `sendConfirmation` - Whether a confirmation email should be sent to the customer if they request to be notified.
- `confirmationEmailTemplate` - Use a custom template for the confirmation email.
- `confirmationEmailSubject` - The email subject for the confirmation email.
- `emailTemplate` - Use a custom template for the notification email.
- `emailSubject` - The email subject for the notification email.
- `purgeRequests` - Purge notification requests from the database when a notification is successfully sent.

## Custom Stock Field
Use `stockFieldHandle` when an ERP or warehouse integration stores stock in a custom field, including variants set to unlimited stock in Commerce. This setting is only available in the config file.

The field replaces Commerce stock for Back In Stock sign-ups and notifications, and must be higher than `stockThreshold`. Commerce checkout and inventory are unaffected. Fractional quantities are rounded down and empty values count as zero. A missing field or non-numeric value counts as out of stock and logs an error.

Notifications are triggered when a variant is saved through Craft and its field value rises above `stockThreshold`, so your integration must save the variant element rather than update the database directly. Add the field to every subscribed variant's field layout, and use `craft.backInStock.isVariantInStock(variant)` in your templates so forms follow the same rule. See [Example Form](docs:template-guides/example-form).

## Control Panel
You can also manage configuration settings through the Control Panel by visiting Settings → Back In Stock.
