<?php
namespace verbb\backinstock\console\controllers;

use verbb\backinstock\BackInStock;

use Craft;
use yii\console\Controller;
use yii\console\ExitCode;

class ReconcileController extends Controller
{
    // Public Methods
    // =========================================================================

    public function actionIndex(): int
    {
        $recovered = BackInStock::$plugin->getDelivery()->recoverStalled();
        $result = BackInStock::$plugin->getAvailability()->reconcile();
        $expired = BackInStock::$plugin->getSubscriptions()->expireStale();
        $purged = BackInStock::$plugin->getSubscriptions()->purgeHistory();

        $this->stdout(Craft::t('craft-commerce-back-in-stock', 'Requeued {requeued} and flagged {interrupted} stalled delivery attempts, evaluated {evaluated} variants, found {runs} available runs, expired {expired} subscriptions, and purged {purged} historical subscriptions.', [
            'requeued' => $recovered['requeued'],
            'interrupted' => $recovered['interrupted'],
            'evaluated' => $result['evaluated'],
            'runs' => $result['runs'],
            'expired' => $expired,
            'purged' => $purged,
        ]) . PHP_EOL);

        return ExitCode::OK;
    }
}
