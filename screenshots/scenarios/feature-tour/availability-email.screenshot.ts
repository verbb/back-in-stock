import { defineScreenshotScenario } from '@verbb/craft-screenshots/api';

import { seedBackInStockFixture } from '../../support/fixtures';

let emailRoute = '/';

export default defineScreenshotScenario({
    id: 'back-in-stock-feature-tour-availability-email',
    output: 'feature-tour/availability-email.png',
    route: () => emailRoute,
    viewport: { width: 900, height: 760, deviceScaleFactor: 2 },
    async setup(context) {
        emailRoute = (await seedBackInStockFixture(context)).emailRoute;
    },
    waitFor: [
        { type: 'loadState', state: 'networkidle' },
        { type: 'selector', selector: '.email-wrapper', state: 'visible', timeout: 30000 },
        { type: 'text', text: 'View Product' },
    ],
    target: { type: 'clip', x: 80, y: 0, width: 740, height: 500 },
    caption: 'The bundled availability email rendered with the exact Commerce variant that returned to stock.',
    intent: 'Show the real Back in Stock notification template rather than a generic email mockup.',
});
