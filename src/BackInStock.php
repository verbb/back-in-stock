<?php
namespace verbb\backinstock;

use verbb\backinstock\base\PluginTrait;
use verbb\backinstock\models\Settings;
use verbb\backinstock\variables\BackInStockVariable;

use Craft;
use craft\base\Element;
use craft\base\Plugin;
use craft\events\ModelEvent;
use craft\events\RegisterEmailMessagesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\helpers\UrlHelper;
use craft\web\twig\variables\CraftVariable;
use craft\web\UrlManager;
use craft\services\Gc;
use craft\services\SystemMessages;
use craft\services\UserPermissions;

use yii\base\Event;

use craft\commerce\elements\Variant;
use craft\commerce\events\InventoryMovementEvent;
use craft\commerce\events\UpdateInventoryLevelEvent;
use craft\commerce\services\Inventory;

class BackInStock extends Plugin
{
    // Constants
    // =========================================================================

    public const PERMISSION_MANAGE_SUBSCRIPTIONS = 'backInStock-manageSubscriptions';
    public const PERMISSION_MANAGE_NOTIFICATIONS = 'backInStock-manageNotifications';


    // Properties
    // =========================================================================

    public bool $hasCpSection = true;
    public bool $hasCpSettings = true;
    public string $schemaVersion = '1.5.2';


    // Traits
    // =========================================================================

    use PluginTrait;


    // Public Methods
    // =========================================================================

    public function init(): void
    {
        parent::init();

        self::$plugin = $this;

        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'verbb\\backinstock\\console\\controllers';
        }

        $this->_registerVariables();
        $this->_registerCraftEventListeners();
        $this->_registerSystemMessages();
        $this->_registerPermissions();

        if (Craft::$app->getRequest()->getIsCpRequest()) {
            $this->_registerCpRoutes();
        }

