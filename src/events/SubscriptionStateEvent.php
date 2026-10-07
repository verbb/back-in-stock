<?php
namespace verbb\backinstock\events;

use verbb\backinstock\records\Subscription;

use yii\base\Event;

class SubscriptionStateEvent extends Event
{
    // Properties
    // =========================================================================

    public Subscription $subscription;
    public string $previousState;
    public string $newState;
    public ?string $source = null;
}
