<?php
namespace verbb\backinstock\tests\Unit;

use verbb\backinstock\events\SubscriptionStateEvent;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\records\Subscription;
use verbb\backinstock\services\Subscriptions;

use Closure;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class SubscriptionEventsTest extends TestCase
{
    // Static Methods
    // =========================================================================

    public static function stateTransitionScenarios(): array
    {
        return [
            'verification' => [
                SubscriptionModel::STATE_PENDING_VERIFICATION,
                SubscriptionModel::STATE_ACTIVE,
                'verification',
                fn(Subscriptions $service, TestSubscriptionRecord $subscription): bool => $service->activate($subscription),
            ],
            'recipient cancellation' => [
                SubscriptionModel::STATE_ACTIVE,
                SubscriptionModel::STATE_CANCELLED,
                'recipient',
                fn(Subscriptions $service, TestSubscriptionRecord $subscription): bool => $service->cancel($subscription),
            ],
            'successful delivery' => [
                SubscriptionModel::STATE_ACTIVE,
                SubscriptionModel::STATE_NOTIFIED,
                'delivery',
                fn(Subscriptions $service, TestSubscriptionRecord $subscription): bool => $service->markNotified($subscription),
            ],
        ];
    }


    // Public Methods
    // =========================================================================

    #[DataProvider('stateTransitionScenarios')]
    public function testSuccessfulStateTransitionsTriggerAnEvent(string $previousState, string $newState, string $source, Closure $transition): void
    {
        $service = new Subscriptions();
        $subscription = new TestSubscriptionRecord(['state' => $previousState]);
        $capturedEvent = null;

        $service->on(Subscriptions::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE, function(SubscriptionStateEvent $event) use (&$capturedEvent): void {
            $capturedEvent = $event;
        });

        self::assertTrue($transition($service, $subscription));
        self::assertInstanceOf(SubscriptionStateEvent::class, $capturedEvent);
        self::assertSame($subscription, $capturedEvent->subscription);
        self::assertSame($previousState, $capturedEvent->previousState);
        self::assertSame($newState, $capturedEvent->newState);
        self::assertSame($newState, $subscription->state);
        self::assertSame($source, $capturedEvent->source);
    }

    public function testFailedStateTransitionDoesNotTriggerAnEvent(): void
    {
        $service = new Subscriptions();
        $subscription = new TestSubscriptionRecord([
            'state' => SubscriptionModel::STATE_ACTIVE,
            'saveResult' => false,
        ]);
        $eventCount = 0;

        $service->on(Subscriptions::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE, function() use (&$eventCount): void {
            $eventCount++;
        });

        self::assertFalse($service->markNotified($subscription));
        self::assertSame(0, $eventCount);
    }

    public function testOnlyActiveSubscriptionsCanBeMarkedAsNotified(): void
    {
        $service = new Subscriptions();
        $subscription = new TestSubscriptionRecord(['state' => SubscriptionModel::STATE_CANCELLED]);
        $eventCount = 0;

        $service->on(Subscriptions::EVENT_AFTER_CHANGE_SUBSCRIPTION_STATE, function() use (&$eventCount): void {
            $eventCount++;
        });

        self::assertFalse($service->markNotified($subscription));
        self::assertSame(SubscriptionModel::STATE_CANCELLED, $subscription->state);
        self::assertSame(0, $eventCount);
    }
}

class TestSubscriptionRecord extends Subscription
{
    // Properties
    // =========================================================================

    public string $state;
    public bool $saveResult = true;
    public mixed $verifiedAt = null;
    public mixed $verificationTokenHash = 'token';
    public mixed $verificationExpiresAt = 'expiry';
    public bool $isNotified = false;
    public mixed $activeKey = 'active';
    public mixed $pendingKey = 'pending';
    public mixed $cancelledAt = null;
    public mixed $cancelSource = null;
    public mixed $notifiedAt = null;


    // Public Methods
    // =========================================================================

    public function save($runValidation = true, $attributeNames = null): bool
    {
        return $this->saveResult;
    }
}
