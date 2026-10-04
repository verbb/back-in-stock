<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\helpers\Db;
use craft\web\Controller;

use DateTime;
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
        $thirtyDaysAgo = Db::prepareDateForDb((new DateTime())->modify('-30 days'));
        $recentRuns = RestockRun::find()
            ->orderBy(['openedAt' => SORT_DESC])
            ->limit(10)
            ->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/overview', [
            'counts' => [
                'active' => Subscription::find()->where(['state' => SubscriptionModel::STATE_ACTIVE])->count(),
                'pending' => Subscription::find()->where(['state' => SubscriptionModel::STATE_PENDING_VERIFICATION])->count(),
                'notified' => Subscription::find()->where(['state' => SubscriptionModel::STATE_NOTIFIED])->andWhere(['>=', 'notifiedAt', $thirtyDaysAgo])->count(),
                'failed' => DeliveryAttempt::find()->where(['status' => [DeliveryAttemptModel::STATUS_FAILED, DeliveryAttemptModel::STATUS_UNKNOWN]])->andWhere(['>=', 'dateCreated', $thirtyDaysAgo])->count(),
            ],
            'runs' => $this->_decorateRuns($recentRuns),
        ]);
    }

    public function actionSubscriptions(): Response
    {
        $this->_requireDashboardAccess();
        $state = $this->request->getQueryParam('state');
        $search = trim((string)$this->request->getQueryParam('search'));
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

        $total = (int)$query->count();
        $subscriptions = $query
            ->offset(($page - 1) * self::PAGE_SIZE)
            ->limit(self::PAGE_SIZE)
            ->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/subscriptions', [
            'subscriptions' => $this->_decorateSubscriptions($subscriptions),
            'state' => $state,
            'search' => $search,
            'page' => $page,
            'pageCount' => max(1, (int)ceil($total / self::PAGE_SIZE)),
            'total' => $total,
        ]);
    }

    public function actionHistory(): Response
    {
        $this->_requireDashboardAccess();
        $page = max(1, (int)$this->request->getQueryParam('page', 1));
        $query = RestockRun::find()->orderBy(['openedAt' => SORT_DESC]);
        $total = (int)$query->count();
        $runs = $query
            ->offset(($page - 1) * self::PAGE_SIZE)
            ->limit(self::PAGE_SIZE)
            ->all();

        return $this->renderTemplate('craft-commerce-back-in-stock/history', [
            'runs' => $this->_decorateRuns($runs),
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
        $variants = $variantIds ? Variant::find()->id($variantIds)->site('*')->status(null)->indexBy('id')->all() : [];

        return array_map(function(Subscription $subscription) use ($variants) {
            $subscription->populateRelation('variant', $variants[$subscription->variantId] ?? null);
            return $subscription;
        }, $subscriptions);
    }

    private function _decorateRuns(array $runs): array
    {
        $variantIds = array_values(array_unique(array_map(fn(RestockRun $run) => $run->variantId, $runs)));
        $variants = $variantIds ? Variant::find()->id($variantIds)->site('*')->status(null)->indexBy('id')->all() : [];

        return array_map(fn(RestockRun $run) => [
            'record' => $run,
            'variant' => $variants[$run->variantId] ?? null,
        ], $runs);
    }
}
