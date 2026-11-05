<?php
namespace verbb\backinstock\tests\Unit;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\RestockRun;
use verbb\backinstock\models\Settings;
use verbb\backinstock\services\Service;
use verbb\backinstock\variables\BackInStockVariable;

use craft\commerce\elements\Variant;
use craft\errors\InvalidFieldException;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use yii\base\InvalidConfigException;

class StockSourceTest extends TestCase
{
    private ?BackInStock $originalPlugin;
    private Settings $settings;
    private Service $service;

    protected function setUp(): void
    {
        require_once dirname(__DIR__, 2) . '/vendor/craftcms/cms/src/Craft.php';

        $this->originalPlugin = BackInStock::$plugin;
        $this->settings = new Settings();
        $this->service = new Service();
        $plugin = $this->getMockBuilder(BackInStock::class)->disableOriginalConstructor()->onlyMethods(['getSettings', 'getService'])->getMock();
        $plugin->method('getSettings')->willReturn($this->settings);
        $plugin->method('getService')->willReturn($this->service);
        BackInStock::$plugin = $plugin;
    }

    public function testTwigVariableFollowsTheCustomStockSource(): void
    {
        $this->settings->stockFieldHandle = 'warehouseStock';
        $variant = $this->getMockBuilder(Variant::class)->disableOriginalConstructor()->onlyMethods(['getFieldValue'])->getMock();
        $variant->method('getFieldValue')->willReturnOnConsecutiveCalls(0, 4);
        // Unlimited Commerce stock would report hasStock() as true for both values.
        $variant->inventoryTracked = false;
        $variable = new BackInStockVariable();

        self::assertFalse($variable->isVariantInStock($variant));
        self::assertTrue($variable->isVariantInStock($variant));
    }

    public function testObservedStockSnapshotFitsTheColumn(): void
    {
        self::assertNull(RestockRun::observedStockSnapshot(null));
        self::assertSame(5, RestockRun::observedStockSnapshot(5));
        self::assertSame(-1, RestockRun::observedStockSnapshot(-1));
        self::assertSame(2147483647, RestockRun::observedStockSnapshot(3000000000));
        self::assertSame(-2147483648, RestockRun::observedStockSnapshot(-3000000000));
    }

    protected function tearDown(): void
    {
        BackInStock::$plugin = $this->originalPlugin;
    }

    #[DataProvider('stockValues')]
    public function testCustomStockOverridesUnlimitedCommerceInventory(mixed $value, int $expectedStock, bool $available): void
    {
        $this->settings->stockFieldHandle = 'warehouseStock';
        $variant = $this->getMockBuilder(Variant::class)->disableOriginalConstructor()->onlyMethods(['getFieldValue', 'getStock', 'getHasUnlimitedStock'])->getMock();
        $variant->expects(self::never())->method('getStock');
        $variant->expects(self::never())->method('getHasUnlimitedStock');
        $variant->method('getFieldValue')->with('warehouseStock')->willReturn($value);
        $variant->inventoryTracked = false;

        self::assertSame($expectedStock, $this->service->getVariantStock($variant));
        self::assertSame($available, $this->service->isVariantInStock($variant));
    }

    public static function stockValues(): array
    {
        return [
            'zero' => [0, 0, false],
            'positive' => [3, 3, true],
            'numeric string' => ['2', 2, true],
            'negative' => [-1, -1, false],
            'empty' => [null, 0, false],
            'empty string' => ['', 0, false],
            'fractional units' => ['2.9', 2, true],
            'less than a unit' => [0.9, 0, false],
        ];
    }

    #[DataProvider('invalidValues')]
    public function testInvalidStockCannotFallBackToNativeInventory(mixed $value): void
    {
        $this->settings->stockFieldHandle = 'warehouseStock';
        $this->settings->stockThreshold = -10;
        $variant = $this->getMockBuilder(Variant::class)->disableOriginalConstructor()->onlyMethods(['getFieldValue'])->getMock();
        $variant->method('getFieldValue')->willReturn($value);
        $variant->inventoryTracked = false;

        self::assertFalse($this->service->isVariantInStock($variant));
        $this->expectException(InvalidConfigException::class);
        $this->service->getVariantStock($variant);
    }

    public static function invalidValues(): array
    {
        return [['unknown'], [true], [[]], [new \stdClass()], [INF], [NAN], ['1e100']];
    }

    public function testMissingFieldIsUnavailableEvenWithANegativeThreshold(): void
    {
        $this->settings->stockFieldHandle = 'missingField';
        $this->settings->stockThreshold = -10;
        $variant = $this->getMockBuilder(Variant::class)->disableOriginalConstructor()->onlyMethods(['getFieldValue'])->getMock();
        $variant->method('getFieldValue')->willThrowException(new InvalidFieldException('missingField'));

        self::assertFalse($this->service->isVariantInStock($variant));
    }

    public function testCustomStockHonoursThresholdAndPurchaseAvailability(): void
    {
        $this->settings->stockFieldHandle = 'warehouseStock';
        $this->settings->stockThreshold = 2;
        $variant = $this->getMockBuilder(Variant::class)->disableOriginalConstructor()->onlyMethods(['getFieldValue'])->getMock();
        $variant->method('getFieldValue')->willReturn(2);
        $variant->availableForPurchase = false;

        self::assertFalse($this->service->isVariantInStock($variant));
        $this->settings->stockThreshold = 1;
        self::assertTrue($this->service->isVariantInStock($variant));
        $this->settings->includeAvailableForPurchase = true;
        self::assertFalse($this->service->isVariantInStock($variant));
        $variant->availableForPurchase = true;
        self::assertTrue($this->service->isVariantInStock($variant));
    }

    public function testNativeStockRemainsTheDefault(): void
    {
        $variant = $this->getMockBuilder(Variant::class)->disableOriginalConstructor()->onlyMethods(['getFieldValue', 'getStock'])->getMock();
        $variant->expects(self::never())->method('getFieldValue');
        $variant->method('getStock')->willReturn(3);
        $variant->inventoryTracked = true;

        self::assertSame(3, $this->service->getVariantStock($variant));
        self::assertTrue($this->service->isVariantInStock($variant));
        $this->settings->stockThreshold = 3;
        self::assertFalse($this->service->isVariantInStock($variant));
        $variant->inventoryTracked = false;
        self::assertNull($this->service->getVariantStock($variant));
        self::assertTrue($this->service->isVariantInStock($variant));
        $this->settings->stockFieldHandle = ' ';
        self::assertNull($this->service->getVariantStock($variant));
    }
}
