<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;

use verbb\base\services\Templates as BaseTemplates;

class Templates extends BaseTemplates
{
    // Properties
    // =========================================================================

    public string $pluginClass = BackInStock::class;
    public string|false|null $sandboxedAutoescape = false;


    // Public Methods
    // =========================================================================

    public function getSandboxedVariables(): array
    {
        return $this->getSiteTemplateVariables();
    }
}
