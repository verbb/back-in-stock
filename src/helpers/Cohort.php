<?php
namespace verbb\backinstock\helpers;

use verbb\backinstock\models\Settings;

class Cohort
{
    // Static Methods
    // =========================================================================

    public static function selectionLimit(string $policy, bool $inventoryTracked, int $stock, int $subscribersPerUnit, int $eligibleCount, int $alreadySelected): int
    {
        $capacity = $eligibleCount + $alreadySelected;

        if ($policy === Settings::NOTIFICATION_POLICY_STOCK_MATCHED && $inventoryTracked) {
            $capacity = max(0, $stock * $subscribersPerUnit);
        }

        return max(0, min($eligibleCount + $alreadySelected, $capacity) - $alreadySelected);
    }
}
