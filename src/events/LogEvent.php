<?php
namespace verbb\backinstock\events;

use verbb\backinstock\models\Log;

use yii\base\Event;

/**
 * @deprecated in 4.2.0. Retained for 4.x log API compatibility.
 */
class LogEvent extends Event
{
    // Properties
    // =========================================================================

    public Log $log;
    public bool $isNew = false;

}
