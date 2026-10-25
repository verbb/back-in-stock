<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\db\Query;
use craft\helpers\AdminTable;
use craft\helpers\DateTimeHelper;
use craft\helpers\Db;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use craft\web\Controller;

use DateTime;
use yii\db\Expression;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;

class DashboardController extends Controller
{
    // Constants
    // =========================================================================

    private const PRODUCT_DETAIL_PAGE_SIZE = 50;

    private const PRODUCT_TABLE_PAGE_SIZE = 100;


    // Public Methods
    // =========================================================================

    public function actionOverview(): Response
    {
        $this->_requireDashboardAccess();
        $counts = $this->_dashboardCounts();

        return $this->renderTemplate('craft-commerce-back-in-stock/overview', [
            'counts' => $counts,
            'products' => $this->_productRows(true, 0, 8),
            'activity' => $this->_activityData(1, 8)['entries'],
        ]);
    }

    public function actionOverviewRedirect(): Response
    {
        $this->_requireDashboardAccess();

        return $this->redirect(UrlHelper::cpUrl('back-in-stock', $this->request->getQueryParams()));
    }

    public function actionProducts(): Response
    {
        $this->_requireDashboardAccess();
        $demand = $this->request->getQueryParam('demand', 'all');
        $demand = in_array($demand, ['active', 'past', 'all'], true) ? $demand : 'all';
        $search = trim((string)$this->request->getQueryParam('search', ''));
        $typeId = max(0, (int)$this->request->getQueryParam('productType', 0));
        $sort = $this->request->getQueryParam('sort') === 'recent' ? 'recent' : 'waiting';
        $attention = (bool)$this->request->getQueryParam('attention');

        return $this->renderTemplate('craft-commerce-back-in-stock/products', [
            'demand' => $demand,
            'search' => $search,
            'productType' => $typeId,
            'sort' => $sort,
            'attention' => $attention,
            'productTypes' => \craft\commerce\Plugin::getInstance()->getProductTypes()->getAllProductTypes(),
        ]);
    }

    public function actionProductTable(): Response
    {
        $this->_requireDashboardAccess();
        $this->requireAcceptsJson();

        $page = $this->_getPositiveIntegerParam('page', 1);
        $pageSize = min($this->_getPositiveIntegerParam('per_page', self::PRODUCT_TABLE_PAGE_SIZE), self::PRODUCT_TABLE_PAGE_SIZE);
        $demand = $this->request->getParam('demand', 'all');
        $demand = in_array($demand, ['active', 'past', 'all'], true) ? $demand : 'all';
        $search = trim((string)$this->request->getParam('search', ''));
        $typeId = max(0, (int)$this->request->getParam('productType', 0));
        $attention = filter_var($this->request->getParam('attention', false), FILTER_VALIDATE_BOOLEAN);
        $defaultSort = $this->request->getParam('sortMode') === 'recent' ? 'recent' : 'waiting';
        [$sort, $sortDirection] = $this->_productTableSort($this->request->getParam('sort'), $defaultSort);
        $data = $this->_productActivityData($demand, $search, $typeId, $sort, $page, $pageSize, $attention, $sortDirection);
        $dateFormat = Craft::$app->getFormattingLocale()->getDateTimeFormat('short', Locale::FORMAT_PHP);
        $tableData = [];

        foreach ($data['products'] as $product) {
            $variant = $product['variant'];
            $commerceProduct = $variant?->getOwner();
            $commerceProduct = $commerceProduct instanceof Product ? $commerceProduct : null;
            $productTitle = $commerceProduct?->title ?? $variant?->title ?? Craft::t('craft-commerce-back-in-stock', 'Variant #{id}', ['id' => $product['variantId']]);
            $title = $commerceProduct && $variant->title !== $commerceProduct->title ? "$productTitle → {$variant->title}" : $productTitle;
            $detailParams = $product['matchingSubscriberCount'] ? ['search' => $search] : ($product['activeCount'] ? [] : ['state' => 'all']);
            $latestRequest = $product['lastSubscriptionAt'] ? DateTimeHelper::toDateTime($product['lastSubscriptionAt']) : null;

            $tableData[] = [
                'id' => $product['variantId'],
                'title' => $title,
                'url' => UrlHelper::cpUrl("back-in-stock/products/{$product['variantId']}", $detailParams),
                'productType' => $commerceProduct?->getType()->name ?? '—',
                'sku' => $variant?->sku ?: '—',
                'waiting' => $product['activeCount'],
                'latestRequest' => $latestRequest?->format($dateFormat) ?? '—',
            ];
        }

        return $this->asJson([
            'pagination' => AdminTable::paginationLinks($data['page'], $data['total'], $data['pageSize']),
            'data' => $tableData,
        ]);
    }

