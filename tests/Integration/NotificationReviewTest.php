<?php

use verbb\backinstock\BackInStock;
use verbb\backinstock\controllers\DashboardController;
use verbb\backinstock\models\DeliveryAttempt as DeliveryAttemptModel;
use verbb\backinstock\models\Settings;
use verbb\backinstock\records\DeliveryAttempt;
use verbb\backinstock\records\RestockRun;

use craft\commerce\elements\Variant;
use craft\commerce\Plugin as Commerce;

use Symfony\Component\Mailer\Transport;

use yii\mail\BaseMailer;
use yii\mail\MailEvent;

uses(verbb\backinstock\tests\Integration\TestCase::class);

function deliverWithMailResult(int $attemptId, bool $accepted): void
{
    $mailer = Craft::$app->getMailer();
    $mailer->setTransport(Transport::fromDsn('null://null'));
    $handler = function(MailEvent $event) use ($accepted): void {
        $event->isValid = $accepted;
    };
    $mailer->on(BaseMailer::EVENT_BEFORE_SEND, $handler);

    try {
        BackInStock::$plugin->getDelivery()->deliver($attemptId);
    } finally {
        $mailer->off(BaseMailer::EVENT_BEFORE_SEND, $handler);
    }
}

function latestAttempt(RestockRun $run): DeliveryAttempt
{
    return DeliveryAttempt::find()->where(['runId' => $run->id])->orderBy(['attemptNumber' => SORT_DESC])->one();
}

function reviewCountsFor(Variant $variant): ?array
{
    $controller = new DashboardController('dashboard', BackInStock::$plugin);

    return (new ReflectionMethod($controller, '_reviewCounts'))->invoke($controller)[(int)$variant->id] ?? null;
}

beforeEach(function() {
    $settings = BackInStock::$plugin->getSettings();
    $settings->notificationPolicy = Settings::NOTIFICATION_POLICY_ALL;
    $settings->batchDelay = 0;
    $settings->requireVerification = false;
    $settings->sendConfirmation = false;
    // No automatic retry, so every failure stays until someone acts on it.
    $settings->maximumAttempts = 1;
});

it('retries failed sends on request and keeps a reviewed notification off the review list until it fails again', function() {
    $delivery = BackInStock::$plugin->getDelivery();
    $variant = $this->createVariant();
    $this->createSubscription($variant, 'review-retry@example.test');
    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 1);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);

    deliverWithMailResult((int)latestAttempt($run)->id, false);
    $run->refresh();

    expect($run->failedCount)->toBe(1)
        ->and($delivery->needsReview($run))->toBeTrue()
        ->and(reviewCountsFor($variant))->toBe(['failed' => 1, 'unknown' => 0]);

    $delivery->markReviewed($run);
    $run->refresh();

    expect($delivery->needsReview($run))->toBeFalse()
        ->and(reviewCountsFor($variant))->toBeNull()
        ->and($delivery->retryFailed($run))->toBe(1)
        // A second request before the queued attempt runs finds nothing new to retry.
        ->and($delivery->retryFailed($run))->toBe(0);

    $retry = latestAttempt($run);
    expect($retry->attemptNumber)->toBe(2)
        ->and($retry->status)->toBe(DeliveryAttemptModel::STATUS_PENDING);

    // Stored dates have one-second precision, so let this failure land after the review.
    sleep(1);
    deliverWithMailResult((int)$retry->id, false);
    $run->refresh();

    expect($run->reviewedAt)->toBeNull()
        ->and(reviewCountsFor($variant))->toBe(['failed' => 1, 'unknown' => 0]);

    $delivery->retryFailed($run);
    deliverWithMailResult((int)latestAttempt($run)->id, true);
    $run->refresh();

    expect($run->failedCount)->toBe(0)
        ->and($run->sentCount)->toBe(1)
        ->and($delivery->needsReview($run))->toBeFalse();
});

it('never retries unconfirmed sends or subscribers who are no longer waiting', function() {
    $delivery = BackInStock::$plugin->getDelivery();
    $variant = $this->createVariant();
    $unconfirmed = $this->createSubscription($variant, 'review-unconfirmed@example.test');
    $cancelled = $this->createSubscription($variant, 'review-cancelled@example.test');
    Commerce::getInstance()->getInventory()->updatePurchasableInventoryLevel($variant, 5);
    $run = BackInStock::$plugin->getAvailability()->evaluate((int)$variant->id, (int)$variant->siteId);

    DeliveryAttempt::updateAll(['status' => DeliveryAttemptModel::STATUS_UNKNOWN], ['runId' => $run->id, 'subscriptionId' => $unconfirmed->id]);
    DeliveryAttempt::updateAll(['status' => DeliveryAttemptModel::STATUS_FAILED], ['runId' => $run->id, 'subscriptionId' => $cancelled->id]);
    BackInStock::$plugin->getSubscriptions()->cancel($cancelled);

    expect($delivery->getRetryableAttempts($run))->toBe([])
        ->and($delivery->retryFailed($run))->toBe(0);
});
