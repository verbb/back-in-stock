import { defineScreenshotScenario } from '@verbb/craft-screenshots/api';

import { seedBackInStockFixture } from '../../support/fixtures';

let logsRoute = '/admin/back-in-stock/logs';

export default defineScreenshotScenario({
    id: 'back-in-stock-feature-tour-request-log',
    output: 'feature-tour/request-log.png',
    route: () => logsRoute,
    viewport: { width: 1320, height: 720, deviceScaleFactor: 2 },
    async setup(context) {
        logsRoute = (await seedBackInStockFixture(context)).logsRoute;
    },
    waitFor: [
        { type: 'loadState', state: 'networkidle' },
        { type: 'selector', selector: '#logs-vue-admin-table table', state: 'visible', timeout: 30000 },
        { type: 'text', text: 'maya.chen@example.com' },
        { type: 'text', text: 'Oatmeal / Large' },
    ],
    steps: [
        { type: 'evaluate', expression: 'document.activeElement?.blur(); window.scrollTo(0, 0);' },
        { type: 'wait', waitFor: { type: 'timeout', ms: 250 } },
    ],
    target: { type: 'selector', selector: '#logs-vue-admin-table .tablepane' },
    caption: 'Current notification requests, exact variants, locales and delivery state in the Craft control panel.',
    intent: 'Show the genuine Craft 5 Back in Stock request log populated with realistic demand.',
});
