<?php
namespace verbb\backinstock\queue\jobs;

use verbb\backinstock\BackInStock;

use Craft;
use craft\queue\BaseJob;

class EvaluateAvailability extends BaseJob
{
    // Properties
    // =========================================================================

    public int $variantId;
    public int $siteId;


    // Public Methods
    // =========================================================================

    public function execute($queue): void
    {
        BackInStock::$plugin->getAvailability()->evaluate($this->variantId, $this->siteId);
    }


    // Protected Methods
    // =========================================================================

    protected function defaultDescription(): ?string
    {
        return Craft::t('craft-commerce-back-in-stock', 'Evaluating back-in-stock availability');
    }
}
