<?php

require_once __DIR__ . '/bootstrap.php';

$app = require CRAFT_VENDOR_PATH . '/craftcms/cms/bootstrap/console.php';
$app->setEdition(\craft\enums\CmsEdition::Pro);
$plugins = $app->getPlugins();

foreach (['commerce', 'craft-commerce-back-in-stock'] as $handle) {
    $plugin = $plugins->getPlugin($handle);

    if (!$app->getIsInstalled() || !$plugin || !$plugins->isPluginInstalled($handle) || !$plugins->isPluginEnabled($handle) || $plugins->isPluginUpdatePending($plugin)) {
        throw new RuntimeException('Fresh plugin installation is incomplete: ' . $handle);
    }
}

$source = (new ReflectionClass($plugins->getPlugin('craft-commerce-back-in-stock')))->getFileName();

if (!str_starts_with(realpath($source), realpath(dirname(__DIR__, 2) . '/src') . '/')) {
    throw new RuntimeException('Craft loaded a different Back in Stock checkout.');
}
