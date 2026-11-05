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

    private const OBSERVED_STOCK_MAX = 2147483647;

    public static function createAvailabilityKey(int $variantId, int $storeId): string
    {
        return hash('sha256', "$variantId:$storeId");
    }

    /**
     * Fits a quantity into the signed 32-bit `observedStock` column. Synced fields can hold larger
     * placeholder values, which must not fail the evaluation or stop reconciliation for other variants.
     */
    public static function observedStockSnapshot(?int $stock): ?int
    {
        return $stock === null ? null : max(-self::OBSERVED_STOCK_MAX - 1, min(self::OBSERVED_STOCK_MAX, $stock));
    }
}