    public function actionProduct(int $variantId): Response
    {
        return $this->_productDetailResponse($variantId, 'subscriptions');
    }

    public function actionProductActivity(int $variantId): Response
    {
        return $this->_productDetailResponse($variantId, 'activity');
    }

    public function actionSubscriptionTable(int $variantId): Response
    {
        $this->_requireDashboardAccess();
        $this->requireAcceptsJson();
        $this->_requireProductDetailVariant($variantId);

        $page = $this->_getPositiveIntegerParam('page', 1);
        $pageSize = min($this->_getPositiveIntegerParam('per_page', self::PRODUCT_DETAIL_PAGE_SIZE), self::PRODUCT_DETAIL_PAGE_SIZE);
        $search = trim((string)$this->request->getParam('search', ''));
        $state = $this->_subscriptionState($this->request->getParam('state'));
        $showSite = count(Craft::$app->getSites()->getAllSites()) > 1;
        [$sort, $sortDirection] = $this->_subscriptionTableSort($this->request->getParam('sort'), $showSite);
        $query = Subscription::find()->where(['variantId' => $variantId]);

        if ($state) {
            $query->andWhere(['state' => $state]);
        }

        if ($search !== '') {
            $like = Craft::$app->getDb()->getIsPgsql() ? 'ILIKE' : 'LIKE';
            $query->andWhere([$like, 'email', '%' . str_replace(' ', '%', $search) . '%', false]);
        }

        $query->orderBy([$sort => $sortDirection === 'asc' ? SORT_ASC : SORT_DESC, 'id' => SORT_ASC]);
        $total = (int)$query->count();
        $pageCount = max(1, (int)ceil($total / $pageSize));
        $page = min($page, $pageCount);
        $subscriptions = $query
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->all();
        $sites = $showSite ? Craft::$app->getSites()->getAllSites() : [];
        $sitesById = [];

        foreach ($sites as $site) {
            $sitesById[$site->id] = $site;
        }

        $dateFormat = Craft::$app->getFormattingLocale()->getDateTimeFormat('short', Locale::FORMAT_PHP);
        $tableData = array_map(function(Subscription $subscription) use ($dateFormat, $showSite, $sitesById) {
            $state = $this->_subscriptionStatePresentation($subscription->state);
            $subscribedAt = DateTimeHelper::toDateTime($subscription->dateCreated);
            $row = [
                'id' => $subscription->id,
                'subscriber' => $subscription->email,
                'state' => $state,
                'subscribed' => $subscribedAt?->format($dateFormat) ?? '—',
            ];

            if ($showSite) {
                $row['site'] = $sitesById[$subscription->siteId]->name ?? '—';
            }

            return $row;
        }, $subscriptions);

        return $this->asJson([
            'pagination' => AdminTable::paginationLinks($page, $total, $pageSize),
            'data' => $tableData,
        ]);
    }

