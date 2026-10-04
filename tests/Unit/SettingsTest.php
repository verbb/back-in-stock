<?php
namespace verbb\backinstock\tests\Unit;

use verbb\backinstock\models\Settings;

use PHPUnit\Framework\TestCase;

class SettingsTest extends TestCase
{
    // Public Methods
    // =========================================================================

    public function testFreshInstallDefaultsAreStockMatchedAndVerificationIsOptional(): void
    {
        $settings = new Settings();

        self::assertSame(Settings::NOTIFICATION_POLICY_STOCK_MATCHED, $settings->notificationPolicy);
        self::assertSame(1, $settings->subscribersPerUnit);
        self::assertFalse($settings->requireVerification);
        self::assertSame(3, $settings->maximumAttempts);
    }

    public function testOperationalWindowsMustRemainPositive(): void
    {
        $settings = new Settings([
            'verificationWindow' => 0,
            'pendingExpiry' => 0,
            'activeExpiry' => 0,
        ]);

        self::assertFalse($settings->validate());
        self::assertArrayHasKey('verificationWindow', $settings->getErrors());
        self::assertArrayHasKey('pendingExpiry', $settings->getErrors());
        self::assertArrayHasKey('activeExpiry', $settings->getErrors());
    }
}
