<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;
use verbb\backinstock\events\DeliveryAttemptEvent;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\RestockRun as RestockRunModel;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\queue\jobs\DeliverAttempt as DeliverAttemptJob;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\base\Component;
use craft\helpers\Db;

use DateTime;
use yii\db\Expression;
use yii\db\IntegrityException;

class Delivery extends Component
{
    // Constants
    // =========================================================================

    public const EVENT_AFTER_COMPLETE_DELIVERY_ATTEMPT = 'afterCompleteDeliveryAttempt';

    private const INTERRUPTED_AFTER = 3600;
    private const REQUEUE_AFTER = 900;
    private const RECOVERY_BATCH_SIZE = 500;


    // Public Methods
    // =========================================================================

    public function deliver(int $attemptId): void
    {
        $now = Db::prepareDateForDb(new DateTime());
        $claimed = DeliveryAttempt::updateAll([
            'status' => DeliveryAttemptModel::STATUS_PROCESSING,
            'claimedAt' => $now,
        ], [
            'id' => $attemptId,
            'status' => DeliveryAttemptModel::STATUS_PENDING,
        ]);

        if ($claimed !== 1) {
            return;
        }

        $attempt = DeliveryAttempt::findOne($attemptId);
        $run = $attempt ? RestockRun::findOne($attempt->runId) : null;
        $subscription = $attempt ? Subscription::findOne($attempt->subscriptionId) : null;

        if (!$attempt || !$run || !$subscription) {
            return;
        }

        if ($subscription->state !== SubscriptionModel::STATE_ACTIVE) {
            $this->_complete($attempt, DeliveryAttemptModel::STATUS_CANCELLED, 'subscription-inactive', 'The subscription is no longer active.');
            $this->_refreshRun($run);
            $this->_triggerAfterComplete($attempt, $run, $subscription);

            return;
        }

        $variant = BackInStock::$plugin->getService()->getLiveVariant($subscription->variantId, $subscription->siteId);

        // The product can be disabled for one site while stock is still available to subscribers on the others.
        if (!$variant) {
            $this->_complete($attempt, DeliveryAttemptModel::STATUS_CANCELLED, 'variant-unavailable', 'The variant is not available on the subscriber’s site.');
            $this->_refreshRun($run);
            $this->_triggerAfterComplete($attempt, $run, $subscription);

            return;
        }

        if (!BackInStock::$plugin->getService()->isVariantInStock($variant)) {
            $this->_complete($attempt, DeliveryAttemptModel::STATUS_CANCELLED, 'stock-unavailable', 'The variant was no longer available before delivery.');
            DeliveryAttempt::updateAll([
                'status' => DeliveryAttemptModel::STATUS_CANCELLED,
                'completedAt' => $now,
                'errorCode' => 'stock-unavailable',
                'errorMessage' => 'The variant was no longer available before delivery.',
            ], ['runId' => $run->id, 'status' => DeliveryAttemptModel::STATUS_PENDING]);
            $run->status = RestockRunModel::STATUS_CLOSED;
            $run->availabilityKey = null;
            $run->closedAt = $now;
            $run->save(false);
            $this->_refreshRun($run);
            $this->_triggerAfterComplete($attempt, $run, $subscription);

            return;
        }

        $settings = BackInStock::$plugin->getSettings();
        $result = BackInStock::$plugin->getService()->sendSubscriptionMessage(
            $subscription,
            'back_in_stock_available',
            $settings->getEmailTemplate(),
            $settings->emailSubject,
        );
        $this->_complete($attempt, $result['status'], $result['code'], $result['message']);

        if ($result['status'] === DeliveryAttemptModel::STATUS_SENT) {
            BackInStock::$plugin->getSubscriptions()->markNotified($subscription);
        } elseif ($result['status'] === DeliveryAttemptModel::STATUS_FAILED && $attempt->attemptNumber < $settings->maximumAttempts) {
            $this->_scheduleRetry($attempt);
        }

        $this->_refreshRun($run);
        $this->_triggerAfterComplete($attempt, $run, $subscription);

        // Deleting the row would cascade its attempts, losing the counts and stock-matched places the run relies on.
        if ($result['status'] === DeliveryAttemptModel::STATUS_SENT && $settings->purgeRequests) {
            BackInStock::$plugin->getSubscriptions()->scrubRecipient($subscription);
        }
    }

    /**
     * The database owns due work, so attempts stranded by a dead worker or a lost queue job are recovered from here.
     */
    public function recoverStalled(): array
    {
        $now = new DateTime();
        $runIds = [];

        // A worker that died mid-send may already have handed the message over, so this can only be flagged for review.
        $interrupted = DeliveryAttempt::find()
            ->where(['status' => DeliveryAttemptModel::STATUS_PROCESSING])
            ->andWhere(['<', 'claimedAt', Db::prepareDateForDb((clone $now)->modify('-' . self::INTERRUPTED_AFTER . ' seconds'))])
            ->limit(self::RECOVERY_BATCH_SIZE)
            ->all();

        foreach ($interrupted as $attempt) {
            $this->_complete($attempt, DeliveryAttemptModel::STATUS_UNKNOWN, 'worker-interrupted', 'The worker stopped before the send could be confirmed.');
            $runIds[$attempt->runId] = true;
        }

        // Claims are atomic, so a job that was only delayed can't send twice. Moving dueAt limits this to one job per window.
        $lost = DeliveryAttempt::find()
            ->where(['status' => DeliveryAttemptModel::STATUS_PENDING])
            ->andWhere(['<', 'dueAt', Db::prepareDateForDb((clone $now)->modify('-' . self::REQUEUE_AFTER . ' seconds'))])
            ->limit(self::RECOVERY_BATCH_SIZE)
            ->all();

        foreach ($lost as $attempt) {
            $attempt->dueAt = Db::prepareDateForDb($now);
            $attempt->save(false);
            Craft::$app->getQueue()->push(new DeliverAttemptJob(['attemptId' => $attempt->id]));
            $runIds[$attempt->runId] = true;
        }

        foreach (RestockRun::find()->where(['id' => array_keys($runIds)])->all() as $run) {
            $this->_refreshRun($run);
        }

        foreach ($interrupted as $attempt) {
            $run = RestockRun::findOne($attempt->runId);
            $subscription = Subscription::findOne($attempt->subscriptionId);

            if ($run && $subscription) {
                $this->_triggerAfterComplete($attempt, $run, $subscription);
            }
        }

        return ['interrupted' => count($interrupted), 'requeued' => count($lost)];
    }

