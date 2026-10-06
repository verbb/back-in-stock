# Custom Email Templates

Craft System Messages are the usual way to edit Back in Stock email subjects and content. Use a custom site template when an availability or confirmation message needs complete HTML markup, project-specific components, or layout logic that does not fit a System Message.

## Create an Availability Template

Create `templates/emails/back-in-stock-available.twig` in the Craft project. The following complete example identifies the exact variant and links back to its product page:

```twig
<!doctype html>
<html lang="{{ craft.app.language }}">
    <head>
        <meta charset="utf-8">
        <title>{{ subject }}</title>
    </head>
    <body>
        <h1>{{ variant.title }} is available again</h1>

        {% if variant.url %}
            <p><a href="{{ variant.url }}">View {{ variant.product.title }}</a></p>
        {% endif %}
    </body>
</html>
```

Open **Settings → Plugins → Back in Stock → Email** and enter `emails/back-in-stock-available` for **Notification Email Template**. The **Notification Email Subject** field becomes the Twig-enabled subject supplied to the template as `subject`.

Test the template with a subscription and variant whose stock you can change. After increasing the stock and allowing Craft’s queue to run, confirm that the message contains the expected variant and product URL.

## Available Variables

Custom confirmation and availability templates receive:

- `variant`: the live Commerce variant in the subscribed site.
- `subscription`: the subscription record for the recipient and variant.
- `options`: the decoded JSON object submitted by the notification form.
- `cancelUrl`: a signed cancellation URL for the subscription.
- `subject`: the rendered custom subject.

Treat `options` as optional because a storefront does not have to submit it. Derive product and variant information from `variant` whenever possible.

## Customise the Confirmation Template

Create a second site template and enter its path under **Confirmation Email Template**. A confirmation template receives the same variables, so it can identify the selected variant and provide the signed cancellation link while the customer is waiting.

Enable **Confirmation Email** for projects that should send this acknowledgement. When email verification is required, Back in Stock sends the editable verification System Message instead of the confirmation template. The verification message receives `verifyUrl` for its signed activation link.
