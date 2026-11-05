<?php
namespace verbb\backinstock\queue\jobs;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\queue\BaseJob;

use yii\base\Exception;

class SendSubscriptionMessage extends BaseJob
{
    // Properties
    // =========================================================================

    public int $subscriptionId;
    public string $messageKey;
    public ?string $template = null;
    public ?string $subject = null;


    // Public Methods
    // =========================================================================

    public function execute($queue): void
    {
        $subscription = Subscription::findOne($this->subscriptionId);

        if (!$subscription) {
            return;
        }

        // A request cancelled or erased while this waited has nothing left to say, and may no longer have an address.
        if (!in_array($subscription->state, SubscriptionModel::ACTIVE_STATES, true)) {
            return;
        }

        $subscriptions = BackInStock::$plugin->getSubscriptions();
        $isVerification = $this->messageKey === 'back_in_stock_verification';
        $variables = [];

        if ($isVerification) {
            // The customer may have confirmed or cancelled from an earlier email while this waited in the queue.
            if ($subscription->state !== SubscriptionModel::STATE_PENDING_VERIFICATION) {
                return;
            }

            $variables['verifyUrl'] = $subscriptions->getVerificationUrl($subscription, $subscriptions->prepareVerification($subscription));
        }

        $result = BackInStock::$plugin->getService()->sendSubscriptionMessage(
            $subscription,
            $this->messageKey,
            $this->template,
            $this->subject,
            $variables,
        );

        // Without this, resubmitting the form would keep answering "check your email" for a message that never left.
        if ($isVerification && in_array($result['status'], [DeliveryAttemptModel::STATUS_FAILED, DeliveryAttemptModel::STATUS_UNKNOWN], true)) {
            $subscriptions->markVerificationUndelivered($subscription);
        }

        if ($result['status'] === DeliveryAttemptModel::STATUS_FAILED) {
            throw new Exception("Back in Stock message {$this->messageKey} failed for subscription {$subscription->id}: {$result['message']}");
        }
    }


    // Protected Methods
    // =========================================================================

    protected function defaultDescription(): ?string
    {
        return Craft::t('craft-commerce-back-in-stock', 'Sending a back-in-stock subscription email');
    }
}
