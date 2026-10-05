# How Back in Stock Works

Back in Stock adds a small storefront action and a durable notification workflow around Craft Commerce inventory. Commerce remains the source of truth for stock and purchasability; the plugin records who is waiting, which subscribers were selected, and what happened to each delivery.

## 1. Capture a subscription

Place the [notification form](docs:template-guides/example-form) beside an unavailable Commerce variant. The form accepts guests and signed-in customers, and a subscription always belongs to the exact variant rather than its parent product.

Repeated submissions for the same recipient, variant, site, store, and language resolve to the existing active subscription. Optional JSON `options` can carry bounded template context such as the selected colour label, but do not create a second subscription identity.

New subscriptions are either `active` immediately or `pendingVerification` when email verification is enabled. Signed-in customers are linked to their Craft user while the email address remains the delivery identity.

## 2. Open an availability window

Commerce inventory events enqueue a lightweight availability evaluation after stock has been committed. A scheduled reconciliation command covers updates that do not emit the expected event and also performs lifecycle expiry and retention cleanup.

When a variant becomes available, Back in Stock opens one restock run for that variant and Commerce store. Repeated signals during the same availability window reuse the run, so the same subscription is not selected twice. The window closes when the variant becomes unavailable again; a later restock opens a new run.

## 3. Select the right cohort

The stock-matched policy selects the oldest active subscriptions first. Available stock is multiplied by `subscribersPerUnit`, making it possible to notify one person per unit or deliberately contact a wider cohort. Variants with unlimited stock select every eligible subscriber.

The notify-all policy selects every eligible subscriber. Existing installations use this policy after upgrading so 4.1 notification reach does not change unexpectedly; fresh installations default to stock-matched selection.

## 4. Deliver and retain outcomes

Selected subscriptions are split into configurable internal queue batches. Before each send, the plugin checks that the subscription is still active and the variant is still available. Successful delivery moves the subscription to `notified`; a cancelled or expired subscription is never sent.

Each attempt finishes as `sent`, `failed`, `cancelled`, or `unknown`. Definite failures retry up to the configured maximum. An exception after handing work to the mailer is retained as `unknown` rather than retried automatically, avoiding an accidental duplicate message when acceptance cannot be proven.

## 5. Operate from Craft

The Back in Stock control-panel section contains three focused destinations:

- **Overview** is the operational home. Its health state is green when no action is required, orange for uncertain delivery outcomes, and red for definite failures. The summary links open the exact subscriptions, product activity, or delivery issues behind each count. The page also ranks the variants customers are waiting for and shows recent lifecycle activity without turning the plugin into a general analytics dashboard.
- **Notifications** brings customer requests and lifecycle evidence together. The **Subscriptions** tab shows every recipient request across pending, active, notified, cancelled, and expired states; search by email, filter by lifecycle state, or open the related product from any row. The **Activity** tab combines subscription changes with notification runs in chronological order, and each run opens into its selected cohort and delivery attempts.
- **Settings** controls availability, selection, batching, verification, retention, and template overrides.

Product activity remains available as supporting detail from Overview and Notifications. The report compares exact variants by current and lifetime interest, while each product summary connects the customers waiting now with its recent notification activity. It is deliberately not a top-level catalogue view: products appear only after Back in Stock records subscription activity for them.

## Customer-controlled lifecycle

Availability and confirmation messages include a signed cancellation URL through `cancelUrl`. Verification messages include `verifyUrl`. These public actions support normal HTML responses and JSON clients without requiring a customer account.

## Email content

Confirmation, verification, and availability emails are Craft System Messages by default, so editors can change their subject and body without creating templates. Projects that need full markup control can provide custom site Twig templates for confirmation and availability messages.

## Storefront assets

Back in Stock does not register public CSS or JavaScript. The form and any progressive enhancement belong to the project, which keeps its markup, validation feedback, and design system under site control.
