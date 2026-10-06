# How It Works

Back in Stock connects customer interest to the inventory already managed by Craft Commerce. It records who wants an update for an exact product variant, watches for that variant to become available, and schedules the appropriate notification work through Craft’s queue.

## From Subscription to Notification

A customer starts by entering their email address for an unavailable product or option, such as a particular size or colour. The storefront form associates that request with the exact Commerce variant behind the scenes, giving each variant its own waiting list. The form only needs to send the email address and variant ID to Back in Stock; see [Example Form](docs:template-guides/example-form) for a working Twig template.

When Commerce reports an inventory change, Back in Stock queues an availability check. It also responds when a variant is saved, covering unlimited stock and some control-panel changes that do not produce an inventory event. The plugin reads the current Commerce variant rather than maintaining a second source of stock information. The variant must exceed the configured stock threshold and, when enabled, be available for purchase.

Once a variant is available, Back in Stock selects subscribers according to the configured notification policy. The selected work is divided into queue batches, and availability is checked again before each message is handed to Craft’s mailer. This prevents an old stock event or a cancelled subscription from producing an inappropriate notification.

## One Restock Cycle at a Time

The period from a variant becoming available until it becomes unavailable again is treated as one restock cycle. Repeated inventory updates during that cycle reuse the same notification activity, so a subscription is not selected more than once for the same restock.

If the variant sells out and later becomes available again, a new cycle begins. Customers whose earlier subscriptions were successfully notified can subscribe again for that later restock.

## What Back in Stock Records

Back in Stock retains three related kinds of information:

- A **subscription** records one customer waiting for one exact variant and its current lifecycle state.
- A **notification activity** records the selection made when that variant became available.
- A **delivery attempt** records what happened when an individual message was processed, including retries and diagnostic information.

These records allow the control panel to distinguish between a customer joining a waiting list, a notification being selected for delivery, and the mailer actually accepting a message. The [Subscriptions](docs:feature-tour/subscriptions) and [Notification Activity](docs:feature-tour/notification-activity) pages explain those stages in more detail.

## Schedule Reconciliation

Normal Commerce inventory changes trigger availability checks automatically, so reconciliation is not required for the usual notification flow. It is still recommended for production stores because it recovers inventory changes from imports or integrations that do not produce the expected Commerce event. It also expires old requests and removes completed history according to the plugin’s [subscription settings](docs:get-started/configuration#subscription).

Run the following command on a regular schedule:

```shell
php craft craft-commerce-back-in-stock/reconcile
```

The command is safe to run repeatedly, and a five-minute interval is a reasonable starting point for most stores. Ensure Craft’s queue is also being processed, either by its automatic queue runner or a dedicated worker, so availability checks and notification deliveries do not remain queued.
