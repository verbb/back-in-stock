<?php
namespace verbb\backinstock\tests\Integration;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Log;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\models\ProductType;
use craft\commerce\models\ProductTypeSite;
use craft\commerce\Plugin as Commerce;
use craft\enums\PropagationMethod;
use craft\helpers\Json;
use craft\models\FieldLayout;

use DateTime;
use PHPUnit\Framework\TestCase as BaseTestCase;
use yii\db\Transaction;

abstract class TestCase extends BaseTestCase
{
    // Properties
    // =========================================================================

    private ?Transaction $_transaction = null;
    private array $_settings = [];


    // Public Methods
    // =========================================================================

    protected function setUp(): void
    {
        parent::setUp();

        if (!Craft::$app || !BackInStock::$plugin || !Commerce::getInstance()) {
            self::fail('Craft, Commerce, and Back in Stock must be bootstrapped for integration tests.');
        }

        $this->_settings = BackInStock::$plugin->getSettings()->getAttributes();
        $this->_transaction = Craft::$app->getDb()->beginTransaction();
    }

    protected function tearDown(): void
    {
        try {
            if ($this->_transaction?->getIsActive()) {
                $this->_transaction->rollBack();
            }

            BackInStock::$plugin->getSettings()->setAttributes($this->_settings, false);
        } finally {
            parent::tearDown();
        }
    }


    // Protected Methods
    // =========================================================================

    protected function createVariant(int $stock = 0, ?FieldLayout $variantFieldLayout = null): Variant
    {
        $commerce = Commerce::getInstance();
        $site = Craft::$app->getSites()->getPrimarySite();
        $suffix = bin2hex(random_bytes(4));
        $type = new ProductType([
            'name' => 'Back in Stock Test ' . $suffix,
            'handle' => 'backInStockTest' . $suffix,
            'maxVariants' => 1,
            'hasProductTitleField' => true,
            'hasVariantTitleField' => true,
            'skuFormat' => null,
            'propagationMethod' => PropagationMethod::All,
        ]);
        $type->setSiteSettings([
            $site->id => new ProductTypeSite([
                'siteId' => $site->id,
                'hasUrls' => false,
                'enabledByDefault' => true,
            ]),
        ]);
        $type->getBehavior('productFieldLayout')->setFieldLayout(new FieldLayout(['type' => Product::class]));
        $type->getBehavior('variantFieldLayout')->setFieldLayout($variantFieldLayout ?? new FieldLayout(['type' => Variant::class]));

        if (!$commerce->getProductTypes()->saveProductType($type)) {
            self::fail('Unable to save the test product type: ' . Json::encode($type->getErrors()));
        }

        $product = new Product([
            'typeId' => $type->id,
            'siteId' => $site->id,
            'title' => 'Test product ' . $suffix,
            'slug' => 'test-product-' . $suffix,
            'postDate' => new DateTime(),
            'enabled' => true,
        ]);

        if (!Craft::$app->getElements()->saveElement($product)) {
            self::fail('Unable to save the test product: ' . Json::encode($product->getErrors()));
        }

        $variant = new Variant([
            'title' => 'Test variant',
            'siteId' => $site->id,
            'enabled' => true,
            'isDefault' => true,
            'inventoryTracked' => true,
            'availableForPurchase' => true,
        ]);
        $variant->setSku('BIS-TEST-' . strtoupper($suffix));
        $variant->setBasePrice(25);
        $variant->setOwnerId($product->id);
        $variant->setPrimaryOwnerId($product->id);

        if (!Craft::$app->getElements()->saveElement($variant)) {
            self::fail('Unable to save the test variant: ' . Json::encode($variant->getErrors()));
        }

        $commerce->getInventory()->updatePurchasableInventoryLevel($variant, $stock);

        return Variant::find()->id($variant->id)->siteId($site->id)->status(null)->one();
    }

    protected function createSubscription(Variant $variant, string $email): Subscription
    {
        $log = new Log([
            'variantId' => $variant->id,
            'siteId' => $variant->siteId,
            'locale' => Craft::$app->language,
        ]);
        $log->setEmail($email);

        self::assertTrue(BackInStock::$plugin->getLogs()->saveLog($log), Json::encode($log->getErrors()));

        $subscription = Subscription::findOne((int)$log->id);
        self::assertInstanceOf(Subscription::class, $subscription);

        return $subscription;
    }
}
