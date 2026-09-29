<?php
namespace verbb\backinstock\services;

use verbb\backinstock\BackInStock;

use craft\commerce\elements\Variant;
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

    public function getDefaultSandboxedAllowedProperties(): array
    {
        return [
            // Subjects and template paths historically receive the live variant, so preserve its
            // readable property surface while the sandbox continues to restrict method calls.
            Variant::class => static fn(Variant $variant, string $property): bool => $variant->canGetProperty($property),
        ] + parent::getDefaultSandboxedAllowedProperties();
    }
}
