<?php
namespace verbb\backinstock\models;

use Craft;
use craft\base\Model;
use craft\helpers\App;

class Settings extends Model
{
    // Constants
    // =========================================================================

    public const NOTIFICATION_POLICY_ALL = 'all';
    public const NOTIFICATION_POLICY_STOCK_MATCHED = 'stockMatched';


    // Properties
    // =========================================================================

    public string $pluginName = 'Back in Stock';
    public bool $hasCpSection = true;
    public int $stockThreshold = 0;
    public ?string $stockFieldHandle = null;
    public bool $includeAvailableForPurchase = false;
    public bool $sendConfirmation = false;
    public ?string $confirmationEmailTemplate = null;
    public string $confirmationEmailSubject = 'Back in stock notification confirmation for {{ variant.title }}';
    public ?string $emailTemplate = null;
    public string $emailSubject = 'Order today, {{ variant.title }} is now in stock';
    public bool $purgeRequests = false;
    public ?string $fromEmail = null;
    public ?string $fromName = null;
    public string $notificationPolicy = self::NOTIFICATION_POLICY_STOCK_MATCHED;
    public int $subscribersPerUnit = 1;
    public int $batchSize = 100;
    public int $batchDelay = 60;
    public int $maximumAttempts = 3;
    public bool $requireVerification = false;
    public int $verificationWindow = 48;
    public int $pendingExpiry = 7;
    public int $activeExpiry = 365;
    public int $historyRetention = 90;


    // Public Methods
    // =========================================================================

    public function defineRules(): array
    {
        $rules = parent::defineRules();
        $rules[] = [['pluginName'], 'trim'];
        $rules[] = [['pluginName'], 'required'];
        $rules[] = [['pluginName'], 'string', 'max' => 52];
        $rules[] = [['stockFieldHandle'], 'trim'];
        $rules[] = [['stockFieldHandle'], 'match', 'pattern' => '/^[a-zA-Z_][a-zA-Z0-9_]*$/'];
        $rules[] = [['stockThreshold'], 'number', 'integerOnly' => true];
        $rules[] = [['notificationPolicy'], 'in', 'range' => [self::NOTIFICATION_POLICY_ALL, self::NOTIFICATION_POLICY_STOCK_MATCHED]];
        $rules[] = [['subscribersPerUnit', 'batchSize', 'batchDelay', 'maximumAttempts', 'verificationWindow', 'pendingExpiry', 'activeExpiry', 'historyRetention'], 'number', 'integerOnly' => true, 'min' => 0];
        $rules[] = [['subscribersPerUnit', 'batchSize', 'maximumAttempts', 'verificationWindow', 'pendingExpiry', 'activeExpiry'], 'number', 'integerOnly' => true, 'min' => 1];

        return $rules;
    }

    public function getFromEmail(): ?string
    {
        $settings = Craft::$app->getProjectConfig()->get('email');

        return App::parseEnv($this->fromEmail) ?? App::parseEnv($settings['fromEmail']);
    }

    public function getFromName(): ?string
    {
        $settings = Craft::$app->getProjectConfig()->get('email');

        return App::parseEnv($this->fromName) ?? App::parseEnv($settings['fromName']);
    }

    public function getConfirmationEmailTemplate(): ?string
    {
        return App::parseEnv($this->confirmationEmailTemplate);
    }

    public function getEmailTemplate(): ?string
    {
        return App::parseEnv($this->emailTemplate);
    }
}
