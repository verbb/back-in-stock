# Changelog

## Unreleased

### Added
- Added actions to a variant’s Subscriptions tab to cancel a subscription and erase a subscriber’s data, with a new “Cancel subscriptions and erase subscriber data” permission.

### Changed
- Upgraded installations now keep sending the bundled email templates with their saved subjects, as they did in 4.1. Clear the template settings to switch to the editable System Messages.
- Changed cancellation links to open a confirmation page before cancelling, so email security scanners can’t cancel a request by following the link. Verification and cancellation now show their own result page instead of redirecting to the homepage with a flash message.
- Changed expiry and history retention to count from a request’s last update. Requests that existed before upgrading count from the upgrade, so none are removed on the first run.
- Changed expiry, history retention and recovery of stalled notifications to also run during Craft’s garbage collection.
- Changed registration rate limiting to use the forwarded client IP when `trustedHosts` names specific proxies.

### Fixed
- Fixed the upgrade migration failing on installations with existing subscriptions, and made it safe to re-run after a failed attempt.
- Fixed verification and cancellation links being rejected with a 400 error.
- Fixed stock sold through orders not closing a restock run, which prevented waiting subscribers from being notified on the next restock.
- Fixed availability checks and notification deliveries failing on PostgreSQL.
- Fixed verification and cancellation links using control panel URLs when the queue ran from a control panel request, and the wrong site on multi-site installations.
- Fixed a variant disabled on one site cancelling notifications for subscribers on other sites sharing its store.
- Fixed drafts and revisions of variants triggering availability checks.
- Fixed inventory changes only checking availability for the current site’s store.
- Fixed `purgeRequests` losing delivery counts and notifying too many subscribers on stock-matched runs. Delivered subscriptions now keep their row with the recipient details removed.
- Fixed notification attempts staying stuck when a queue worker stopped or a queue job was lost. The `reconcile` command now requeues lost attempts and flags interrupted ones for review.
- Fixed customers with an expired or undelivered verification email being unable to request a new one. Failed confirmation and verification emails now fail their queue job.
- Fixed Overview’s review alert counting notifications whose retry succeeded, and linking to an empty list.
- Fixed template errors being reported as unconfirmed sends and never retried.
- Fixed cancellation links showing an error once a subscriber had already been notified.
- Fixed queued confirmation emails still being sent after a subscription was cancelled.
- Fixed the “subscribers waiting” count on repeat availability checks counting selected subscribers twice.
- Fixed run details and Overview tooltips showing the wrong time when the system timezone isn’t UTC.
- Fixed an error when registering interest with a blank or invalid `variantId`.
- Fixed the log messages for Back In Stock emails that couldn’t be sent not including the recipient’s email or the error.

## 4.2.0 -

