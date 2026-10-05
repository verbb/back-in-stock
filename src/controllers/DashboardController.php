<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\db\Query;
use craft\helpers\Db;
use craft\helpers\UrlHelper;
use craft\web\Controller;

use DateTime;
use yii\db\Expression;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use craft\commerce\elements\Variant;

class DashboardController extends Controller
{
    // Constants
    // =========================================================================

    private const PAGE_SIZE = 50;


    // Public Methods
    // =========================================================================

    public function actionOverview(): Response
    {
        return $this->redirect(UrlHelper::cpUrl('back-in-stock/products', $this->request->getQueryParams()));
    }

    public function actionProducts(): Response
    {
        $this->_requireDashboardAccess();
        $page = max(1, (int)$this->request->getQueryParam('page', 1));
        $demand = $this->request->getQueryParam('demand') === 'active' ? 'active' : null;
        $thirtyDaysAgo = Db::prepareDateForDb((new DateTime())->modify('-30 days'));
        $totalQuery = (new Query())
            ->select(new Expression('COUNT(DISTINCT [[variantId]])'))
            ->from(Subscription::tableName());
        $demandQuery = (new Query())
            ->select([
                'variantId',
                'totalCount' => new Expression('COUNT([[id]])'),
                'activeCount' => new Expression('SUM(CASE WHEN [[state]] = :active THEN 1 ELSE 0 END)', [':active' => SubscriptionModel::STATE_ACTIVE]),
                'oldestActiveAt' => new Expression('MIN(CASE WHEN [[state]] = :oldestActive THEN [[dateCreated]] END)', [':oldestActive' => SubscriptionModel::STATE_ACTIVE]),
                'lastSubscriptionAt' => new Expression('MAX([[dateCreated]])'),
                'lastNotifiedAt' => new Expression('MAX([[notifiedAt]])'),
            ])
            ->from(Subscription::tableName())
            ->groupBy(['variantId'])
            ->orderBy(['activeCount' => SORT_DESC, 'lastSubscriptionAt' => SORT_DESC]);

        if ($demand === 'active') {
            $totalQuery->where(['state' => SubscriptionModel::STATE_ACTIVE]);
            $activeVariantQuery = (new Query())
                ->select(['variantId'])
                ->from(Subscription::tableName())
                ->where(['state' => SubscriptionModel::STATE_ACTIVE]);
            $demandQuery->andWhere(['in', 'variantId', $activeVariantQuery]);
        }

        $total = (int)$totalQuery->scalar();
        $demandRows = $demandQuery
            ->offset(($page - 1) * self::PAGE_SIZE)
            ->limit(self::PAGE_SIZE)
            ->all();
        $variantIds = array_map(fn(array $row) => (int)$row['variantId'], $demandRows);
        $variants = $this->_variantsById($variantIds);
        $runRows = $variantIds ? (new Query())
            ->select([
                'variantId',
                'failedTotal' => new Expression('SUM([[failedCount]])'),
                'unknownTotal' => new Expression('SUM([[unknownCount]])'),
            ])
            ->from(RestockRun::tableName())
            ->where(['variantId' => $variantIds])
            ->groupBy(['variantId'])
            ->indexBy('variantId')
            ->all() : [];
        $issueRows = (new Query())
            ->select(['status', 'count' => new Expression('COUNT([[id]])')])
            ->from(DeliveryAttempt::tableName())
            ->where(['status' => [DeliveryAttemptModel::STATUS_FAILED, DeliveryAttemptModel::STATUS_UNKNOWN]])
            ->andWhere(['>=', 'dateCreated', $thirtyDaysAgo])
            ->groupBy(['status'])
            ->indexBy('status')
            ->all();
        $failedCount = (int)($issueRows[DeliveryAttemptModel::STATUS_FAILED]['count'] ?? 0);
        $unknownCount = (int)($issueRows[DeliveryAttemptModel::STATUS_UNKNOWN]['count'] ?? 0);
        $products = array_map(function(array $row) use ($variants, $runRows) {
            $variantId = (int)$row['variantId'];
            $failedCount = (int)($runRows[$variantId]['failedTotal'] ?? 0);
            $unknownCount = (int)($runRows[$variantId]['unknownTotal'] ?? 0);

            return [
                'variantId' => $variantId,
                'variant' => $variants[$variantId] ?? null,
                'totalCount' => (int)$row['totalCount'],
                'activeCount' => (int)$row['activeCount'],
                'oldestActiveAt' => $row['oldestActiveAt'],
                'lastSubscriptionAt' => $row['lastSubscriptionAt'],
                'lastNotifiedAt' => $row['lastNotifiedAt'],
                'failedCount' => $failedCount,
                'unknownCount' => $unknownCount,
                'problemCount' => $failedCount + $unknownCount,
            ];
        }, $demandRows);

        return $this->renderTemplate('craft-commerce-back-in-stock/products', [
            'counts' => [
                'products' => (int)(new Query())
                    ->select(new Expression('COUNT(DISTINCT [[variantId]])'))
                    ->from(Subscription::tableName())
                    ->where(['state' => SubscriptionModel::STATE_ACTIVE])
                    ->scalar(),
                'active' => Subscription::find()->where(['state' => SubscriptionModel::STATE_ACTIVE])->count(),
                'pending' => Subscription::find()->where(['state' => SubscriptionModel::STATE_PENDING_VERIFICATION])->count(),
                'attention' => $failedCount + $unknownCount,
                'failed' => $failedCount,
                'unknown' => $unknownCount,
            ],
            'products' => $products,
            'demand' => $demand,
            'page' => $page,
            'pageCount' => max(1, (int)ceil($total / self::PAGE_SIZE)),
            'total' => $total,
        ]);
    }

