<?php

use verbb\backinstock\BackInStock;
use verbb\backinstock\records\Log as LogRecord;

use craft\mail\Mailer;

uses(verbb\backinstock\tests\Integration\TestCase::class);

it('logs the recipient when the legacy mail path is rejected by the mailer', function() {
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'rejected@example.test');

    $logs = sendLegacyMailWith(new class extends Mailer {
        public function send($message): bool
        {
            return false;
        }
    }, LogRecord::findOne($subscription->id));

    expect($logs)->toContain('Back In Stock email “rejected@example.test” could not be sent');
});

it('logs the error when the legacy mail path throws', function() {
    $variant = $this->createVariant();
    $subscription = $this->createSubscription($variant, 'thrown@example.test');

    $logs = sendLegacyMailWith(new class extends Mailer {
        public function send($message): bool
        {
            throw new RuntimeException('Transport unavailable');
        }
    }, LogRecord::findOne($subscription->id));

    expect(implode("\n", $logs))->toMatch('/Back In Stock email could not be sent\. Error: Transport unavailable \S+:\d+/');
});

function sendLegacyMailWith(Mailer $mailer, LogRecord $log): array
{
    $originalMailer = Craft::$app->getMailer();
    $logger = Craft::getLogger();
    $offset = count($logger->messages);
    Craft::$app->set('mailer', $mailer);

    try {
        expect(BackInStock::$plugin->getService()->sendMail($log, 'Back in stock', 'craft-commerce-back-in-stock/emails/notification'))->toBeFalse();
    } finally {
        Craft::$app->set('mailer', $originalMailer);
    }

    return array_map('strval', array_column(array_slice($logger->messages, $offset), 0));
}
