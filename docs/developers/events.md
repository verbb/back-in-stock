# Events

Back in Stock retains its 4.1 log save events as part of the 4.x compatibility layer. Existing modules can continue listening to them while moving toward the [subscription API](docs:developers/api).

## The `beforeSaveLog` event

Triggered before a legacy Log model is persisted into canonical subscription storage.

```php
use verbb\backinstock\events\LogEvent;
use verbb\backinstock\services\Logs;
use yii\base\Event;

Event::on(Logs::class, Logs::EVENT_BEFORE_SAVE_LOG, function(LogEvent $event) {
    $log = $event->log;
    $isNew = $event->isNew;
    // Modify or inspect the compatibility model.
});
```

## The `afterSaveLog` event

Triggered after a legacy Log model has been persisted into canonical subscription storage.

```php
use verbb\backinstock\events\LogEvent;
use verbb\backinstock\services\Logs;
use yii\base\Event;

Event::on(Logs::class, Logs::EVENT_AFTER_SAVE_LOG, function(LogEvent $event) {
    $log = $event->log;
    $isNew = $event->isNew;
    // Respond to the saved compatibility model.
});
```

No new domain events are introduced in 4.2. Use the canonical services for explicit application integration and keep event listeners limited to legacy compatibility needs.
