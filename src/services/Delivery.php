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

    private function _scheduleRetry(DeliveryAttempt $attempt): void
    {
        $attemptNumber = $attempt->attemptNumber + 1;
        $delay = 60 * (2 ** ($attemptNumber - 2));
        $retry = new DeliveryAttempt([
            'runId' => $attempt->runId,
            'subscriptionId' => $attempt->subscriptionId,
            'attemptNumber' => $attemptNumber,
            'status' => DeliveryAttemptModel::STATUS_PENDING,
            'dueAt' => Db::prepareDateForDb((new DateTime())->modify("+$delay seconds")),
        ]);

        try {
            $retry->save(false);
        } catch (IntegrityException) {
            return;
        }

        Craft::$app->getQueue()->delay($delay)->push(new DeliverAttemptJob(['attemptId' => $retry->id]));
    }

    private function _refreshRun(RestockRun $run): void
    {
        $attempts = DeliveryAttempt::find()
            ->where(['runId' => $run->id])
            ->orderBy(['subscriptionId' => SORT_ASC, 'attemptNumber' => SORT_DESC])
            ->all();
        $outcomes = [];

        foreach ($attempts as $attempt) {
            $outcomes[$attempt->subscriptionId] ??= $attempt->status;
        }

        $run->sentCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_SENT));
        $run->failedCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_FAILED));
        $run->cancelledCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_CANCELLED));
        $run->unknownCount = count(array_filter($outcomes, fn(string $status) => $status === DeliveryAttemptModel::STATUS_UNKNOWN));
        $run->nextBatchAt = DeliveryAttempt::find()
            ->select('dueAt')
            ->where(['runId' => $run->id, 'status' => DeliveryAttemptModel::STATUS_PENDING])
            ->min('[[dueAt]]');
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