    public function actionActivityTable(int $variantId): Response
    {
        $this->_requireDashboardAccess();
        $this->requireAcceptsJson();
        $this->_requireProductDetailVariant($variantId);

        $page = $this->_getPositiveIntegerParam('page', 1);
        $pageSize = min($this->_getPositiveIntegerParam('per_page', self::PRODUCT_DETAIL_PAGE_SIZE), self::PRODUCT_DETAIL_PAGE_SIZE);
        $type = $this->request->getParam('type');
        $type = is_string($type) && in_array($type, ['subscription', 'notification'], true) ? $type : null;
        $attention = filter_var($this->request->getParam('attention', false), FILTER_VALIDATE_BOOLEAN);
        $activity = $this->_activityData($page, $pageSize, $variantId, $type, $attention);
        $dateFormat = Craft::$app->getFormattingLocale()->getDateTimeFormat('short', Locale::FORMAT_PHP);
        $tableData = [];

        foreach ($activity['entries'] as $index => $entry) {
            $occurredAt = DateTimeHelper::toDateTime($entry['occurredAt']);
            $tableData[] = [
                'id' => $entry['kind'] . '-' . $index . '-' . ($occurredAt?->getTimestamp() ?? 0),
                'event' => [
                    'label' => Craft::t('craft-commerce-back-in-stock', $entry['title']),
                    'status' => $this->_activityStatus($entry['state']),
                    'url' => $entry['url'],
                ],
                'when' => $occurredAt?->format($dateFormat) ?? '—',
            ];
        }

        return $this->asJson([
            'pagination' => AdminTable::paginationLinks($activity['page'], $activity['total'], $pageSize),
            'data' => $tableData,
        ]);
    }

    public function actionNotifications(): Response
    {
        $this->_requireDashboardAccess();
        $search = trim((string)$this->request->getQueryParam('search'));
        $variantId = max(0, (int)$this->request->getQueryParam('variantId'));

        if ($variantId) {
            return $this->redirect(UrlHelper::cpUrl("back-in-stock/products/$variantId", [
                'search' => $search ?: null,
                'state' => $this->request->getQueryParam('state'),
            ]));
        }

        return $this->redirect(UrlHelper::cpUrl('back-in-stock/products', [
            'search' => $search ?: null,
            'demand' => $this->request->getQueryParam('state') === SubscriptionModel::STATE_ACTIVE ? 'active' : 'all',
        ]));
    }

    public function actionSubscriptions(): Response
    {
        return $this->actionNotifications();
    }

    public function actionActivity(): Response
    {
        $this->_requireDashboardAccess();
        $variantId = max(0, (int)$this->request->getQueryParam('variantId'));

        if ($variantId) {
            return $this->redirect(UrlHelper::cpUrl("back-in-stock/products/$variantId/activity", [
                'type' => $this->request->getQueryParam('type'),
                'attention' => $this->request->getQueryParam('attention'),
                'page' => $this->request->getQueryParam('page'),
            ]));
        }

        return $this->redirect(UrlHelper::cpUrl('back-in-stock/products', [
            'attention' => $this->request->getQueryParam('attention'),
            'sort' => 'recent',
        ]));
    }

    public function actionHistory(): Response
    {
        return $this->actionActivity();
    }