    /**
     * Returns the latest attempt for each subscriber whose message definitely wasn't sent and who is still waiting.
     * Unconfirmed sends are left out because the message may already have reached the subscriber.
     */
    public function getRetryableAttempts(RestockRun $run): array
    {
        $failed = array_filter($this->_latestAttempts($run), fn(DeliveryAttempt $attempt) => $attempt->status === DeliveryAttemptModel::STATUS_FAILED);

        if (!$failed) {
            return [];
        }

        $activeIds = Subscription::find()
            ->select('id')
            ->where(['id' => array_keys($failed), 'state' => SubscriptionModel::STATE_ACTIVE])
            ->column();

        return array_values(array_filter($failed, fn(DeliveryAttempt $attempt) => in_array($attempt->subscriptionId, $activeIds)));
    }

    /**
     * Queues another attempt straight away for each retryable subscriber, regardless of the automatic retry limit.
     * Delivery still rechecks the subscription and stock, so a sold-out variant cancels the attempt instead.
     */
    public function retryFailed(RestockRun $run): int
    {
        $queued = 0;

        foreach ($this->getRetryableAttempts($run) as $attempt) {
            $queued += (int)$this->_scheduleRetry($attempt, 0);
        }

        if ($queued) {
            $this->_refreshRun($run);
        }

        return $queued;
    }

    /**
     * Takes the notification off the review list. It returns there if a later attempt fails or can't be confirmed.
     */
    public function markReviewed(RestockRun $run): void
    {
        $run->reviewedAt = Db::prepareDateForDb(new DateTime());
        $run->save(false);
    }

    public function needsReview(RestockRun $run): bool
    {
        return ($run->failedCount || $run->unknownCount) && !$run->reviewedAt;
    }


    // Private Methods
    // =========================================================================

    private function _complete(DeliveryAttempt $attempt, string $status, ?string $code, ?string $message): void
    {
        $attempt->status = $status;
        $attempt->completedAt = Db::prepareDateForDb(new DateTime());
        $attempt->errorCode = $code;
        $attempt->errorMessage = $message ? mb_substr($message, 0, 1024) : null;
        $attempt->save(false);
    }

    private function _scheduleRetry(DeliveryAttempt $attempt, ?int $delay = null): bool
    {
        $attemptNumber = $attempt->attemptNumber + 1;
        $delay ??= 60 * (2 ** ($attemptNumber - 2));
        $retry = new DeliveryAttempt([
            'runId' => $attempt->runId,
            'subscriptionId' => $attempt->subscriptionId,
            'attemptNumber' => $attemptNumber,
            'status' => DeliveryAttemptModel::STATUS_PENDING,
            'dueAt' => Db::prepareDateForDb((new DateTime())->modify("+$delay seconds")),
        ]);

        // The unique attempt number stops a double-clicked retry from queueing two sends.
        try {
            $retry->save(false);
        } catch (IntegrityException) {
            return false;
        }

        Craft::$app->getQueue()->delay($delay)->push(new DeliverAttemptJob(['attemptId' => $retry->id]));

        return true;
    }

    private function _latestAttempts(RestockRun $run): array
    {
        $latest = [];

        foreach (DeliveryAttempt::find()->where(['runId' => $run->id])->orderBy(['subscriptionId' => SORT_ASC, 'attemptNumber' => SORT_DESC])->all() as $attempt) {
            $latest[$attempt->subscriptionId] ??= $attempt;
        }

        return $latest;
    }

    private function _refreshRun(RestockRun $run): void
    {
        $outcomes = array_map(fn(DeliveryAttempt $attempt) => $attempt->status, $this->_latestAttempts($run));

        $run->sentCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_SENT));
        $run->failedCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_FAILED));
        $run->cancelledCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_CANCELLED));
        $run->unknownCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_UNKNOWN));
        $run->nextBatchAt = DeliveryAttempt::find()
            ->select('dueAt')
            ->where(['runId' => $run->id, 'status' => DeliveryAttemptModel::STATUS_PENDING])
            ->min('[[dueAt]]');

        // A failure recorded after someone reviewed the notification needs their attention again.
        if ($run->reviewedAt && DeliveryAttempt::find()
            ->where(['runId' => $run->id, 'status' => [DeliveryAttemptModel::STATUS_FAILED, DeliveryAttemptModel::STATUS_UNKNOWN]])
            ->andWhere(['>', 'completedAt', $run->reviewedAt])
            ->exists()) {
            $run->reviewedAt = null;
        }

        $run->save(false);
    }

    private function _triggerAfterComplete(DeliveryAttempt $attempt, RestockRun $run, Subscription $subscription): void
    {
        $this->trigger(self::EVENT_AFTER_COMPLETE_DELIVERY_ATTEMPT, new DeliveryAttemptEvent([
            'attempt' => $attempt,
            'run' => $run,
            'subscription' => $subscription,
        ]));
    }
}
