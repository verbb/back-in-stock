# How It Works

Back in Stock connects customer interest to the inventory already managed by Craft Commerce. It records who wants an update for an exact product variant, watches for that variant to become available, and schedules the appropriate notification work through Craft’s queue.

## From Subscription to Notification

A customer starts by entering their email address for an unavailable product or option, such as a particular size or colour. The storefront form associates that request with the exact Commerce variant behind the scenes, giving each variant its own waiting list. The form only needs to send the email address and variant ID to Back in Stock; see [Example Form](docs:template-guides/example-form) for a working Twig template.

When Commerce reports an inventory change, Back in Stock queues an availability check. It also responds when a variant is saved, covering custom stock fields, unlimited stock and control-panel changes that do not produce an inventory event. The plugin reads native inventory from the current Commerce variant by default. Integrations can use a numeric custom variant field instead with [`stockFieldHandle`](docs:get-started/configuration#stockfieldhandle). The variant must exceed the configured stock threshold and, when enabled, be available for purchase.

Once a variant is available, Back in Stock chooses how many waiting customers to notify according to the **Notification Recipients** setting. Larger lists are processed in groups through Craft's queue, and stock is checked again before each message is sent. This prevents an old stock change or a cancelled request from producing an inappropriate notification.

## While a Variant Remains Available

The period from a variant becoming available until it becomes unavailable again is treated as one restock. Repeated inventory updates during that time are kept together, so the same request is not selected more than once while the variant remains available.

If the variant sells out and later becomes available again, a new cycle begins. Customers whose earlier subscriptions were successfully notified can subscribe again for that later restock.

## What Back in Stock Records

Back in Stock keeps three related kinds of information:

- A **subscription** records one customer waiting for one exact variant and whether that request is waiting, notified, cancelled, or expired.
- A **notification** records who was selected when that variant became available.
- A **delivery attempt** records the result each time an individual email was processed, including any retry and error details.

This lets the control panel distinguish between a customer joining a waiting list, being selected for a restock email, and Craft's mailer accepting that message. The [Subscriptions](docs:feature-tour/subscriptions) and [Notification Activity](docs:feature-tour/notification-activity) pages explain those stages in more detail.

## Add a Scheduled Safety Check

Normal Commerce inventory changes trigger availability checks automatically, so the scheduled command is not required for the usual notification flow. It is still recommended for production stores because it catches changes made by imports or integrations that do not report the expected Commerce inventory event. It also expires old requests and removes completed history according to the plugin's [subscription settings](docs:get-started/configuration#subscription).

Run the following command on a regular schedule:

```shell
php craft craft-commerce-back-in-stock/reconcile
```

The command also requeues notifications whose queue job was lost and flags any interrupted by a stopped worker for review.

The command is safe to run repeatedly, and a five-minute interval is a reasonable starting point for most stores. Ensure Craft’s queue is also being processed, either by its automatic queue runner or a dedicated worker, so availability checks and notification deliveries do not remain queued.
