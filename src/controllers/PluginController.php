<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Settings;

use craft\web\Controller;

use yii\web\Response;

class PluginController extends Controller
{
    // Public Methods
    // =========================================================================

    public function actionSettings(): Response
    {
        /* @var Settings $settings */
        $settings = BackInStock::$plugin->getSettings();

        return $this->renderTemplate('craft-commerce-back-in-stock/settings', [
            'settings' => $settings,
        ]);
    }

}