    public function actionProduct(int $variantId): Response
    {
        $this->_requireDashboardAccess();
        $variant = $this->_variantsById([$variantId])[$variantId] ?? null;
        $hasSubscriptions = Subscription::find()->where(['variantId' => $variantId])->exists();
        $hasHistory = RestockRun::find()->where(['variantId' => $variantId])->exists();

        if (!$variant && !$hasSubscriptions && !$hasHistory) {
            throw new NotFoundHttpException(Craft::t('craft-commerce-back-in-stock', 'Product demand not found.'));
        }

        $stateRows = (new Query())
            ->select(['state', 'count' => new Expression('COUNT([[id]])')])
            ->from(Subscription::tableName())
            ->where(['variantId' => $variantId])
            ->groupBy(['state'])
            ->indexBy('state')
            ->all();
        $counts = [
            'pendingVerification' => 0,
            'active' => 0,
            'notified' => 0,
            'cancelled' => 0,
            'expired' => 0,
        ];

        foreach ($stateRows as $state => $row) {
            $counts[$state] = (int)$row['count'];
        }

        $counts['total'] = array_sum($counts);
        $issueCounts = (new Query())
            ->select([
                'failed' => new Expression('SUM([[failedCount]])'),
                'unknown' => new Expression('SUM([[unknownCount]])'),
            ])
            ->from(RestockRun::tableName())
            ->where(['variantId' => $variantId])
            ->one();
        $counts['failed'] = (int)($issueCounts['failed'] ?? 0);
        $counts['unknown'] = (int)($issueCounts['unknown'] ?? 0);
        $counts['attention'] = $counts['failed'] + $counts['unknown'];
        $oldestActiveAt = Subscription::find()
            ->where(['variantId' => $variantId, 'state' => SubscriptionModel::STATE_ACTIVE])
            ->min('dateCreated');
        $recentSubscriptions = Subscription::find()
            ->where(['variantId' => $variantId])
            ->orderBy(['dateCreated' => SORT_DESC])
            ->limit(10)
            ->all();
        $recentRuns = RestockRun::find()
            ->where(['variantId' => $variantId])
            ->orderBy(['openedAt' => SORT_DESC])
            ->limit(10)
            ->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/product-detail', [
            'variantId' => $variantId,
            'variant' => $variant,
            'counts' => $counts,
            'oldestActiveAt' => $oldestActiveAt,
            'subscriptions' => $this->_decorateSubscriptions($recentSubscriptions),
            'runs' => $this->_decorateRuns($recentRuns),
        ]);
    }

    public function actionSubscriptions(): Response
    {
        $this->_requireDashboardAccess();
        $state = $this->request->getQueryParam('state');
        $search = trim((string)$this->request->getQueryParam('search'));
        $variantId = max(0, (int)$this->request->getQueryParam('variantId'));
        $page = max(1, (int)$this->request->getQueryParam('page', 1));
        $query = Subscription::find()->orderBy(['dateCreated' => SORT_DESC]);

        if (is_string($state) && in_array($state, [SubscriptionModel::STATE_PENDING_VERIFICATION, SubscriptionModel::STATE_ACTIVE, SubscriptionModel::STATE_NOTIFIED, SubscriptionModel::STATE_CANCELLED, SubscriptionModel::STATE_EXPIRED], true)) {
            $query->andWhere(['state' => $state]);
        } else {
            $state = null;
        }

        if ($search !== '') {
            $like = Craft::$app->getDb()->getIsPgsql() ? 'ILIKE' : 'LIKE';
            $query->andWhere([$like, 'email', '%' . str_replace(' ', '%', $search) . '%', false]);
        }

        if ($variantId) {
            $query->andWhere(['variantId' => $variantId]);
        }

        $total = (int)$query->count();
        $subscriptions = $query
            ->offset(($page - 1) * self::PAGE_SIZE)
            ->limit(self::PAGE_SIZE)
            ->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/subscriptions', [
            'subscriptions' => $this->_decorateSubscriptions($subscriptions),
            'state' => $state,
            'search' => $search,
            'variantId' => $variantId,
            'variantFilter' => $variantId ? ($this->_variantsById([$variantId])[$variantId] ?? null) : null,
            'page' => $page,
            'pageCount' => max(1, (int)ceil($total / self::PAGE_SIZE)),
            'total' => $total,
        ]);
    }

    public function actionHistory(): Response
    {
        $this->_requireDashboardAccess();
        $page = max(1, (int)$this->request->getQueryParam('page', 1));
        $variantId = max(0, (int)$this->request->getQueryParam('variantId'));
        $attention = (bool)$this->request->getQueryParam('attention');
        $query = RestockRun::find()->orderBy(['openedAt' => SORT_DESC]);

        if ($variantId) {
            $query->andWhere(['variantId' => $variantId]);
        }

        if ($attention) {
            $thirtyDaysAgo = Db::prepareDateForDb((new DateTime())->modify('-30 days'));
            $query
                ->andWhere(['or', ['>', 'failedCount', 0], ['>', 'unknownCount', 0]])
                ->andWhere(['>=', 'openedAt', $thirtyDaysAgo]);
        }

        $total = (int)$query->count();
        $runs = $query
            ->offset(($page - 1) * self::PAGE_SIZE)
            ->limit(self::PAGE_SIZE)
            ->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/history', [
            'runs' => $this->_decorateRuns($runs),
            'variantId' => $variantId,
            'variantFilter' => $variantId ? ($this->_variantsById([$variantId])[$variantId] ?? null) : null,
            'attention' => $attention,
            'page' => $page,
            'pageCount' => max(1, (int)ceil($total / self::PAGE_SIZE)),
            'total' => $total,
        ]);
    }

    public function actionHistoryDetail(int $runId): Response
    {
        $this->_requireDashboardAccess();
        $run = RestockRun::findOne($runId);

        if (!$run) {
            throw new NotFoundHttpException(Craft::t('craft-commerce-back-in-stock', 'Run not found.'));
        }

        $attempts = DeliveryAttempt::find()
            ->where(['runId' => $runId])
            ->orderBy(['subscriptionId' => SORT_ASC, 'attemptNumber' => SORT_ASC])
            ->all();
        $subscriptionIds = array_values(array_unique(array_map(fn(DeliveryAttempt $attempt) => $attempt->subscriptionId, $attempts)));
        $subscriptions = Subscription::find()->where(['id' => $subscriptionIds])->indexBy('id')->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/history-detail', [
            'run' => $this->_decorateRuns([$run])[0],
            'attempts' => $attempts,
            'subscriptions' => $subscriptions,
        ]);
    }


    // Private Methods
    // =========================================================================

    private function _requireDashboardAccess(): void
    {
        $this->requireCpRequest();
        $this->requirePermission('accessPlugin-craft-commerce-back-in-stock');
    }

    private function _decorateSubscriptions(array $subscriptions): array
    {
        $variantIds = array_values(array_unique(array_map(fn(Subscription $subscription) => $subscription->variantId, $subscriptions)));
        $variants = $this->_variantsById($variantIds);

        return array_map(function(Subscription $subscription) use ($variants) {
            $subscription->populateRelation('variant', $variants[$subscription->variantId] ?? null);
            return $subscription;
        }, $subscriptions);
    }

    private function _decorateRuns(array $runs): array
    {
        $variantIds = array_values(array_unique(array_map(fn(RestockRun $run) => $run->variantId, $runs)));
        $variants = $this->_variantsById($variantIds);

        return array_map(fn(RestockRun $run) => [
            'record' => $run,
            'variant' => $variants[$run->variantId] ?? null,
        ], $runs);
    }

    private function _variantsById(array $variantIds): array
    {
        return $variantIds ? Variant::find()->id($variantIds)->site('*')->status(null)->indexBy('id')->all() : [];
    }
}
