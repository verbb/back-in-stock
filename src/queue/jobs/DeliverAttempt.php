<?php
namespace verbb\backinstock\queue\jobs;

use verbb\backinstock\BackInStock;

use Craft;
use craft\queue\BaseJob;

class DeliverAttempt extends BaseJob
{
    // Properties
    // =========================================================================

    public int $attemptId;


    // Public Methods
    // =========================================================================

    public function execute($queue): void
    {
        BackInStock::$plugin->getDelivery()->deliver($this->attemptId);
    }


    // Protected Methods
    // =========================================================================

    protected function defaultDescription(): ?string
    {
        return Craft::t('craft-commerce-back-in-stock', 'Sending a back-in-stock notification');
    }
}
