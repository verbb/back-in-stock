<?php
namespace verbb\backinstock\models;

use craft\base\Model;

class RestockRun extends Model
{
    // Constants
    // =========================================================================

    public const STATUS_OPEN = 'open';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_EXHAUSTED = 'exhausted';
    public const STATUS_CLOSED = 'closed';

    public static function createAvailabilityKey(int $variantId, int $storeId): string
    {
        return hash('sha256', "$variantId:$storeId");
    }
}
