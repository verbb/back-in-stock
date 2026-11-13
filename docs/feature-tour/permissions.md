# Permissions

Back in Stock's permissions let staff follow product demand without giving everyone the ability to change it. A merchandiser might only need to see which variants people are waiting for, while a customer service team also handles cancellation and erasure requests, and whoever looks after email delivery retries failed notifications. Set them in **Settings → Users → User Groups**, or on an individual user's **Permissions** tab.

**Access Back In Stock** is listed under **General**, with Craft's other permissions for reaching each plugin's section. The other two are listed under the plugin's own heading, which shows the plugin's name in the control panel, **Back in Stock** unless you've changed **Plugin Name** in the plugin settings.

| Permission | What It Allows |
| --- | --- |
| Access Back In Stock | View the Overview and Products screens, each variant's **Subscriptions** and **Activity** tabs, and notification detail pages, including subscribers' email addresses. |
| Cancel subscriptions and erase subscriber data | Use **Cancel subscription** and **Erase subscriber data** from a subscription's actions menu. |
| Retry failed notifications and mark notifications as reviewed | Use **Retry failed sends** and **Mark as reviewed** on a notification's detail page. |

Anyone given one of the other permissions needs **Access Back In Stock** too, because every screen they act from sits in the plugin's section. Someone with only that permission can see demand, subscriptions and notification results, but the actions menu on a subscription row and the buttons on a notification are hidden from them.

**Erase subscriber data** removes an email address from every subscription it appears in, on every variant and site, and can't be undone. Give **Cancel subscriptions and erase subscriber data** to the people who handle customers' privacy requests rather than everyone who looks at demand. See [Managing Subscriptions](subscriptions.md#managing-subscriptions) and [Acting on Review Items](notification-activity.md#acting-on-review-items) for what each action does.

Admins can always do all of this. The plugin settings are for admins only, and only appear in the plugin's navigation where Craft's `allowAdminChanges` setting is on.
