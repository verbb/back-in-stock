# Example Form

Back in Stock deliberately provides an action rather than storefront markup or assets. Start with this unstyled Twig form, then adapt it to the project’s design and variant selector.

```twig
{% set variant = product.defaultVariant %}

{% if variant and not craft.backInStock.isVariantInStock(variant) %}
    <form method="post">
        {{ csrfInput() }}
        {{ actionInput('craft-commerce-back-in-stock/base/register-interest') }}
        {{ redirectInput(product.url) }}
        {{ hiddenInput('variantId', variant.id) }}

        <label for="back-in-stock-email">Email address</label>
        <input
            id="back-in-stock-email"
            type="email"
            name="email"
            value="{{ currentUser ? currentUser.email : '' }}"
            autocomplete="email"
            required
        >

        <button type="submit">Notify me when available</button>
    </form>
{% endif %}
```

`craft.backInStock.isVariantInStock()` applies the same rules as the registration action, including `stockThreshold`, `includeAvailableForPurchase` and [`stockFieldHandle`](docs:get-started/configuration#stockfieldhandle). Use it instead of `variant.hasStock()`, which only reads Commerce inventory: a variant with inventory tracking disabled always has stock, so the form would never appear.

Craft places the success message in the `notice` flash and validation or rate-limit failures in the `error` flash. Render those through the project’s usual flash-message component.

## Variant Selectors

A subscription belongs to a Commerce variant. If customers can choose a size, colour, or another option, update `variantId` before submission so it matches the selected variant rather than always submitting the default.

```twig
<select name="variantId" required>
    {% for variant in product.variants %}
        {% if not craft.backInStock.isVariantInStock(variant) %}
            <option value="{{ variant.id }}">{{ variant.title }}</option>
        {% endif %}
    {% endfor %}
</select>
```

## Optional Template Context

Pass a JSON object in `options` when an email template needs extra storefront information that is not convenient to derive from the variant. Options are limited to 8 KB, and changing them does not create another subscription for the same email address and variant.

```twig
{% set options = {
    productTitle: product.title,
    selectedLabel: variant.title,
} %}

{{ hiddenInput('options', options | json_encode) }}
```

Custom email templates receive `variant`, `subscription`, `options`, `cancelUrl`, and `subject`. The verification System Message also receives `verifyUrl`.

## JSON and Progressive Enhancement

Send the same fields to the same action with an `Accept: application/json` header. A successful response contains `success`, `message`, and the subscription `state`:

```json
{
    "success": true,
    "message": "customer@example.com will be notified when Medium is available.",
    "state": "active"
}
```

When verification is required, `state` is `pendingVerification`. Validation failures return `success: false` with an `error` string. Duplicate active submissions intentionally return the same public success shape without adding another delivery job.

```js
const form = document.querySelector('[data-back-in-stock-form]');

form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch(form.action || window.location.href, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: new FormData(form),
    });
    const result = await response.json();

    form.querySelector('[data-back-in-stock-status]').textContent = result.message || result.error;
});
```

Add `data-back-in-stock-form` to the form and a status element such as `<p data-back-in-stock-status aria-live="polite"></p>` if using this enhancement. The JavaScript is project-owned example code; the plugin does not enqueue it.

## Rate Limiting

Registration is temporarily limited to ten attempts from the same direct connection address or recipient within five minutes. Visitors behind a shared proxy share that connection allowance. Multi-node installations should use shared cache and mutex backends so duplicate and abuse controls are consistent across application nodes.
