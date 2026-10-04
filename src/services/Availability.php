<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\RestockRun as RestockRunModel;
use verbb\backinstock\models\Settings;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\queue\jobs\DeliverAttempt;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\base\Component;
use craft\helpers\Db;

use DateTime;
use Throwable;
use yii\db\IntegrityException;

use craft\commerce\elements\Variant;

class Availability extends Component
{
    // Public Methods
    // =========================================================================

    public function evaluate(int $variantId, int $siteId): ?RestockRun
    {
        $variant = BackInStock::$plugin->getService()->getLiveVariant($variantId, $siteId);

        if (!$variant) {
            return null;
        }

        $storeId = $variant->storeId;
        $availabilityKey = RestockRunModel::createAvailabilityKey($variantId, $storeId);
        $now = Db::prepareDateForDb(new DateTime());

        if (!BackInStock::$plugin->getService()->isVariantInStock($variant)) {
            RestockRun::updateAll([
                'status' => RestockRunModel::STATUS_CLOSED,
                'availabilityKey' => null,
                'closedAt' => $now,
                'lastEvaluatedAt' => $now,
            ], ['availabilityKey' => $availabilityKey]);

            return null;
        }

        $run = RestockRun::findOne(['availabilityKey' => $availabilityKey]);

        if (!$run) {
            $settings = BackInStock::$plugin->getSettings();
            $run = new RestockRun([
                'variantId' => $variantId,
                'storeId' => $storeId,
                'status' => RestockRunModel::STATUS_OPEN,
                'availabilityKey' => $availabilityKey,
                'observedStock' => $variant->inventoryTracked ? $variant->stock : null,
                'notificationPolicy' => $settings->notificationPolicy,
                'subscribersPerUnit' => $settings->subscribersPerUnit,
                'openedAt' => $now,
                'lastEvaluatedAt' => $now,
            ]);

            try {
                $run->save(false);
            } catch (IntegrityException) {
                $run = RestockRun::findOne(['availabilityKey' => $availabilityKey]);
            }
        }

        if (!$run) {
            return null;
        }

        $run->observedStock = $variant->inventoryTracked ? $variant->stock : null;
        $run->lastEvaluatedAt = $now;
        $run->save(false);

        $this->_selectCohort($run, $variant);

        return $run;
    }

    public function reconcile(): array
    {
        $subscriptions = Subscription::find()
            ->select(['variantId', 'siteId'])
            ->where(['state' => SubscriptionModel::STATE_ACTIVE])
            ->groupBy(['variantId', 'siteId'])
            ->asArray()
            ->all();
        $evaluated = 0;
        $runs = 0;

        foreach ($subscriptions as $subscription) {
            $run = $this->evaluate((int)$subscription['variantId'], (int)$subscription['siteId']);
            $evaluated++;
            $runs += (int)($run !== null);
        }

        return ['evaluated' => $evaluated, 'runs' => $runs];
    }


    // Private Methods
    // =========================================================================

    private function _selectCohort(RestockRun $run, Variant $variant): void
    {
        $settings = BackInStock::$plugin->getSettings();
        $eligibleQuery = Subscription::find()
            ->where([
                'variantId' => $run->variantId,
                'storeId' => $run->storeId,
                'state' => SubscriptionModel::STATE_ACTIVE,
            ]);
        $eligibleCount = (int)$eligibleQuery->count();
        $alreadySelected = (int)DeliveryAttempt::find()
            ->where(['runId' => $run->id, 'attemptNumber' => 1])
            ->count();
        $capacity = $eligibleCount;

        if ($run->notificationPolicy === Settings::NOTIFICATION_POLICY_STOCK_MATCHED && $variant->inventoryTracked) {
            $capacity = max(0, (int)$variant->stock * (int)$run->subscribersPerUnit);
        }

        $selectionLimit = max(0, min($eligibleCount, $capacity) - $alreadySelected);
        $run->eligibleCount = max((int)$run->eligibleCount, $eligibleCount + $alreadySelected);

        if ($selectionLimit === 0) {
            $run->status = $alreadySelected >= $eligibleCount ? RestockRunModel::STATUS_COMPLETED : RestockRunModel::STATUS_EXHAUSTED;
            $run->save(false);
            return;
        }

        $alreadySelectedQuery = DeliveryAttempt::find()
            ->select('subscriptionId')
            ->where(['runId' => $run->id]);
        $subscriptions = $eligibleQuery
            ->andWhere(['not in', 'id', $alreadySelectedQuery])
            ->orderBy(['dateCreated' => SORT_ASC, 'id' => SORT_ASC])
            ->limit($selectionLimit)
            ->all();
        $now = new DateTime();

        foreach ($subscriptions as $index => $subscription) {
            $batch = intdiv($alreadySelected + $index, $settings->batchSize);
            $dueAt = (clone $now)->modify('+' . ($batch * $settings->batchDelay) . ' seconds');
            $attempt = new DeliveryAttempt([
                'runId' => $run->id,
                'subscriptionId' => $subscription->id,
                'attemptNumber' => 1,
                'status' => DeliveryAttemptModel::STATUS_PENDING,
                'dueAt' => Db::prepareDateForDb($dueAt),
            ]);

            try {
                $attempt->save(false);
            } catch (IntegrityException) {
                continue;
            }

            $delay = max(0, $dueAt->getTimestamp() - time());
            Craft::$app->getQueue()->delay($delay)->push(new DeliverAttempt(['attemptId' => $attempt->id]));
        }

        $run->selectedCount = (int)DeliveryAttempt::find()
            ->where(['runId' => $run->id, 'attemptNumber' => 1])
            ->count();
        $run->status = $run->selectedCount >= $eligibleCount ? RestockRunModel::STATUS_COMPLETED : RestockRunModel::STATUS_EXHAUSTED;
        $run->nextBatchAt = DeliveryAttempt::find()
            ->select('dueAt')
            ->where(['runId' => $run->id, 'status' => DeliveryAttemptModel::STATUS_PENDING])
            ->min('dueAt');
        $run->save(false);
    }
}
