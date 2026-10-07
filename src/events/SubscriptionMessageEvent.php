<?php
namespace verbb\backinstock\events;

use verbb\backinstock\records\Subscription;

use craft\events\CancelableEvent;
use craft\mail\Message;

use craft\commerce\elements\Variant;

class SubscriptionMessageEvent extends CancelableEvent
{
    // Properties
    // =========================================================================

    public Subscription $subscription;
    public Variant $variant;
    public Message $message;
    public string $messageKey;
}
