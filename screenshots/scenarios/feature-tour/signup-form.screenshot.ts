import { defineScreenshotScenario } from '@verbb/craft-screenshots/api';

import { seedBackInStockFixture } from '../../support/fixtures';

let formRoute = '/';

export default defineScreenshotScenario({
    id: 'back-in-stock-feature-tour-signup-form',
    output: 'feature-tour/signup-form.png',
    route: () => formRoute,
    viewport: { width: 1120, height: 640, deviceScaleFactor: 2 },
    async setup(context) {
        formRoute = (await seedBackInStockFixture(context)).formRoute;
    },
    waitFor: [
        { type: 'loadState', state: 'networkidle' },
        { type: 'text', text: 'Harbour linen throw' },
        { type: 'text', text: 'Email me when this exact option is back' },
    ],
    target: { type: 'selector', selector: '.card' },
    caption: 'A project-owned signup form tied to the exact sold-out product variant a customer selected.',
    intent: 'Show how Back in Stock fits a polished storefront while using the plugin’s real registration action and variant data.',
});