### Added
- Added an Overview showing demand by product variant, recent subscription activity and notifications needing review.
- Added optional email verification, signed cancellation links and subscription states for pending verification, active, notified, cancelled and expired requests.
- Added a stock-matched notification policy that selects the oldest waiting customers according to available inventory and a configurable subscribers-per-unit ratio.
- Added the `stockFieldHandle` config setting to use a custom variant field for stock availability and stock-matched notifications, including variants with unlimited Commerce inventory. ([#43](https://github.com/verbb/back-in-stock/issues/43))
- Added `craft.backInStock.isVariantInStock()` so storefront forms can follow the same stock rules as Back in Stock, including `stockFieldHandle`. ([#43](https://github.com/verbb/back-in-stock/issues/43))
- Added notification history with per-recipient delivery attempts, error details and sent, failed, cancelled or unconfirmed outcomes. Confirmed failures can be retried automatically; unconfirmed sends are retained for review.
- Added configurable subscription expiry and completed-history retention.
- Added editable Craft System Messages for confirmation, verification and availability emails, with support for localised subjects and message bodies.
- Added the `craft craft-commerce-back-in-stock/reconcile` command to recover missed inventory changes, expire old requests and remove completed history.
- Added developer events for subscription creation and state changes, recipient selection, outgoing subscription messages, and completed delivery attempts.

### Changed
- Replaced Logs with Products, with product-type filtering, product/variant, SKU and subscriber-email search, and Subscriptions and Activity tabs for each variant.
- Changed notification delivery to use configurable batches, queue availability checks after Commerce commits inventory changes and recheck stock before sending each notification.
- Changed fresh installations to match notification recipients to available stock by default; upgraded installations retain their existing notify-everyone behaviour until the setting is changed.
- Changed successful JSON registration responses to include the subscription `state`, while preserving the existing response fields.

### Deprecated
- Deprecated the legacy Log and Inventory domain APIs in favour of subscriptions, restock runs and delivery attempts. Compatibility adapters remain available throughout the 4.x release line.
- Deprecated immediate post-delivery purging through `purgeRequests`; use `historyRetention` to keep completed history for a configurable period. The existing setting remains functional throughout 4.x.

## 4.1.12 - 2026-10-15

### Changed
- Updated Craft API usage to avoid deprecated calls.

## 4.1.11 - 2026-10-07

### Changed
- Require Verbb Base 3.0.20 or later so shared control-panel layouts use the current asset bundle namespace. ([verbb-base#3](https://github.com/verbb/verbb-base/issues/3))

## 4.1.10 - 2026-10-05

### Fixed
- Fixed a medium-severity improper control of interaction frequency vulnerability.
- Fixed a low-severity information disclosure vulnerability.

## 4.1.9 - 2026-10-02

### Changed
- Updated the required version of `verbb/base` to 3.0.19.

### Fixed
- Fixed a low-severity information disclosure vulnerability.

## 4.1.8 - 2026-09-30

### Fixed
- Fixed notification email subjects and template paths failing when accessing Craft Commerce variant properties. ([#42](https://github.com/verbb/back-in-stock/issues/42))
- Ensure settings can only be saved by authorized administrators.
- Fixed a high-severity database query vulnerability.

## 4.1.7 - 2026-09-23

### Changed
- Render notification email subjects and template-path expressions in Twig sandbox.

## 4.1.6 - 2026-09-14

### Changed
- Updated documentation for clearer, more consistent guidance.
- Clarified optional PHP configuration with focused examples and linkable setting details.

## 4.1.5 - 2026-09-13

### Changed
- Normalize plugin settings.

## 4.1.4 - 2026-05-19

### Added
- Add an `includeAvailableForPurchase` setting to treat variants disabled for purchase as out of stock.

## 4.1.3 - 2026-05-10

### Fixed
- Fix duplicate notification emails when multiple Commerce stock-related events fire during a single variant update.

## 4.1.2 - 2026-05-03

### Fixed
- Fix inventory updates for variants.

## 4.1.1 - 2026-04-29

### Fixed
- Fix logs links by resolving Commerce variant rows to the product edit URL.
- Fix product/variant link.

## 4.1.0 - 2025-11-26

### Added
- Add support for Commerce 5.5 and proper inventory-tracking handling.

### Changed
- Now requires Commerce 5.5+.

## 4.0.9 - 2025-08-13

### Fixed
- Fix incorrect URL for product/variant when one can’t be found.

## 4.0.8 - 2025-07-18

### Fixed
- Fix back-in-stock logic for deeming when a variant comes back in stock.

## 4.0.7 - 2025-03-05

### Added
- Add `stockThreshold` plugin setting to control the minimum stock level to trigger notifications.

## 4.0.6 - 2025-02-03

### Fixed
- Fix log table “Product/Variant” using the Product Type cpEditUrl, instead of the individual Product/Variant cpEditUrl.

## 4.0.5 - 2024-12-31

### Fixed
- Fix an error related to plugin settings.

## 4.0.4 - 2024-12-14

### Added
- Add “From Name” and “From Email” plugin settings.

### Changed
- Email template plugin settings now support aliases and .env variables.

### Fixed
- Fix an issue for case-sensitive email checks.
- Fix an error when viewing logs.

## 4.0.3 - 2024-11-21

### Fixed
- Fix an error on Postgres installs.

## 4.0.2 - 2024-11-20

### Added
- Logs are now sortable.
- Logs can be searched.
- Logs are now lazy-loaded for performance.

### Changed
- Logs are now paginated.
- Logs are now listed newest first by default.

### Fixed
- Fix an error where checks for out of stock variants were being performed on unsaved variants.

## 4.0.1 - 2024-11-08

### Fixed
- Fix an error when adding an email with options.

## 4.0.0 - 2024-10-25

### Changed
- Now requires Craft 5.0+.
- Now requires Craft Commerce 5.0+.

## 3.0.9 - 2025-08-12

### Fixed
- Fix incorrect URL for product/variant when one can’t be found.

## 3.0.8 - 2025-07-18

### Fixed
- Fix back-in-stock logic for deeming when a variant comes back in stock.

## 3.0.7 - 2025-03-05

### Added
- Add `stockThreshold` plugin setting to control the minimum stock level to trigger notifications.

## 3.0.6 - 2025-02-03

### Fixed
- Fix log table “Product/Variant” using the Product Type cpEditUrl, instead of the individual Product/Variant cpEditUrl.

## 3.0.5 - 2024-12-31

### Fixed
- Fix an error related to plugin settings.

## 3.0.4 - 2024-12-14

### Added
- Add “From Name” and “From Email” plugin settings.

### Changed
- Email template plugin settings now support aliases and .env variables.

### Fixed
- Fix an issue for case-sensitive email checks.

## 3.0.3 - 2024-11-21

### Fixed
- Fix an error on Postgres installs.

## 3.0.2 - 2024-11-20

### Added
- Logs are now sortable.
- Logs can be searched.
- Logs are now lazy-loaded for performance.

### Changed
- Logs are now paginated.
- Logs are now listed newest first by default.

### Fixed
- Fix an error where checks for out of stock variants were being performed on unsaved variants.

## 3.0.1 - 2024-11-08

### Fixed
- Fix an error when adding an email with options.

## 3.0.0 - 2024-10-25

> {note} The plugin’s package name has changed to `verbb/back-in-stock`. Back in Stock will need be updated to 3.0 from a terminal, by running `composer require verbb/back-in-stock && composer remove mediabeastnz/craft-commerce-back-in-stock`.

### Changed
- Migration to `verbb/back-in-stock`.
- Now requires Craft 4.0+.
- Now requires Craft Commerce 4.0+.

## 2.1.1 - 2023-06-01

### Fixed
- Fixed issue - duplicate entries when options are supplied.

## 2.1.0 - 2022-07-10

### Added
- Ability to view customer submissions in the Control Panel.

## 2.0.0 - 2022-07-09

### Added
- Craft CMS and Commerce 4 support.

## 1.4.3 - 2022-07-09

### Fixed/Added
- Flash message is now set for those not using ajax to submit the form. The default message can be overwritten by using translations.

## 1.4.2 - 2022-07-09

### Added
- Added support for translating the subject line. This uses the customers locale and stores it in the database for later. This will require a migration so remember to run `craft migrate/all` if it is not already a part fo your deploy script.

## 1.4.1 - 2022-07-09

### Fixed
- Fixed an issue with customers being able to subscribe multiple times (Issue #14)
- Fixed an issue with subject/preheader text not rendering correctly (Issue #9).

## 1.4.0 - 2020-05-27

### Added
- Confirmation emails can be sent to the customer now (Feature Request #6).
- Confirmation emails can use a custom template, subject line and is optional (off by default).

### Fixed
- Fixed an issue where duplicate records could be added resulting in multiple emails being sent.
- Tested on Craft 3.4 and Commerce 3.1.

## 1.3.1 - 2020-04-08

### Fixed
- Response from form can now be translated (Thanks @pieter-janDB)

## 1.3.0 - 2019-12-20

### Added
- You can now automatically purge user details after emails are sent. Useful if GDPR or similar is a requirement.

## 1.2.0 - 2019-12-19

### Fixed
- Email notifications are only fired once. An issue could of occured previously if the product had multiple variants and the user selected anything but the first variant. Thanks @jmauzyk.

## 1.1.0 - 2019-06-09

### Added
- Ability to store additional options e.g. product attributes etc (Thanks Josh Crawford)
- Responses are now ajax friendly
- Added response message for when email is already detected
 
### Fixed
- Validation issues when no email was entered and other various responses
- Creating a new product would cause an error as no variant was found, this is now fixed

## 1.0.1 - 2019-05-30

### Changed
- Minor update to plugin icon

## 1.0.0 - 2019-05-19

### Added
- Initial release
