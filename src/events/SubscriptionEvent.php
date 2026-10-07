<?php
namespace verbb\backinstock\events;

use verbb\backinstock\records\Subscription;

use craft\events\CancelableEvent;

class SubscriptionEvent extends CancelableEvent
{
    // Properties
    // =========================================================================

    public Subscription $subscription;
}
