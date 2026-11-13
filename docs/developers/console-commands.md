# Console Commands

Back in Stock includes console commands you can run from your Craft project’s directory.

## Maintenance

::: reference
### `craft-commerce-back-in-stock/reconcile/index`

Runs Back in Stock’s scheduled safety check. It requeues notifications whose queue job was lost and flags any interrupted by a stopped worker for review, checks the availability of every variant with active subscriptions, expires old requests and removes completed history according to the [subscription settings](docs:get-started/configuration#subscription). Run it on a regular schedule, as described in [Add a Scheduled Safety Check](docs:feature-tour/how-it-works#add-a-scheduled-safety-check).

```shell
php craft craft-commerce-back-in-stock/reconcile
```
:::
