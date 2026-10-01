<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;

use Craft;
use craft\db\Query;
use craft\helpers\AdminTable;
use craft\helpers\ArrayHelper;
use craft\helpers\DateTimeHelper;
use craft\helpers\Json;
use craft\i18n\Locale;
use craft\web\Controller;

use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use craft\commerce\Plugin as Commerce;
use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;

class LogsController extends Controller
{
    // Constants
    // =========================================================================

    private const MAX_PAGE_SIZE = 100;

    private const SORT_FIELDS = [
        'email' => 'logs.email',
        'variantId' => 'logs.variantId',
        'locale' => 'logs.locale',
        'isNotified' => 'logs.isNotified',
        'dateCreated' => 'logs.dateCreated',
    ];

    private const SORT_DIRECTIONS = [
        'asc' => SORT_ASC,
        'desc' => SORT_DESC,
    ];

    // Public Methods
    // =========================================================================

    public function actionIndex(): Response
    {
        $this->_requireDashboardAccess();

        return $this->renderTemplate('craft-commerce-back-in-stock/logs');
    }

    public function actionGetLogs(): Response
    {
        $this->_requireDashboardAccess();
        $this->requireAcceptsJson();

        $page = $this->_getPositiveIntegerParam('page', 1);
        $sort = $this->request->getParam('sort');
        $limit = min($this->_getPositiveIntegerParam('per_page', 10), self::MAX_PAGE_SIZE);
        $search = $this->request->getParam('search');

        if (($page - 1) > intdiv(PHP_INT_MAX, $limit)) {
            throw new BadRequestHttpException('The page parameter is too large.');
        }

        $offset = ($page - 1) * $limit;

        $query = (new Query())
            ->from(['logs' => '{{%backinstock_records}}'])
            ->select([
                'logs.*',
                'products.typeId AS productTypeId',
            ])
            ->leftJoin('{{%commerce_variants}} variants', '[[logs.variantId]] = [[variants.id]]')
            ->leftJoin('{{%commerce_products}} products', '[[variants.primaryOwnerId]] = [[products.id]]')
            ->orderBy(['logs.id' => SORT_DESC]);

        if ($search) {
            $likeOperator = Craft::$app->getDb()->getIsPgsql() ? 'ILIKE' : 'LIKE';

            $query->andWhere([
                'or',
                [$likeOperator, 'logs.email', '%' . str_replace(' ', '%', $search) . '%', false],
                [$likeOperator, 'logs.locale', '%' . str_replace(' ', '%', $search) . '%', false],
            ]);
        }

        $total = $query->count();

        $query->limit($limit);
        $query->offset($offset);

        $this->_applySort($query, $sort);

        $logs = $query->all();

        $tableData = [];

        // Get all the variants for each log here for efficiency.
        // Commerce 5 variants are nested elements: they do not define cpEditUrl(); the product does.
        $variantIds = array_values(array_unique(array_filter(ArrayHelper::getColumn($logs, 'variantId'))));
        $variants = $variantIds === [] ? [] : Variant::find()
            ->id($variantIds)
            ->with(['owner'])
            ->indexBy('id')
            ->all();

        $dateFormat = Craft::$app->getFormattingLocale()->getDateTimeFormat('short', Locale::FORMAT_PHP);

        foreach ($logs as $log) {
            $variant = $variants[$log['variantId']] ?? [];
            $dateCreated = $log['dateCreated'] ? DateTimeHelper::toDateTime($log['dateCreated']) : null;

            $cpEditUrl = null;

            if ($variant) {
                $cpEditUrl = $variant->getCpEditUrl();

                if (!$cpEditUrl) {
                    $product = $variant->getProduct();

                    if ($product instanceof Product) {
                        $cpEditUrl = $product->getCpEditUrl();
                    }
                }
            }

            $tableData[] = [
                'title' => $log['email'],
                'email' => $log['email'],
                'variantId' => $variant ? [
                    'title' => $variant->title,
                    'cpEditUrl' => $cpEditUrl,
                ] : null,
                'locale' => $log['locale'],
                'isNotified' => $log['isNotified'],
                'dateCreated' => $dateCreated?->format($dateFormat) ?? null,
            ];
        }

        return $this->asJson([
            'pagination' => AdminTable::paginationLinks($page, $total, $limit),
            'data' => $tableData,
        ]);
    }


    // Private Methods
    // =========================================================================

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

    private function _applySort(Query $query, mixed $sort): void
    {
        if (!$sort) {
            return;
        }

        if (!is_array($sort) || !isset($sort[0]) || !is_array($sort[0])) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        $sortField = $sort[0]['sortField'] ?? null;
        $direction = $sort[0]['direction'] ?? null;

        if (!is_string($sortField) || !isset(self::SORT_FIELDS[$sortField]) || !is_string($direction)) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        $direction = strtolower($direction);

        if (!isset(self::SORT_DIRECTIONS[$direction])) {
            throw new BadRequestHttpException('The sort parameter is invalid.');
        }

        $query->orderBy([
            self::SORT_FIELDS[$sortField] => self::SORT_DIRECTIONS[$direction],
        ]);
    }
}
