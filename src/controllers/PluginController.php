<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Settings;

use Craft;
use craft\helpers\UrlHelper;
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

    public function actionSavePluginSettings(): ?Response
    {
        $this->requirePostRequest();
        $this->requireAdmin();

        $settings = Craft::$app->getRequest()->getBodyParam('settings', []);
        $plugin = BackInStock::$plugin;

        if (!Craft::$app->getPlugins()->savePluginSettings($plugin, $settings)) {
            Craft::$app->getSession()->setError(Craft::t('app', "Couldn't save plugin settings."));

            // Send the plugin back to the template
            Craft::$app->getUrlManager()->setRouteParams([
                'plugin' => $plugin,
            ]);

            return null;
        }

        Craft::$app->getSession()->setNotice(Craft::t('app', 'Plugin settings saved.'));

        return $this->redirectToPostedUrl();
    }
}
