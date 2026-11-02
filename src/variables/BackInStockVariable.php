<?php
namespace verbb\backinstock\variables;

use verbb\backinstock\BackInStock;

use craft\commerce\elements\Variant;

class BackInStockVariable
{
    // Public Methods
    // =========================================================================

    public function getPlugin(): BackInStock
    {
        return BackInStock::$plugin;
    }

    public function getPluginName(): string
    {
        return BackInStock::$plugin->getPluginName();
    }

    public function isVariantInStock(Variant $variant): bool
    {
        return BackInStock::$plugin->getService()->isVariantInStock($variant);
    }

}
