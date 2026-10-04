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
        $result = BackInStock::$plugin->getAvailability()->reconcile();
        $expired = BackInStock::$plugin->getSubscriptions()->expireStale();
        $purged = BackInStock::$plugin->getSubscriptions()->purgeHistory();

        $this->stdout(Craft::t('craft-commerce-back-in-stock', 'Evaluated {evaluated} variants, found {runs} available runs, expired {expired} subscriptions, and purged {purged} historical subscriptions.', [
            'evaluated' => $result['evaluated'],
            'runs' => $result['runs'],
            'expired' => $expired,
            'purged' => $purged,
        ]) . PHP_EOL);

        return ExitCode::OK;
    }
}
