<?php
namespace verbb\backinstock\events;

use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use yii\base\Event;

class DeliveryAttemptEvent extends Event
{
    // Properties
    // =========================================================================

    public DeliveryAttempt $attempt;
    public RestockRun $run;
    public Subscription $subscription;
}