    public function actionActivityDetail(int $variantId, int $runId): Response
    {
        $this->_requireDashboardAccess();
        $run = RestockRun::findOne($runId);

        if (!$run || (int)$run->variantId !== $variantId) {
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

    public function actionNotificationDetail(int $runId): Response
    {
        $this->_requireDashboardAccess();
        $run = RestockRun::findOne($runId);

        if (!$run) {
            throw new NotFoundHttpException(Craft::t('craft-commerce-back-in-stock', 'Run not found.'));
        }

        return $this->redirect(UrlHelper::cpUrl("back-in-stock/products/{$run->variantId}/activity/$runId", $this->request->getQueryParams()));
    }

    public function actionHistoryDetail(int $runId): Response
    {
        return $this->actionNotificationDetail($runId);
    }


    // Private Methods
    // =========================================================================

    private function _productDetailResponse(int $variantId, string $selectedTab): Response
    {
        $this->_requireDashboardAccess();
        $variant = $this->_requireProductDetailVariant($variantId);
        $search = '';
        $state = null;
        $type = null;
        $attention = false;

        if ($selectedTab === 'subscriptions') {
            $search = trim((string)$this->request->getQueryParam('search'));
            $state = $this->_subscriptionState($this->request->getQueryParam('state', $search === '' ? SubscriptionModel::STATE_ACTIVE : null));
        } else {
            $type = (string)$this->request->getQueryParam('type');
            $type = in_array($type, ['subscription', 'notification'], true) ? $type : null;
            $attention = filter_var($this->request->getQueryParam('attention', false), FILTER_VALIDATE_BOOLEAN);
        }

        return $this->renderTemplate('craft-commerce-back-in-stock/product-detail', [
            'variantId' => $variantId,
            'variant' => $variant,
            'selectedTab' => $selectedTab,
            'state' => $state,
            'search' => $search,
            'type' => $type,
            'attention' => $attention,
            'showSite' => count(Craft::$app->getSites()->getAllSites()) > 1,
        ]);
    }

    private function _requireProductDetailVariant(int $variantId): ?Variant
    {
        $variant = $this->_variantsById([$variantId])[$variantId] ?? null;
        $hasSubscriptions = Subscription::find()->where(['variantId' => $variantId])->exists();
        $hasHistory = RestockRun::find()->where(['variantId' => $variantId])->exists();

        if (!$variant && !$hasSubscriptions && !$hasHistory) {
            throw new NotFoundHttpException(Craft::t('craft-commerce-back-in-stock', 'Product demand not found.'));
        }

        return $variant;
    }

    private function _requireDashboardAccess(): void
    {
        $this->requireCpRequest();
        $this->requirePermission('accessPlugin-craft-commerce-back-in-stock');
    }

    private function _getPositiveIntegerParam(string $name, int $default): int
    {
        $value = $this->request->getParam($name, $default);

        if (is_int($value) && $value > 0) {
            return $value;
        }

        if (is_string($value) && preg_match('/^[1-9][0-9]*$/D', $value)) {
            $integer = filter_var($value, FILTER_VALIDATE_INT, [
                'options' => ['min_range' => 1],
            ]);

            if ($integer !== false) {
                return $integer;
            }
        }

        throw new BadRequestHttpException("The $name parameter must be a positive integer.");
    }

    private function _productTableSort(mixed $sort, string $default): array
    {
        if (!$sort) {
            return [$default, 'desc'];
        }

        if (!is_array($sort) || !isset($sort[0]) || !is_array($sort[0])) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        $sortField = $sort[0]['sortField'] ?? null;
        $direction = strtolower((string)($sort[0]['direction'] ?? ''));
        $sortFields = [
            'title' => 'title',
            'productType' => 'productType',
            'sku' => 'sku',
            'waiting' => 'waiting',
            'latestRequest' => 'recent',
        ];

        if (!is_string($sortField) || !isset($sortFields[$sortField]) || !in_array($direction, ['asc', 'desc'], true)) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        return [$sortFields[$sortField], $direction];
    }

    private function _subscriptionTableSort(mixed $sort, bool $showSite): array
    {
        if (!$sort) {
            return ['dateCreated', 'desc'];
        }

        if (!is_array($sort) || !isset($sort[0]) || !is_array($sort[0])) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        $sortField = $sort[0]['sortField'] ?? null;
        $direction = strtolower((string)($sort[0]['direction'] ?? ''));
        $sortFields = [
            'subscriber' => 'email',
            'state' => 'state',
            'subscribed' => 'dateCreated',
        ];

        if ($showSite) {
            $sortFields['site'] = 'siteId';
        }

        if (!is_string($sortField) || !isset($sortFields[$sortField]) || !in_array($direction, ['asc', 'desc'], true)) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        return [$sortFields[$sortField], $direction];
    }

    private function _subscriptionState(mixed $state): ?string
    {
        return is_string($state) && in_array($state, [
            SubscriptionModel::STATE_PENDING_VERIFICATION,
            SubscriptionModel::STATE_ACTIVE,
            SubscriptionModel::STATE_NOTIFIED,
            SubscriptionModel::STATE_CANCELLED,
            SubscriptionModel::STATE_EXPIRED,
        ], true) ? $state : null;
    }

    private function _subscriptionStatePresentation(string $state): array
    {
        return match ($state) {
            SubscriptionModel::STATE_PENDING_VERIFICATION => ['label' => Craft::t('craft-commerce-back-in-stock', 'Pending verification'), 'status' => 'orange'],
            SubscriptionModel::STATE_ACTIVE => ['label' => Craft::t('craft-commerce-back-in-stock', 'Active'), 'status' => 'green'],
            SubscriptionModel::STATE_NOTIFIED => ['label' => Craft::t('craft-commerce-back-in-stock', 'Notified'), 'status' => 'blue'],
            SubscriptionModel::STATE_CANCELLED => ['label' => Craft::t('craft-commerce-back-in-stock', 'Cancelled'), 'status' => 'gray'],
            SubscriptionModel::STATE_EXPIRED => ['label' => Craft::t('craft-commerce-back-in-stock', 'Expired'), 'status' => 'gray'],
            default => ['label' => $state, 'status' => 'gray'],
        };
    }

    private function _activityStatus(string $state): string
    {
        return match ($state) {
            'attention' => 'red',
            SubscriptionModel::STATE_PENDING_VERIFICATION, 'unconfirmed' => 'orange',
            SubscriptionModel::STATE_ACTIVE, 'open' => 'green',
            SubscriptionModel::STATE_NOTIFIED, 'completed' => 'blue',
            default => 'gray',
        };
    }

    private function _productActivityData(string $demand, string $search, int $typeId, string $sort, int $page, int $pageSize = 100, bool $attention = false, string $sortDirection = 'desc'): array
    {
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
            ->groupBy(['variantId']);

        if ($demand === 'active') {
            $totalQuery->where(['state' => SubscriptionModel::STATE_ACTIVE]);
            $activeVariantQuery = (new Query())
                ->select(['variantId'])
                ->from(Subscription::tableName())
                ->where(['state' => SubscriptionModel::STATE_ACTIVE]);
            $demandQuery->andWhere(['in', 'variantId', $activeVariantQuery]);
        }

        if ($demand === 'past') {
            $activeVariants = (new Query())->select('variantId')->from(Subscription::tableName())->where(['state' => SubscriptionModel::STATE_ACTIVE]);
            $totalQuery->andWhere(['not in', 'variantId', $activeVariants]);
            $demandQuery->andWhere(['not in', 'variantId', $activeVariants]);
        }

        // Resolve product identity, subscriber-email and review-state matches to
        // variant IDs before aggregation so each result retains its real totals.
        if ($typeId) {
            $matchingTypeVariants = (new Query())
                ->select('v.id')->distinct()
                ->from(['v' => '{{%commerce_variants}}'])
                ->innerJoin(['p' => '{{%commerce_products}}'], '[[p.id]] = [[v.primaryOwnerId]]')
                ->where(['p.typeId' => $typeId]);
            $totalQuery->andWhere(['in', 'variantId', $matchingTypeVariants]);
            $demandQuery->andWhere(['in', 'variantId', $matchingTypeVariants]);
        }

        if ($search !== '') {
            $like = Craft::$app->getDb()->getIsPgsql() ? 'ILIKE' : 'LIKE';
            $matchingCommerceVariants = (new Query())
                ->select('v.id')->distinct()
                ->from(['v' => '{{%commerce_variants}}'])
                ->innerJoin(['p' => '{{%commerce_products}}'], '[[p.id]] = [[v.primaryOwnerId]]')
                ->innerJoin(['purchasable' => '{{%commerce_purchasables}}'], '[[purchasable.id]] = [[v.id]]')
                ->leftJoin(['vt' => '{{%elements_sites}}'], '[[vt.elementId]] = [[v.id]]')
                ->leftJoin(['pt' => '{{%elements_sites}}'], '[[pt.elementId]] = [[p.id]]')
                ->where(['or', [$like, 'vt.title', $search], [$like, 'pt.title', $search], [$like, 'purchasable.sku', $search]]);
            $matchingSubscriberVariants = (new Query())
                ->select('variantId')
                ->from(Subscription::tableName())
                ->where([$like, 'email', $search]);
            $searchCondition = ['or', ['in', 'variantId', $matchingCommerceVariants], ['in', 'variantId', $matchingSubscriberVariants]];
            $totalQuery->andWhere($searchCondition);
            $demandQuery->andWhere($searchCondition);
        }

        if ($attention) {
            $thirtyDaysAgo = Db::prepareDateForDb((new DateTime())->modify('-30 days'));
            $matchingReviewVariants = (new Query())
                ->select('variantId')
                ->from(RestockRun::tableName())
                ->where(['or', ['>', 'failedCount', 0], ['>', 'unknownCount', 0]])
                ->andWhere(['>=', 'openedAt', $thirtyDaysAgo]);
            $totalQuery->andWhere(['in', 'variantId', $matchingReviewVariants]);
            $demandQuery->andWhere(['in', 'variantId', $matchingReviewVariants]);
        }

        $direction = $sortDirection === 'asc' ? SORT_ASC : SORT_DESC;
        $identitySiteId = Craft::$app->getSites()->getCurrentSite()->id;
        $orderedQuery = (new Query())
            ->select(['demand.*'])
            ->from(['demand' => $demandQuery])
            ->leftJoin(['commerceVariant' => '{{%commerce_variants}}'], '[[commerceVariant.id]] = [[demand.variantId]]')
            ->leftJoin(['purchasable' => '{{%commerce_purchasables}}'], '[[purchasable.id]] = [[commerceVariant.id]]')
            ->leftJoin(['commerceProduct' => '{{%commerce_products}}'], '[[commerceProduct.id]] = [[commerceVariant.primaryOwnerId]]')
            ->leftJoin(['productType' => '{{%commerce_producttypes}}'], '[[productType.id]] = [[commerceProduct.typeId]]')
            ->leftJoin(['variantSite' => '{{%elements_sites}}'], '[[variantSite.elementId]] = [[commerceVariant.id]] AND [[variantSite.siteId]] = :identitySiteId', [':identitySiteId' => $identitySiteId])
            ->leftJoin(['productSite' => '{{%elements_sites}}'], '[[productSite.elementId]] = [[commerceProduct.id]] AND [[productSite.siteId]] = :identitySiteId', [':identitySiteId' => $identitySiteId]);

        $orderedQuery->orderBy(match ($sort) {
            'title' => ['productSite.title' => $direction, 'variantSite.title' => $direction, 'demand.variantId' => SORT_ASC],
            'productType' => ['productType.name' => $direction, 'productSite.title' => SORT_ASC, 'variantSite.title' => SORT_ASC, 'demand.variantId' => SORT_ASC],
            'sku' => ['purchasable.sku' => $direction, 'demand.variantId' => SORT_ASC],
            'recent' => ['demand.lastSubscriptionAt' => $direction, 'demand.variantId' => SORT_ASC],
            default => ['demand.activeCount' => $direction, 'demand.lastSubscriptionAt' => SORT_DESC, 'demand.variantId' => SORT_ASC],
        });

        $total = (int)$totalQuery->scalar();
        $pageSize = max(1, $pageSize);
        $pageCount = max(1, (int)ceil($total / $pageSize));
        $page = min(max(1, $page), $pageCount);
        $demandRows = $orderedQuery
            ->offset(($page - 1) * $pageSize)
            ->limit($pageSize)
            ->all();
        $variantIds = array_map(fn(array $row) => (int)$row['variantId'], $demandRows);
        $variants = $this->_variantsById($variantIds);
        $matchingSubscriberCounts = [];

        if ($search !== '' && $variantIds) {
            $like = Craft::$app->getDb()->getIsPgsql() ? 'ILIKE' : 'LIKE';
            $matchingSubscriberRows = (new Query())
                ->select(['variantId', 'count' => new Expression('COUNT([[id]])')])
                ->from(Subscription::tableName())
                ->where(['variantId' => $variantIds])
                ->andWhere([$like, 'email', $search])
                ->groupBy(['variantId'])
                ->all();
            $matchingSubscriberCounts = array_column($matchingSubscriberRows, 'count', 'variantId');
        }

        $products = array_map(function(array $row) use ($variants, $matchingSubscriberCounts) {
            $variantId = (int)$row['variantId'];

            return [
                'variantId' => $variantId,
                'variant' => $variants[$variantId] ?? null,
                'activeCount' => (int)$row['activeCount'],
                'matchingSubscriberCount' => (int)($matchingSubscriberCounts[$variantId] ?? 0),
                'lastSubscriptionAt' => $row['lastSubscriptionAt'],
            ];
        }, $demandRows);

        return [
            'products' => $products,
            'page' => $page,
            'pageCount' => $pageCount,
            'pageSize' => $pageSize,
            'total' => $total,
        ];
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
        $total = $subscriptionTotal + $runTotal;
        $pageCount = max(1, (int)ceil($total / $pageSize));
        $page = min(max(1, $page), $pageCount);
        $fetchLimit = $page * $pageSize;
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
                'title' => $subscription->state === SubscriptionModel::STATE_PENDING_VERIFICATION ? 'Confirmation requested' : 'Customer subscribed',
                'state' => $subscription->state === SubscriptionModel::STATE_PENDING_VERIFICATION ? SubscriptionModel::STATE_PENDING_VERIFICATION : SubscriptionModel::STATE_ACTIVE,
                'occurredAt' => $subscription->dateCreated,
            ]];

            foreach ([
                'verifiedAt' => ['Subscription confirmed', SubscriptionModel::STATE_ACTIVE],
                'notifiedAt' => ['Notification sent', SubscriptionModel::STATE_NOTIFIED],
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
                    'url' => null,
                ];
            }
        }

