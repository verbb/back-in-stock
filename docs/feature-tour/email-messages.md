# Email Messages

Back in Stock can send three kinds of customer email. Each message has a different place in the subscription lifecycle, so stores can enable the parts that suit their sign-up process.

## Confirmation Messages

A confirmation acknowledges that an immediately active subscription was created. It does not ask the customer to take another action and does not mean the product is available.

Enable **Confirmation Email** when customers should receive a receipt for joining the waiting list. If email verification is required, the verification message is sent instead.

## Verification Messages

A verification message contains a signed link that activates a pending subscription. Until the customer follows that link, the request is not eligible for an availability notification.

The verification link remains valid for the configured verification window. Its message should make the required action and expiry clear without implying that stock has been reserved.

## Availability Messages

An availability message is sent after a variant becomes available and the subscription is selected for notification. It identifies the exact Commerce variant and directs the customer back to the product.

Mailer acceptance is recorded as sent, but Back in Stock does not claim that the message reached the inbox, was opened, or led to a purchase. [Notification Activity](docs:feature-tour/notification-activity) explains the delivery outcomes retained by the plugin.

## Editing Message Content

The default confirmation, verification, and availability content is managed through **Utilities → System Messages**. This is the usual place to edit subjects and message bodies, including localised content for a multisite project.

Projects that need complete control over the HTML can configure a site Twig template for confirmation or availability messages. A custom template replaces the corresponding System Message body and receives the subscribed `variant`, `subscription`, decoded `options`, signed `cancelUrl`, and rendered `subject`. Verification remains a System Message and also receives its signed `verifyUrl`.

Sender name and address can be set on the plugin’s **Email** page. When left empty, the plugin uses Craft’s system email settings.

See [Custom Email Templates](docs:template-guides/custom-email-templates) for complete Twig examples, the available template variables, and steps for configuring confirmation and availability templates.
