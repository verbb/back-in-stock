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

- **Overview** shows where customers are waiting and what has changed recently. Store-wide request totals sit above a short preview of the most-watched product variants, alongside recent subscription and notification activity. Follow the links below either list to see the full report. When notifications need review, a banner opens the affected activity: red means a notification failed to send, while orange means sending couldn't be confirmed. A notification with an unconfirmed sending result may already have been handed to the mailer, so it isn't blindly retried. No health banner appears when there is nothing to review.
- **Restock Activity** lets you find exact variants with retained customer interest by product identity, SKU, or subscriber email. Each variant brings its subscriptions and retained lifecycle activity together.
- **Settings** controls availability, selection, batching, verification, retention, and template overrides.

**Restock Activity** shows every exact variant with retained Back in Stock data in a standard Craft admin table. Choose a product type in the sidebar beside the content pane, or use the native search field to find a product title, variant title, SKU, or subscriber email. Sort by any column, and use the Craft pagination footer to move through 100 variants at a time. On smaller screens, use Craft's sidebar toggle to access product types. For example, searching “Organic cotton tee” shows each matching size and colour separately, while searching an email shows the variants associated with that subscriber. Open the Product / Variant link to inspect that exact variant. Product, variant, product type and SKU context appear in Craft's details sidebar. The **Subscriptions** tab uses the same native table system, initially showing people currently waiting with email search, state filtering, sortable columns and Ajax pagination. The **Activity** tab follows retained subscription changes and notification runs chronologically in a second native table, and each notification run opens into its recipients, outcomes, and delivery diagnostics.

## Customer-controlled lifecycle

Availability and confirmation messages include a signed cancellation URL through `cancelUrl`. Verification messages include `verifyUrl`. These public actions support normal HTML responses and JSON clients without requiring a customer account.

## Email content

Confirmation, verification, and availability emails are Craft System Messages by default, so editors can change their subject and body without creating templates. Projects that need full markup control can provide custom site Twig templates for confirmation and availability messages.

## Storefront assets

Back in Stock does not register public CSS or JavaScript. The form and any progressive enhancement belong to the project, which keeps its markup, validation feedback, and design system under site control.