        $this->hasCpSection = $this->getSettings()->hasCpSection;
    }

    public function getPluginName(): string
    {
        return Craft::t('craft-commerce-back-in-stock', $this->getSettings()->pluginName);
    }

    public function getCpNavItem(): array
    {
        $nav = parent::getCpNavItem();

        $nav['label'] = $this->getPluginName();
        $nav['url'] = 'back-in-stock';

        if (Craft::$app->getUser()->checkPermission('accessPlugin-craft-commerce-back-in-stock')) {
            $nav['subnav']['overview'] = [
                'label' => Craft::t('craft-commerce-back-in-stock', 'Overview'),
                'url' => 'back-in-stock',
            ];
            $nav['subnav']['products'] = [
                'label' => Craft::t('craft-commerce-back-in-stock', 'Products'),
                'url' => 'back-in-stock/products',
            ];
        }

        if (Craft::$app->getUser()->getIsAdmin() && Craft::$app->getConfig()->getGeneral()->allowAdminChanges) {
            $nav['subnav']['settings'] = [
                'label' => Craft::t('craft-commerce-back-in-stock', 'Settings'),
                'url' => 'back-in-stock/settings',
            ];
        }

        return $nav;
    }

    public function getSettingsResponse(): mixed
    {
        return Craft::$app->getResponse()->redirect(UrlHelper::cpUrl('back-in-stock/settings'));
    }


    // Protected Methods
    // =========================================================================

    protected function createSettingsModel(): Settings
    {
        return new Settings();
    }


    // Private Methods
    // =========================================================================

    private function _registerCpRoutes(): void
    {
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_CP_URL_RULES, function(RegisterUrlRulesEvent $event) {
            $event->rules['back-in-stock'] = 'craft-commerce-back-in-stock/dashboard/overview';
            $event->rules['back-in-stock/overview'] = 'craft-commerce-back-in-stock/dashboard/overview-redirect';
            $event->rules['back-in-stock/products'] = 'craft-commerce-back-in-stock/dashboard/products';
            $event->rules['back-in-stock/products/<variantId:\d+>/activity/<runId:\d+>'] = 'craft-commerce-back-in-stock/dashboard/activity-detail';
            $event->rules['back-in-stock/products/<variantId:\d+>/activity'] = 'craft-commerce-back-in-stock/dashboard/product-activity';
            $event->rules['back-in-stock/products/<variantId:\d+>'] = 'craft-commerce-back-in-stock/dashboard/product';
            $event->rules['back-in-stock/subscriptions'] = 'craft-commerce-back-in-stock/dashboard/subscriptions';
            $event->rules['back-in-stock/history'] = 'craft-commerce-back-in-stock/dashboard/history';
            $event->rules['back-in-stock/history/<runId:\\d+>'] = 'craft-commerce-back-in-stock/dashboard/history-detail';
            $event->rules['back-in-stock/notifications'] = 'craft-commerce-back-in-stock/dashboard/notifications';
            $event->rules['back-in-stock/notifications/activity'] = 'craft-commerce-back-in-stock/dashboard/activity';
            $event->rules['back-in-stock/notifications/activity/<runId:\\d+>'] = 'craft-commerce-back-in-stock/dashboard/notification-detail';
            $event->rules['back-in-stock/logs'] = 'craft-commerce-back-in-stock/dashboard/subscriptions';
            $event->rules['back-in-stock/settings'] = 'craft-commerce-back-in-stock/plugin/settings';
            $event->rules['back-in-stock/settings/<settingsNavItem:{handle}>'] = 'craft-commerce-back-in-stock/plugin/settings';
        });
    }

    private function _registerVariables(): void
    {
        Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function(Event $event) {
            $event->sender->set('backInStock', BackInStockVariable::class);
        });
    }

    private function _registerCraftEventListeners(): void
    {
        if (defined(Inventory::class . '::EVENT_AFTER_EXECUTE_UPDATE_INVENTORY_LEVEL')) {
            Event::on(Inventory::class, Inventory::EVENT_AFTER_EXECUTE_UPDATE_INVENTORY_LEVEL, function(UpdateInventoryLevelEvent $event) {
                $this->getService()->checkInventoryLevel($event);
            });
        }

        // Completed orders and other stock moves reduce availability without an inventory-level event.
        if (defined(Inventory::class . '::EVENT_AFTER_EXECUTE_INVENTORY_MOVEMENT')) {
            Event::on(Inventory::class, Inventory::EVENT_AFTER_EXECUTE_INVENTORY_MOVEMENT, function(InventoryMovementEvent $event) {
                $this->getService()->checkInventoryMovement($event);
            });
        }

        // Unlimited stock and some CP edits update the variant without an inventory-level event (Commerce 5).
        Event::on(Variant::class, Element::EVENT_AFTER_SAVE, function(ModelEvent $event) {
            if (!$event->sender instanceof Variant || !$event->sender->id) {
                return;
            }

            $this->getService()->syncVariantStockState($event->sender);
        });

        // Keeps retention and stalled-delivery recovery working on sites that never schedule the reconcile command.
        Event::on(Gc::class, Gc::EVENT_RUN, function() {
            $this->getDelivery()->recoverStalled();
            $this->getSubscriptions()->expireStale();
            $this->getSubscriptions()->purgeHistory();
        });
    }

    private function _registerPermissions(): void
    {
        Event::on(UserPermissions::class, UserPermissions::EVENT_REGISTER_PERMISSIONS, function(RegisterUserPermissionsEvent $event) {
            $event->permissions[] = [
                'heading' => $this->getPluginName(),
                'permissions' => [
                    self::PERMISSION_MANAGE_SUBSCRIPTIONS => ['label' => Craft::t('craft-commerce-back-in-stock', 'Cancel subscriptions and erase subscriber data')],
                    self::PERMISSION_MANAGE_NOTIFICATIONS => ['label' => Craft::t('craft-commerce-back-in-stock', 'Retry failed notifications and mark notifications as reviewed')],
                ],
            ];
        });
    }

    private function _registerSystemMessages(): void
    {
        Event::on(SystemMessages::class, SystemMessages::EVENT_REGISTER_MESSAGES, function(RegisterEmailMessagesEvent $event) {
            $event->messages[] = [
                'key' => 'back_in_stock_confirmation',
                'heading' => Craft::t('craft-commerce-back-in-stock', 'When someone joins a back-in-stock list'),
                'subject' => Craft::t('craft-commerce-back-in-stock', 'You’re on the list for {{ variant.title }}'),
                'body' => Craft::t('craft-commerce-back-in-stock', "Thanks for your interest in {{ variant.title }}. We’ll let you know when it is available again.\n\n[Cancel this notification]({{ cancelUrl }})"),
            ];
            $event->messages[] = [
                'key' => 'back_in_stock_verification',
                'heading' => Craft::t('craft-commerce-back-in-stock', 'When someone needs to verify a back-in-stock subscription'),
                'subject' => Craft::t('craft-commerce-back-in-stock', 'Confirm your notification for {{ variant.title }}'),
                'body' => Craft::t('craft-commerce-back-in-stock', "Confirm that you want to hear when {{ variant.title }} is available again.\n\n[Confirm notification]({{ verifyUrl }})\n\nIf you did not make this request, you can ignore this email."),
            ];
            $event->messages[] = [
                'key' => 'back_in_stock_available',
                'heading' => Craft::t('craft-commerce-back-in-stock', 'When a subscribed product is available again'),
                'subject' => Craft::t('craft-commerce-back-in-stock', '{{ variant.title }} is back in stock'),
                'body' => Craft::t('craft-commerce-back-in-stock', "{{ variant.title }} is available again.\n\n[View product]({{ variant.url }})\n\n[Cancel this notification]({{ cancelUrl }})"),
            ];
        });
    }
}