        foreach ($runs as $run) {
            $presentation = $this->_notificationActivityPresentation($run);
            $entries[] = [
                'kind' => 'notification',
                'title' => $presentation['title'],
                'detail' => Craft::t('craft-commerce-back-in-stock', '{sent} sent · {selected} of {eligible} selected', [
                    'sent' => $run->sentCount,
                    'selected' => $run->selectedCount,
                    'eligible' => $run->eligibleCount,
                ]),
                'state' => $presentation['state'],
                'variantId' => $run->variantId,
                'variant' => $variants[$run->variantId] ?? null,
                'occurredAt' => $run->openedAt,
                'url' => UrlHelper::cpUrl("back-in-stock/products/{$run->variantId}/activity/{$run->id}"),
            ];
        }

        usort($entries, fn(array $a, array $b) => strtotime((string)$b['occurredAt']) <=> strtotime((string)$a['occurredAt']));

        return [
            'entries' => array_slice($entries, ($page - 1) * $pageSize, $pageSize),
            'page' => $page,
            'pageCount' => $pageCount,
            'total' => $total,
        ];
    }

    private function _notificationActivityPresentation(RestockRun $run): array
    {
        // Selection completion is not delivery completion. Only confirmed hand-offs
        // earn a sent label; ambiguous results remain warnings rather than failures.
        if ($run->failedCount) {
            return [
                'title' => $run->unknownCount ? 'Notifications need review' : ($run->sentCount ? 'Some notifications failed to send' : 'Notifications failed to send'),
                'state' => 'attention',
            ];
        }

        if ($run->unknownCount) {
            return ['title' => 'Notification sending unconfirmed', 'state' => 'unconfirmed'];
        }

        $finishedCount = (int)$run->sentCount + (int)$run->cancelledCount;

        if ((int)$run->selectedCount > $finishedCount) {
            return ['title' => 'Notifications in progress', 'state' => 'open'];
        }

        if ($run->cancelledCount) {
            return ['title' => $run->sentCount ? 'Notification sending finished' : 'Notifications cancelled', 'state' => 'closed'];
        }

        if ($run->sentCount) {
            return ['title' => 'Notifications sent', 'state' => 'completed'];
        }

        if (!(int)$run->eligibleCount) {
            return ['title' => 'No subscribers to notify', 'state' => 'closed'];
        }

        return ['title' => $run->status === 'closed' ? 'Notification sending stopped' : 'Waiting for available stock', 'state' => 'closed'];
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

        return array_map(function(RestockRun $run) use ($variants) {
            $presentation = $this->_notificationActivityPresentation($run);

            return [
                'record' => $run,
                'variant' => $variants[$run->variantId] ?? null,
                'title' => $presentation['title'],
                'state' => $presentation['state'],
            ];
        }, $runs);
    }

    private function _variantsById(array $variantIds): array
    {
        return $variantIds ? Variant::find()->id($variantIds)->site('*')->status(null)->with(['owner'])->indexBy('id')->all() : [];
    }
}
