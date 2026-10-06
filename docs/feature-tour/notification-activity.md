# Notification Activity

Notification activity explains what Back in Stock did when a variant became available. It connects the stock check and subscriber selection to the individual messages processed by Craft’s queue, providing more evidence than a single “email sent” entry.

## Selecting Recipients

The **Notification Recipients** setting controls how many waiting customers are selected for a restock.

**Match available stock** selects the oldest eligible subscriptions according to the stock on hand. **Subscribers per Available Unit** can widen that selection when not every notified customer is expected to purchase. For example, five available units with two subscribers per unit selects up to ten people. Variants with unlimited stock select everyone who is waiting.

**Notify all waiting subscribers** selects every eligible subscription regardless of the available quantity.

Both policies select the oldest subscriptions first. Selecting a recipient does not reserve stock or guarantee that the item will still be available when they visit the store.

## Batches and Availability Checks

Selected recipients are divided into internal queue batches. **Batch Size** controls how many deliveries belong to each batch, and **Batch Delay** spaces later batches apart.

Before processing a delivery, Back in Stock confirms that the subscription is still waiting and the variant is still available. If stock disappears, the affected pending work is cancelled rather than sent. This is why notification activity can contain selected recipients who did not ultimately receive a message.

## Delivery Outcomes

Each delivery attempt records one of these outcomes:

- **Sent** means Craft’s mailer accepted the message for delivery. It does not confirm inbox delivery, an email open, or a purchase.
- **Failed** means the message was not handed to the mailer. A definite failure can be retried up to the configured maximum.
- **Cancelled** means the subscription or product availability changed before delivery.
- **Sending unconfirmed** means processing ended without reliable proof of whether the mailer accepted the message. It is not retried automatically because doing so could send a duplicate.

A single notification activity can cover many recipients, and one recipient can have several attempts when a definite failure is retried. The summary counts each selected subscription by its latest durable outcome, while the delivery table retains the individual attempts and their diagnostic messages.

## Reviewing Activity

Open a variant’s **Activity** tab to follow subscription changes and restock notifications in chronological order. Subscription events explain when a customer joined, verified, or left the waiting list. Notification entries open a detail page containing recipient selection, current outcomes, timestamps, and delivery diagnostics.

Failed and unconfirmed outcomes are marked for review on the detail page and in the Overview alert. The recorded error code and message can help distinguish a mail configuration problem from an eligibility or stock change.
