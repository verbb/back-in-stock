<?php
namespace verbb\backinstock\services;

use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\base\Component;
use craft\helpers\DateTimeHelper;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;

use DateTime;

class Subscriptions extends Component
{
    // Public Methods
    // =========================================================================

    public function getById(int $id): ?Subscription
    {
        return Subscription::findOne($id);
    }

    public function getByUid(string $uid): ?Subscription
    {
        return Subscription::findOne(['uid' => $uid]);
    }

    public function activate(Subscription $subscription): bool
    {
        if ($subscription->state !== SubscriptionModel::STATE_PENDING_VERIFICATION) {
            return $subscription->state === SubscriptionModel::STATE_ACTIVE;
        }

        $subscription->state = SubscriptionModel::STATE_ACTIVE;
        $subscription->verifiedAt = Db::prepareDateForDb(new DateTime());
        $subscription->verificationTokenHash = null;
        $subscription->verificationExpiresAt = null;
        $subscription->isNotified = false;

        return $subscription->save(false);
    }

    public function prepareVerification(Subscription $subscription): string
    {
        $settings = Craft::$app->getPlugins()->getPlugin('craft-commerce-back-in-stock')->getSettings();
        $token = StringHelper::randomString(48);
        $subscription->verificationTokenHash = hash('sha256', $token);
        $subscription->verificationExpiresAt = Db::prepareDateForDb((new DateTime())->modify("+{$settings->verificationWindow} hours"));
        $subscription->save(false);

        return $token;
    }

    public function verify(int $id, string $token): bool
    {
        $subscription = $this->getById($id);

        if (!$subscription || !$subscription->verificationTokenHash || !hash_equals($subscription->verificationTokenHash, hash('sha256', $token))) {
            return false;
        }

        $expiresAt = DateTimeHelper::toDateTime($subscription->verificationExpiresAt);

        if (!$expiresAt || $expiresAt < new DateTime()) {
            return false;
        }

        return $this->activate($subscription);
    }

    public function getVerificationUrl(Subscription $subscription, string $token): string
    {
        return UrlHelper::actionUrl('craft-commerce-back-in-stock/base/verify', [
            'id' => $subscription->id,
            'token' => $token,
        ]);
    }

    public function getCancellationUrl(Subscription $subscription): string
    {
        return UrlHelper::actionUrl('craft-commerce-back-in-stock/base/cancel', [
            'uid' => $subscription->uid,
            'token' => $this->createCancellationToken($subscription),
        ]);
    }

    public function createCancellationToken(Subscription $subscription): string
    {
        $securityKey = Craft::$app->getConfig()->getGeneral()->securityKey;

        return hash_hmac('sha256', (string)$subscription->uid, $securityKey);
    }

    public function validateCancellationToken(Subscription $subscription, string $token): bool
    {
        return hash_equals($this->createCancellationToken($subscription), $token);
    }

    public function cancel(Subscription $subscription, string $source = 'recipient'): bool
    {
        if (!in_array($subscription->state, SubscriptionModel::ACTIVE_STATES, true)) {
            return $subscription->state === SubscriptionModel::STATE_CANCELLED;
        }

        $subscription->state = SubscriptionModel::STATE_CANCELLED;
        $subscription->activeKey = null;
        $subscription->pendingKey = null;
        $subscription->cancelledAt = Db::prepareDateForDb(new DateTime());
        $subscription->cancelSource = $source;

        return $subscription->save(false);
    }

    public function expireStale(): int
    {
        $settings = Craft::$app->getPlugins()->getPlugin('craft-commerce-back-in-stock')->getSettings();
        $now = new DateTime();
        $expired = 0;

        $pendingCutoff = (clone $now)->modify("-{$settings->pendingExpiry} days");
        $activeCutoff = (clone $now)->modify("-{$settings->activeExpiry} days");

        $queries = [
            [SubscriptionModel::STATE_PENDING_VERIFICATION, $pendingCutoff],
            [SubscriptionModel::STATE_ACTIVE, $activeCutoff],
        ];

        foreach ($queries as [$state, $cutoff]) {
            $subscriptions = Subscription::find()
                ->where(['state' => $state])
                ->andWhere(['<', 'dateCreated', Db::prepareDateForDb($cutoff)])
                ->all();

            foreach ($subscriptions as $subscription) {
                $subscription->state = SubscriptionModel::STATE_EXPIRED;
                $subscription->activeKey = null;
                $subscription->pendingKey = null;
                $subscription->expiredAt = Db::prepareDateForDb($now);
                $expired += (int)$subscription->save(false);
            }
        }

        return $expired;
    }

    public function purgeHistory(): int
    {
        $settings = Craft::$app->getPlugins()->getPlugin('craft-commerce-back-in-stock')->getSettings();

        if ($settings->historyRetention < 1) {
            return 0;
        }

        $cutoff = (new DateTime())->modify("-{$settings->historyRetention} days");

        return Subscription::deleteAll([
            'and',
            ['state' => [SubscriptionModel::STATE_NOTIFIED, SubscriptionModel::STATE_CANCELLED, SubscriptionModel::STATE_EXPIRED]],
            ['<', 'dateUpdated', Db::prepareDateForDb($cutoff)],
        ]);
    }
}
