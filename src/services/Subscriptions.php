<?php
namespace verbb\backinstock\services;

use verbb\backinstock\events\SubscriptionStateEvent;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\queue\jobs\SendSubscriptionMessage;
use verbb\backinstock\records\DeliveryAttempt;
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
    // Constants
    // =========================================================================

    public const EVENT_BEFORE_CREATE_SUBSCRIPTION = 'beforeCreateSubscription';
    public const EVENT_AFTER_CREATE_SUBSCRIPTION = 'afterCreateSubscription';
    public const EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE = 'afterChangeSubscriptionState';

    public const CANCEL_SOURCE_OPERATOR = 'operator';


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

        $previousState = $subscription->state;
        $subscription->state = SubscriptionModel::STATE_ACTIVE;
        $subscription->verifiedAt = Db::prepareDateForDb(new DateTime());
        $subscription->verificationTokenHash = null;
        $subscription->verificationExpiresAt = null;
        $subscription->isNotified = false;

        $saved = $subscription->save(false);

        if ($saved) {
            $this->_triggerStateChange($subscription, $previousState, 'verification');
        }

        return $saved;
    }

    /**
     * Reserves the verification window now so a repeat submission can't queue a second email, while the token itself
     * is only created when the job runs, so it never sits in the queue and a retried job always sends a working link.
     */
    public function queueVerification(Subscription $subscription): void
    {
        $settings = Craft::$app->getPlugins()->getPlugin('craft-commerce-back-in-stock')->getSettings();
        $subscription->verificationTokenHash = null;
        $subscription->verificationExpiresAt = Db::prepareDateForDb((new DateTime())->modify("+{$settings->verificationWindow} hours"));
        $subscription->save(false);

        Craft::$app->getQueue()->push(new SendSubscriptionMessage([
            'subscriptionId' => $subscription->id,
            'messageKey' => 'back_in_stock_verification',
        ]));
    }

    /**
     * Sends a new link only when the last one can no longer work, so repeat submissions can't flood a mailbox.
     */
    public function resendStaleVerification(Subscription $subscription): bool
    {
        if ($subscription->state !== SubscriptionModel::STATE_PENDING_VERIFICATION) {
            return false;
        }

        $expiresAt = DateTimeHelper::toDateTime($subscription->verificationExpiresAt);

        if ($expiresAt && $expiresAt >= new DateTime()) {
            return false;
        }

        $this->queueVerification($subscription);

        return true;
    }

    public function markVerificationUndelivered(Subscription $subscription): void
    {
        $subscription->verificationTokenHash = null;
        $subscription->verificationExpiresAt = null;
        $subscription->save(false);
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
        return $this->_createLifecycleUrl($subscription, 'verify', [
            'id' => $subscription->id,
            // Craft rejects any request carrying an unrecognised `token` param before routing it.
            'verificationToken' => $token,
        ]);
    }

    public function getCancellationUrl(Subscription $subscription): string
    {
        return $this->_createLifecycleUrl($subscription, 'cancel', [
            'uid' => $subscription->uid,
            'cancellationToken' => $this->createCancellationToken($subscription),
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
        // A finished subscription has nothing left to send, which is all a cancellation asks for.
        if (!in_array($subscription->state, SubscriptionModel::ACTIVE_STATES, true)) {
            return true;
        }

        $previousState = $subscription->state;
        $subscription->state = SubscriptionModel::STATE_CANCELLED;
        $subscription->activeKey = null;
        $subscription->pendingKey = null;
        $subscription->cancelledAt = Db::prepareDateForDb(new DateTime());
        $subscription->cancelSource = $source;

        $saved = $subscription->save(false);

        if ($saved) {
            $this->_triggerStateChange($subscription, $previousState, $source);
        }

        return $saved;
    }

    public function markNotified(Subscription $subscription): bool
    {
        if ($subscription->state !== SubscriptionModel::STATE_ACTIVE) {
            return $subscription->state === SubscriptionModel::STATE_NOTIFIED;
        }

        $previousState = $subscription->state;
        $subscription->state = SubscriptionModel::STATE_NOTIFIED;
        $subscription->notifiedAt = Db::prepareDateForDb(new DateTime());
        $subscription->activeKey = null;
        $subscription->isNotified = true;
        $subscription->pendingKey = null;
        $saved = $subscription->save(false);

        if ($saved) {
            $this->_triggerStateChange($subscription, $previousState, 'delivery');
        }

        return $saved;
    }

    /**
     * Removes the recipient from a delivered subscription while keeping the row its delivery history depends on.
     */
    public function scrubRecipient(Subscription $subscription): bool
    {
        $subscription->email = '';
        $subscription->recipientKey = SubscriptionModel::createRecipientKey('');
        $subscription->userId = null;
        $subscription->options = null;
        $subscription->verificationTokenHash = null;
        $subscription->verificationExpiresAt = null;

        // Transports often quote the address they rejected.
        DeliveryAttempt::updateAll(['errorMessage' => null], [
            'subscriptionId' => $subscription->id,
            'status' => [DeliveryAttemptModel::STATUS_FAILED, DeliveryAttemptModel::STATUS_UNKNOWN],
        ]);

        return $subscription->save(false);
    }

    /**
     * Honours an erasure request by ending everything this person is waiting for and removing them from every
     * subscription, on every variant and site. Rows stay for the same reason [[scrubRecipient()]] exists.
     */
    public function eraseRecipient(Subscription $subscription): int
    {
        // Already scrubbed rows share the blank key, so it can't identify a person.
        $isIdentifiable = $subscription->recipientKey !== SubscriptionModel::createRecipientKey('');
        $subscriptions = Subscription::find()
            ->where($isIdentifiable ? ['recipientKey' => $subscription->recipientKey] : ['id' => $subscription->id])
            ->all();
        $erased = 0;

        foreach ($subscriptions as $recipientSubscription) {
            $this->cancel($recipientSubscription, self::CANCEL_SOURCE_OPERATOR);
            $erased += (int)$this->scrubRecipient($recipientSubscription);
        }

        return $erased;
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
                ->andWhere(['<', 'dateUpdated', Db::prepareDateForDb($cutoff)])
                ->all();

            foreach ($subscriptions as $subscription) {
                $previousState = $subscription->state;
                $subscription->state = SubscriptionModel::STATE_EXPIRED;
                $subscription->activeKey = null;
                $subscription->pendingKey = null;
                $subscription->expiredAt = Db::prepareDateForDb($now);
                $saved = $subscription->save(false);
                $expired += (int)$saved;

                if ($saved) {
                    $this->_triggerStateChange($subscription, $previousState, 'reconciliation');
                }
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


    // Private Methods
    // =========================================================================

    private function _createLifecycleUrl(Subscription $subscription, string $action, array $params): string
    {
        $generalConfig = Craft::$app->getConfig()->getGeneral();
        $path = "craft-commerce-back-in-stock/base/$action";

        // A headless site's base URL points at its front end, so only Craft's own action URL reaches this controller.
        if ($generalConfig->headlessMode) {
            return UrlHelper::actionUrl($path, $params);
        }

        // Queue jobs can run inside a control panel request, but recipients need links for the site they joined from.
        return UrlHelper::siteUrl($generalConfig->actionTrigger . '/' . $path, $params, null, $subscription->siteId);
    }

    private function _triggerStateChange(Subscription $subscription, string $previousState, ?string $source): void
    {
        $this->trigger(self::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE, new SubscriptionStateEvent([
            'subscription' => $subscription,
            'previousState' => $previousState,
            'newState' => $subscription->state,
            'source' => $source,
        ]));
    }
}
