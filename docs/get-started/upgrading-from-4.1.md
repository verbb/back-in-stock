# Upgrading from 4.1

Back in Stock 4.2 is a non-breaking minor release. Update the package and run Craft’s migrations normally:

```shell
composer update verbb/back-in-stock
php craft up
```

The migration keeps the existing `backinstock_records` table and enriches those rows as subscriptions. Existing active requests remain active, existing notified requests remain historical, and their email, variant, site, locale, options, and dates are preserved.

## Notification reach stays the same

Fresh installations default to the stock-matched notification policy. Upgraded installations are explicitly set to `all`, preserving the 4.1 behaviour of notifying every eligible request when a variant returns to stock. Review **Settings → Back in Stock** and choose stock-matched selection when the store is ready to tie reach to available units.

## Email editing moves into Craft

When no custom Twig template is configured, the confirmation and availability emails now use editable Craft System Messages. The new verification email is also a System Message. Existing custom template paths and their subject settings continue to work unchanged and take precedence over System Messages.

Review the messages under **Settings → Email → System Messages** after upgrading, especially if the previous bundled template had been accepted without a custom override.

## Existing integrations continue to work

The public `craft-commerce-back-in-stock/base/register-interest` action, form fields, HTML redirects, and JSON `success` and `message` fields are preserved. JSON success responses additionally include `state`.

The `Log` model and record, `Logs` and `Inventory` components, `SendEmailNotification` job, and log save events remain as compatibility adapters throughout the 4.x release line. New code should use subscriptions, availability runs, and delivery attempts instead. See the [developer API guide](docs:developers/api).

The old `purgeRequests` setting still deletes a subscription immediately after successful delivery. Prefer `historyRetention` for new projects so operators retain a bounded audit trail.

## Add reconciliation to the scheduler

Schedule the following command and keep Craft’s queue running:

```shell
php craft craft-commerce-back-in-stock/reconcile
```

The command closes gaps from missed inventory signals, expires stale pending or active subscriptions, and applies history retention. It is idempotent and can run every five minutes.
