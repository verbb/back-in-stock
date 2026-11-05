<?php
namespace verbb\backinstock\controllers;

use verbb\backinstock\BackInStock;
use verbb\backinstock\models\Log;
use verbb\backinstock\models\Settings;
use verbb\backinstock\models\Subscription as SubscriptionModel;
use verbb\backinstock\queue\jobs\SendEmailNotification;
use verbb\backinstock\queue\jobs\SendSubscriptionMessage;
use verbb\backinstock\records\Subscription;

use Craft;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\web\Controller;
use craft\web\View;

use yii\web\Response;

use craft\commerce\elements\Variant;

class BaseController extends Controller
{
    // Properties
    // =========================================================================

    protected array|int|bool $allowAnonymous = ['register-interest', 'verify', 'cancel'];


    // Public Methods
    // =========================================================================

    public function beforeAction($action): bool
    {
        // The signed token authorises a cancellation, and email links often open where no CSRF cookie exists yet.
        if ($action->id === 'cancel') {
            $this->enableCsrfValidation = false;
        }

        return parent::beforeAction($action);
    }

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
                BackInStock::$plugin->getSubscriptions()->queueVerification($subscription);
            } elseif ($subscription && $settings->sendConfirmation) {
                Craft::$app->getQueue()->push(new SendSubscriptionMessage([
                    'subscriptionId' => $subscription->id,
                    'messageKey' => 'back_in_stock_confirmation',
                    'template' => $settings->getConfirmationEmailTemplate(),
                    'subject' => $settings->confirmationEmailSubject,
                ]));
            }
        } elseif ($pendingKey = $log->getPendingIdentityKey()) {
            // A customer whose link expired or never arrived would otherwise be locked out until the request expires.
            $subscription = Subscription::findOne(['pendingKey' => $pendingKey]);

            if ($subscription) {
                BackInStock::$plugin->getSubscriptions()->resendStaleVerification($subscription);
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
        $token = $this->request->getRequiredParam('verificationToken');
        $verified = is_numeric($id) && is_string($token) && BackInStock::$plugin->getSubscriptions()->verify((int)$id, $token);
        $message = $verified
            ? Craft::t('craft-commerce-back-in-stock', 'Your back-in-stock notification is confirmed.')
            : Craft::t('craft-commerce-back-in-stock', 'This verification link is invalid or has expired.');

        return $this->_lifecycleResponse($verified, $message);
    }

    public function actionCancel(): Response
    {
        $uid = $this->request->getRequiredParam('uid');
        $token = $this->request->getRequiredParam('cancellationToken');
        $subscription = is_string($uid) ? BackInStock::$plugin->getSubscriptions()->getByUid($uid) : null;

        if (!$subscription || !is_string($token) || !BackInStock::$plugin->getSubscriptions()->validateCancellationToken($subscription, $token)) {
            return $this->_lifecycleResponse(false, Craft::t('craft-commerce-back-in-stock', 'This cancellation link is invalid or has expired.'));
        }

        // Mail scanners follow links, so opening one must never change anything.
        if (!$this->request->getIsPost() && in_array($subscription->state, SubscriptionModel::ACTIVE_STATES, true)) {
            return $this->_lifecycleResponse(false, $this->_cancellationPrompt($subscription), true);
        }

        $cancelled = BackInStock::$plugin->getSubscriptions()->cancel($subscription);
        $message = match (true) {
            !$cancelled => Craft::t('craft-commerce-back-in-stock', 'This cancellation link is invalid or has expired.'),
            $subscription->state === SubscriptionModel::STATE_CANCELLED => Craft::t('craft-commerce-back-in-stock', 'Your back-in-stock notification has been cancelled.'),
            default => Craft::t('craft-commerce-back-in-stock', 'You won’t receive any more notifications for this product.'),
        };

        return $this->_lifecycleResponse($cancelled, $message);
    }


    // Private Methods
    // =========================================================================

    private function _cancellationPrompt(Subscription $subscription): string
    {
        $variant = BackInStock::$plugin->getService()->getLiveVariant($subscription->variantId, $subscription->siteId);

        return $variant
            ? Craft::t('craft-commerce-back-in-stock', 'Stop back-in-stock notifications for {title}?', ['title' => $variant->title])
            : Craft::t('craft-commerce-back-in-stock', 'Stop this back-in-stock notification?');
    }

    private function _lifecycleResponse(bool $success, string $message, bool $needsConfirmation = false): Response
    {
        if ($this->request->getAcceptsJson()) {
            return $this->asJson(['success' => $success, 'message' => $message] + ($needsConfirmation ? ['requiresPost' => true] : []));
        }

        if (!$success && !$needsConfirmation) {
            $this->response->setStatusCode(400);
        }

        // A redirect relies on the theme showing flash messages and on the homepage not being cached.
        $site = Craft::$app->getSites()->getCurrentSite();

        return $this->renderTemplate('craft-commerce-back-in-stock/lifecycle', [
            'language' => Craft::$app->language,
            'message' => $message,
            'needsConfirmation' => $needsConfirmation,
            'homeUrl' => $site->getBaseUrl(),
            'siteName' => $site->getName(),
        ], View::TEMPLATE_MODE_CP);
    }
}
