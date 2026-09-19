import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ScreenshotSetupContext } from '@verbb/craft-screenshots/types';

type BackInStockFixture = {
    formRoute: string;
    logsRoute: string;
    emailRoute: string;
    requestCount: number;
};

const supportDir = dirname(fileURLToPath(import.meta.url));
const seedScript = readFileSync(join(supportDir, 'seed', 'seed-back-in-stock.php'), 'utf8');

/** Seed a sold-out Commerce variant, notification requests and real template previews. */
export async function seedBackInStockFixture(context: ScreenshotSetupContext): Promise<BackInStockFixture> {
    const output = await context.runCraftScript(seedScript, { label: 'seed-back-in-stock' });
    const fixture = JSON.parse(output.trim()) as BackInStockFixture;

    if (!fixture.formRoute || !fixture.logsRoute || !fixture.emailRoute || fixture.requestCount < 6) {
        throw new Error(`Invalid Back in Stock fixture payload: ${output}`);
    }

    return fixture;
}
