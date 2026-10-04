/**
 * Multiple Verbb plugins can register the same Plugin Kit elements on a Craft page.
 * Keep registration idempotent until Plugin Kit provides this guard itself.
 */
const registry = customElements;
const guardedRegistry = registry as typeof customElements & { __pkSafeDefine?: boolean };

if (!guardedRegistry.__pkSafeDefine) {
    const nativeDefine = registry.define.bind(registry);

    registry.define = ((name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions) => {
        if (!registry.get(name)) {
            nativeDefine(name, constructor, options);
        }
    }) as typeof customElements.define;

    guardedRegistry.__pkSafeDefine = true;
}
