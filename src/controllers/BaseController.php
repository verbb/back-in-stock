<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;
use verbb\backinstock\queue\jobs\SendEmailNotification;
use verbb\backinstock\queue\jobs\SendSubscriptionMessage;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\web\Controller;

use yii\web\Response;

use craft\commerce\elements\Variant;

class BaseController extends Controller
{
    // Properties
    // =========================================================================

    protected array|int|bool $allowAnonymous = ['register-interest', 'verify', 'cancel'];


    // Public Methods
    // =========================================================================

    public function actionRegisterInterest(): ?Response
    {
        $this->requirePostRequest();

        $session = Craft::$app->getSession();

        $log = new Log();
        $log->variantId = $this->request->getParam('variantId');
        $email = $this->request->getParam('email');
        $log->email = is_string($email) ? $email : null;
        $log->setOptionsFromRequest($this->request->getParam('options'));
        $log->locale = Craft::$app->language;
        $log->siteId = Craft::$app->getSites()->getCurrentSite()->id;

        BackInStock::$plugin->getService()->enforceRegistrationRateLimit($log->getEmail());

        $wasSaved = BackInStock::$plugin->getLogs()->saveLog($log);

        if (!$wasSaved && !$log->getHasOnlyDuplicateError()) {
            $error = array_values($log->getErrors())[0][0] ?? Craft::t('craft-commerce-back-in-stock', 'Sorry you couldn‘t be added to the notifications list.');

            BackInStock::error(Json::encode($log->getErrors()));

            if ($this->request->getAcceptsJson()) {
                return $this->asJson([
                    'success' => false,
                    'error' => $error,
                ]);
            }

            $session->setError($error);

            return null;
        }

        // A duplicate receives the same public success response without creating more mail work.
        if ($wasSaved) {
            $settings = BackInStock::$plugin->getSettings();
            $subscription = Subscription::findOne($log->id);

            if ($subscription && $settings->requireVerification) {
                $token = BackInStock::$plugin->getSubscriptions()->prepareVerification($subscription);
                Craft::$app->getQueue()->push(new SendSubscriptionMessage([
                    'subscriptionId' => $subscription->id,
                    'messageKey' => 'back_in_stock_verification',
                    'verificationToken' => $token,
                ]));
            } elseif ($subscription && $settings->sendConfirmation) {
                Craft::$app->getQueue()->push(new SendSubscriptionMessage([
                    'subscriptionId' => $subscription->id,
                    'messageKey' => 'back_in_stock_confirmation',
                    'template' => $settings->getConfirmationEmailTemplate(),
                    'subject' => $settings->confirmationEmailSubject,
                ]));
            }
        }

        $successMessage = BackInStock::$plugin->getSettings()->requireVerification
            ? Craft::t('craft-commerce-back-in-stock', 'Check your email to confirm the notification request for {title}.', ['title' => $log->getVariant()->title])
            : Craft::t('craft-commerce-back-in-stock', '{email} will be notified when {title} is available.', ['email' => $log->email, 'title' => $log->getVariant()->title]);

        if ($this->request->getAcceptsJson()) {
            return $this->asJson([
                'success' => true,
                'message' => $successMessage,
                'state' => BackInStock::$plugin->getSettings()->requireVerification ? 'pendingVerification' : 'active',
            ]);
        }

        $session->setFlash('notice', $successMessage);

        return $this->redirectToPostedUrl();
    }

    public function actionVerify(): Response
    {
        $id = $this->request->getRequiredParam('id');
        $token = $this->request->getRequiredParam('token');
        $verified = is_numeric($id) && is_string($token) && BackInStock::$plugin->getSubscriptions()->verify((int)$id, $token);
        $message = $verified
            ? Craft::t('craft-commerce-back-in-stock', 'Your back-in-stock notification is confirmed.')
            : Craft::t('craft-commerce-back-in-stock', 'This verification link is invalid or has expired.');

        return $this->_lifecycleResponse($verified, $message);
    }

    public function actionCancel(): Response
    {
        $uid = $this->request->getRequiredParam('uid');
        $token = $this->request->getRequiredParam('token');
        $subscription = is_string($uid) ? BackInStock::$plugin->getSubscriptions()->getByUid($uid) : null;
        $cancelled = $subscription && is_string($token) && BackInStock::$plugin->getSubscriptions()->validateCancellationToken($subscription, $token)
            ? BackInStock::$plugin->getSubscriptions()->cancel($subscription)
            : false;
        $message = $cancelled
            ? Craft::t('craft-commerce-back-in-stock', 'Your back-in-stock notification has been cancelled.')
            : Craft::t('craft-commerce-back-in-stock', 'This cancellation link is invalid or has expired.');

        return $this->_lifecycleResponse($cancelled, $message);
    }


    // Private Methods
    // =========================================================================

    private function _lifecycleResponse(bool $success, string $message): Response
    {
        if ($this->request->getAcceptsJson()) {
            return $this->asJson(['success' => $success, 'message' => $message]);
        }

        Craft::$app->getSession()->setFlash($success ? 'notice' : 'error', $message);

        return $this->redirect(Craft::$app->getSites()->getCurrentSite()->getBaseUrl());
    }
}
