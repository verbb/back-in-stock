# Events

Back in Stock provides save events on its Logs service. Modules and plugins can register listeners, typically in their `init()` methods, when they need to inspect or modify data saved through that service.

## The `beforeSaveLog` Event

The event that is triggered before a Log model is saved.

```php
use verbb\backinstock\events\LogEvent;
use verbb\backinstock\services\Logs;
use yii\base\Event;

Event::on(Logs::class, Logs::EVENT_BEFORE_SAVE_LOG, function(LogEvent $event) {
    $log = $event->log;
    $isNew = $event->isNew;
    // Modify or inspect the log before it is saved.
});
```

## The `afterSaveLog` Event

The event that is triggered after a Log model has been saved.

```php
use verbb\backinstock\events\LogEvent;
use verbb\backinstock\services\Logs;
use yii\base\Event;

Event::on(Logs::class, Logs::EVENT_AFTER_SAVE_LOG, function(LogEvent $event) {
    $log = $event->log;
    $isNew = $event->isNew;
    // Respond to the saved log.
});
```
