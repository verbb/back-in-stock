# Subscriptions

A subscription represents one email address waiting for one exact Commerce variant. It also records the site, store, and language needed to send the correct message.

## Subscription States

A subscription can move through these states:

- **Awaiting verification** means email verification is required and the customer has not yet used their signed verification link.
- **Waiting** means the request is active and eligible for a future restock notification.
- **Notified** means an availability message was successfully handed to Craft’s mailer.
- **Cancelled** means the customer ended the request before notification.
- **Expired** means the request exceeded its configured lifetime without being notified or verified.

Only waiting subscriptions can be selected when a variant becomes available. A successfully notified, cancelled, or expired customer can subscribe again later.

## Duplicate Requests

Repeated submissions for the same email address, variant, site, store, and language resolve to the existing active request. The public response remains neutral, so a storefront does not reveal whether that address was already subscribed.

Optional `options` data can pass a small amount of extra storefront information to an email template, such as the label shown by a custom variant selector. Changing those details does not create another subscription for the same email address and variant.

## Email Verification

When **Require Email Verification** is enabled, a new request waits for the customer to follow the signed link in its verification email. The verification window controls how long that link remains usable, while the pending expiry setting controls how long an unverified record is retained.

Verification is useful when a store wants stronger evidence that the recipient controls the submitted email address. When it is disabled, new subscriptions become active immediately and can optionally receive a confirmation message.

## Cancellation and Expiry

Confirmation emails include a signed cancellation URL, so recipients can leave a waiting list without signing in. Custom confirmation templates receive the same `cancelUrl` value. Cancelling one variant does not affect subscriptions for other variants.

Waiting subscriptions can also expire after a configured period without a successful notification. Expiry stops an old request from remaining on the waiting list indefinitely and allows that customer to subscribe again. **Completed History Retention** separately controls how long notified, cancelled, and expired records remain available when answering customer questions or investigating a problem.

You can inspect these records from the **Subscriptions** tab for a variant. Search by email address or filter by state when tracing a particular customer request.
