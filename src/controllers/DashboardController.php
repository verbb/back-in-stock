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
        $this->_requireDashboardAccess();
        $counts = $this->_dashboardCounts();

        return $this->renderTemplate('craft-commerce-back-in-stock/overview', [
            'counts' => $counts,
            'products' => $this->_productRows(true, 0, 6),
            'activity' => $this->_activityData(1, 6)['entries'],
        ]);
    }

    public function actionProducts(): Response
    {
        $this->_requireDashboardAccess();
        $page = max(1, (int)$this->request->getQueryParam('page', 1));
        $demand = $this->request->getQueryParam('demand') === 'active' ? 'active' : null;
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
            'counts' => $this->_dashboardCounts(),
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
        return $this->renderTemplate('craft-commerce-back-in-stock/product-detail', [
            'variantId' => $variantId,
            'variant' => $variant,
            'counts' => $counts,
            'oldestActiveAt' => $oldestActiveAt,
            'subscriptions' => $this->_decorateSubscriptions($recentSubscriptions),
            'activity' => $this->_activityData(1, 10, $variantId)['entries'],
            'lastNotifiedAt' => Subscription::find()->where(['variantId' => $variantId])->max('notifiedAt'),
        ]);
    }

    public function actionNotifications(): Response
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

        return $this->renderTemplate('craft-commerce-back-in-stock/notifications', [
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

    public function actionSubscriptions(): Response
    {
        return $this->redirect(UrlHelper::cpUrl('back-in-stock/notifications', $this->request->getQueryParams()));
    }

    public function actionActivity(): Response
    {
        $this->_requireDashboardAccess();
        $page = max(1, (int)$this->request->getQueryParam('page', 1));
        $variantId = max(0, (int)$this->request->getQueryParam('variantId'));
        $attention = (bool)$this->request->getQueryParam('attention');
        $type = (string)$this->request->getQueryParam('type');
        $type = in_array($type, ['subscription', 'notification'], true) ? $type : null;
        $activity = $this->_activityData($page, self::PAGE_SIZE, $variantId, $type, $attention);

        return $this->renderTemplate('craft-commerce-back-in-stock/activity', [
            'activity' => $activity['entries'],
            'variantId' => $variantId,
            'variantFilter' => $variantId ? ($this->_variantsById([$variantId])[$variantId] ?? null) : null,
            'type' => $type,
            'attention' => $attention,
            'page' => $page,
            'pageCount' => max(1, (int)ceil($activity['total'] / self::PAGE_SIZE)),
            'total' => $activity['total'],
        ]);
    }

    public function actionHistory(): Response
    {
        return $this->redirect(UrlHelper::cpUrl('back-in-stock/notifications/activity', $this->request->getQueryParams()));
    }

    public function actionActivityDetail(int $runId): Response
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

        return $this->renderTemplate('craft-commerce-back-in-stock/activity-detail', [
            'run' => $this->_decorateRuns([$run])[0],
            'attempts' => $attempts,
            'subscriptions' => $subscriptions,
        ]);
    }

    public function actionHistoryDetail(int $runId): Response
    {
        return $this->redirect(UrlHelper::cpUrl("back-in-stock/notifications/activity/$runId", $this->request->getQueryParams()));
    }


    // Private Methods
    // =========================================================================

    private function _requireDashboardAccess(): void
    {
        $this->requireCpRequest();
        $this->requirePermission('accessPlugin-craft-commerce-back-in-stock');
    }

    private function _dashboardCounts(): array
    {
        $thirtyDaysAgo = Db::prepareDateForDb((new DateTime())->modify('-30 days'));
        $issueRows = (new Query())
            ->select(['status', 'count' => new Expression('COUNT([[id]])')])
            ->from(DeliveryAttempt::tableName())
            ->where(['status' => [DeliveryAttemptModel::STATUS_FAILED, DeliveryAttemptModel::STATUS_UNKNOWN]])
            ->andWhere(['>=', 'dateCreated', $thirtyDaysAgo])
            ->groupBy(['status'])
            ->indexBy('status')
            ->all();
        $failed = (int)($issueRows[DeliveryAttemptModel::STATUS_FAILED]['count'] ?? 0);
        $unknown = (int)($issueRows[DeliveryAttemptModel::STATUS_UNKNOWN]['count'] ?? 0);

        return [
            'products' => (int)(new Query())
                ->select(new Expression('COUNT(DISTINCT [[variantId]])'))
                ->from(Subscription::tableName())
                ->where(['state' => SubscriptionModel::STATE_ACTIVE])
                ->scalar(),
            'active' => (int)Subscription::find()->where(['state' => SubscriptionModel::STATE_ACTIVE])->count(),
            'pending' => (int)Subscription::find()->where(['state' => SubscriptionModel::STATE_PENDING_VERIFICATION])->count(),
            'attention' => $failed + $unknown,
            'failed' => $failed,
            'unknown' => $unknown,
        ];
    }

    private function _productRows(bool $activeOnly, int $offset, int $limit): array
    {
        $query = (new Query())
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
            ->orderBy(['activeCount' => SORT_DESC, 'lastSubscriptionAt' => SORT_DESC])
            ->offset($offset)
            ->limit($limit);

        if ($activeOnly) {
            $activeVariantQuery = (new Query())
                ->select(['variantId'])
                ->from(Subscription::tableName())
                ->where(['state' => SubscriptionModel::STATE_ACTIVE]);
            $query->andWhere(['in', 'variantId', $activeVariantQuery]);
        }

        $rows = $query->all();
        $variantIds = array_map(fn(array $row) => (int)$row['variantId'], $rows);
        $variants = $this->_variantsById($variantIds);

        return array_map(fn(array $row) => [
            'variantId' => (int)$row['variantId'],
            'variant' => $variants[(int)$row['variantId']] ?? null,
            'totalCount' => (int)$row['totalCount'],
            'activeCount' => (int)$row['activeCount'],
            'oldestActiveAt' => $row['oldestActiveAt'],
            'lastSubscriptionAt' => $row['lastSubscriptionAt'],
            'lastNotifiedAt' => $row['lastNotifiedAt'],
        ], $rows);
    }

    private function _activityData(int $page, int $pageSize, int $variantId = 0, ?string $type = null, bool $attention = false): array
    {
        $fetchLimit = $page * $pageSize;
        $subscriptionQuery = Subscription::find()->orderBy(['dateUpdated' => SORT_DESC]);
        $runQuery = RestockRun::find()->orderBy(['openedAt' => SORT_DESC]);

        if ($variantId) {
            $subscriptionQuery->andWhere(['variantId' => $variantId]);
            $runQuery->andWhere(['variantId' => $variantId]);
        }

        if ($attention) {
            $thirtyDaysAgo = Db::prepareDateForDb((new DateTime())->modify('-30 days'));
            $runQuery
                ->andWhere(['or', ['>', 'failedCount', 0], ['>', 'unknownCount', 0]])
                ->andWhere(['>=', 'openedAt', $thirtyDaysAgo]);
        }

        $includeSubscriptions = !$attention && $type !== 'notification';
        $includeRuns = $type !== 'subscription';
        $subscriptionTotal = $includeSubscriptions ? (int)$subscriptionQuery->count() : 0;

        if ($includeSubscriptions) {
            foreach (['verifiedAt', 'notifiedAt', 'cancelledAt', 'expiredAt'] as $timestamp) {
                $subscriptionTotal += (int)(clone $subscriptionQuery)->andWhere(['not', [$timestamp => null]])->count();
            }
        }

        $runTotal = $includeRuns ? (int)$runQuery->count() : 0;
        $subscriptions = $includeSubscriptions ? $subscriptionQuery->limit($fetchLimit)->all() : [];
        $runs = $includeRuns ? $runQuery->limit($fetchLimit)->all() : [];
        $variantIds = array_values(array_unique(array_merge(
            array_map(fn(Subscription $subscription) => $subscription->variantId, $subscriptions),
            array_map(fn(RestockRun $run) => $run->variantId, $runs),
        )));
        $variants = $this->_variantsById($variantIds);
        $entries = [];

        foreach ($subscriptions as $subscription) {
            $subscriptionEvents = [[
                'title' => $subscription->state === SubscriptionModel::STATE_PENDING_VERIFICATION ? 'Awaiting verification' : 'Subscription created',
                'state' => $subscription->state === SubscriptionModel::STATE_PENDING_VERIFICATION ? SubscriptionModel::STATE_PENDING_VERIFICATION : SubscriptionModel::STATE_ACTIVE,
                'occurredAt' => $subscription->dateCreated,
            ]];

            foreach ([
                'verifiedAt' => ['Subscription verified', SubscriptionModel::STATE_ACTIVE],
                'notifiedAt' => ['Subscriber notified', SubscriptionModel::STATE_NOTIFIED],
                'cancelledAt' => ['Subscription cancelled', SubscriptionModel::STATE_CANCELLED],
                'expiredAt' => ['Subscription expired', SubscriptionModel::STATE_EXPIRED],
            ] as $timestamp => [$title, $state]) {
                if ($subscription->$timestamp) {
                    $subscriptionEvents[] = [
                        'title' => $title,
                        'state' => $state,
                        'occurredAt' => $subscription->$timestamp,
                    ];
                }
            }

            foreach ($subscriptionEvents as $subscriptionEvent) {
                $entries[] = [
                    'kind' => 'subscription',
                    'title' => $subscriptionEvent['title'],
                    'detail' => $subscription->email,
                    'state' => $subscriptionEvent['state'],
                    'variantId' => $subscription->variantId,
                    'variant' => $variants[$subscription->variantId] ?? null,
                    'occurredAt' => $subscriptionEvent['occurredAt'],
                    'url' => UrlHelper::cpUrl('back-in-stock/notifications', ['variantId' => $subscription->variantId]),
                ];
            }
        }

        foreach ($runs as $run) {
            $entries[] = [
                'kind' => 'notification',
                'title' => 'Notification run ' . $run->status,
                'detail' => Craft::t('craft-commerce-back-in-stock', '{sent} sent · {selected} of {eligible} selected', [
                    'sent' => $run->sentCount,
                    'selected' => $run->selectedCount,
                    'eligible' => $run->eligibleCount,
                ]),
                'state' => ($run->failedCount || $run->unknownCount) ? 'attention' : $run->status,
                'variantId' => $run->variantId,
                'variant' => $variants[$run->variantId] ?? null,
                'occurredAt' => $run->openedAt,
                'url' => UrlHelper::cpUrl('back-in-stock/notifications/activity/' . $run->id),
            ];
        }

        usort($entries, fn(array $a, array $b) => strtotime((string)$b['occurredAt']) <=> strtotime((string)$a['occurredAt']));

        return [
            'entries' => array_slice($entries, ($page - 1) * $pageSize, $pageSize),
            'total' => $subscriptionTotal + $runTotal,
        ];
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
