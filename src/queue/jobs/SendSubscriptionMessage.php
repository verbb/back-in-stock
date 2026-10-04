<?php
namespace verbb\backinstock\queue\jobs;

use verbb\backinstock\BackInStock;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\queue\BaseJob;

class SendSubscriptionMessage extends BaseJob
{
    // Properties
    // =========================================================================

    public int $subscriptionId;
    public string $messageKey;
    public ?string $template = null;
    public ?string $subject = null;
    public ?string $verificationToken = null;


    // Public Methods
    // =========================================================================

    public function execute($queue): void
    {
        $subscription = Subscription::findOne($this->subscriptionId);

        if (!$subscription) {
            return;
        }

        $variables = [];

        if ($this->verificationToken) {
            $variables['verifyUrl'] = BackInStock::$plugin->getSubscriptions()->getVerificationUrl($subscription, $this->verificationToken);
        }

        BackInStock::$plugin->getService()->sendSubscriptionMessage(
            $subscription,
            $this->messageKey,
            $this->template,
            $this->subject,
            $variables,
        );
    }


    // Protected Methods
    // =========================================================================

    protected function defaultDescription(): ?string
    {
        return Craft::t('craft-commerce-back-in-stock', 'Sending a back-in-stock subscription email');
    }
}
