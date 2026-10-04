<?php
namespace verbb\backinstock\tests\Unit;

use verbb\backinstock\helpers\Cohort;
use verbb\backinstock\models\Settings;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class CohortTest extends TestCase
{
    // Static Methods
    // =========================================================================

    public static function selectionScenarios(): array
    {
        return [
            'notify everyone' => [Settings::NOTIFICATION_POLICY_ALL, true, 1, 1, 5, 0, 5],
            'one subscriber per unit' => [Settings::NOTIFICATION_POLICY_STOCK_MATCHED, true, 2, 1, 5, 0, 2],
            'ratio expands capacity' => [Settings::NOTIFICATION_POLICY_STOCK_MATCHED, true, 2, 3, 10, 0, 6],
            'existing selection consumes capacity' => [Settings::NOTIFICATION_POLICY_STOCK_MATCHED, true, 2, 2, 5, 3, 1],
            'capacity cannot become negative' => [Settings::NOTIFICATION_POLICY_STOCK_MATCHED, true, 1, 1, 5, 3, 0],
            'unlimited stock selects everyone' => [Settings::NOTIFICATION_POLICY_STOCK_MATCHED, false, 0, 1, 5, 0, 5],
        ];
    }


    // Public Methods
    // =========================================================================

    #[DataProvider('selectionScenarios')]
    public function testSelectionLimit(string $policy, bool $tracked, int $stock, int $ratio, int $eligible, int $selected, int $expected): void
    {
        self::assertSame($expected, Cohort::selectionLimit($policy, $tracked, $stock, $ratio, $eligible, $selected));
    }
}
