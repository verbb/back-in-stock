<?php
namespace verbb\backinstock\models;

use craft\base\Model;

class Subscription extends Model
{
    // Constants
    // =========================================================================

    public const STATE_PENDING_VERIFICATION = 'pendingVerification';
    public const STATE_ACTIVE = 'active';
    public const STATE_NOTIFIED = 'notified';
    public const STATE_CANCELLED = 'cancelled';
    public const STATE_EXPIRED = 'expired';

    public const ACTIVE_STATES = [
        self::STATE_PENDING_VERIFICATION,
        self::STATE_ACTIVE,
    ];


    // Static Methods
    // =========================================================================

    public static function createRecipientKey(string $email): string
    {
        return hash('sha256', Log::normalizeRecipient($email));
    }

    public static function createActiveKey(string $email, int $variantId, int $siteId, int $storeId, ?string $locale): string
    {
        return hash('sha256', implode(':', [self::createRecipientKey($email), $variantId, $siteId, $storeId, $locale]));
    }
}
