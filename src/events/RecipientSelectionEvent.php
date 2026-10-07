<?php
namespace verbb\backinstock\events;

use verbb\backinstock\records\RestockRun;

use yii\base\Event;

use craft\commerce\elements\Variant;

class RecipientSelectionEvent extends Event
{
    // Properties
    // =========================================================================

    public RestockRun $run;
    public Variant $variant;
    public array $subscriptions = [];
}
