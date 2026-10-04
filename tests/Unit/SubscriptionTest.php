<?php
namespace verbb\backinstock\tests\Unit;

use verbb\backinstock\models\Log;
use verbb\backinstock\models\Subscription;

use PHPUnit\Framework\TestCase;

class SubscriptionTest extends TestCase
{
    // Public Methods
    // =========================================================================

    public function testRecipientIdentityIsCaseInsensitive(): void
    {
        self::assertSame(
            Subscription::createRecipientKey('CUSTOMER@EXAMPLE.COM'),
            Subscription::createRecipientKey('customer@example.com'),
        );
    }

    public function testActiveIdentityUsesStoreRatherThanLocale(): void
    {
        self::assertSame(
            Subscription::createActiveKey('customer@example.com', 42, 3),
            Subscription::createActiveKey('CUSTOMER@example.com', 42, 3),
        );
        self::assertNotSame(
            Subscription::createActiveKey('customer@example.com', 42, 3),
            Subscription::createActiveKey('customer@example.com', 42, 4),
        );
    }

    public function testLegacyPendingIdentityRemainsLocaleAware(): void
    {
        self::assertNotSame(
            Log::createPendingKey('customer@example.com', 42, 1, 'en-US'),
            Log::createPendingKey('customer@example.com', 42, 1, 'fr-FR'),
        );
    }
}
