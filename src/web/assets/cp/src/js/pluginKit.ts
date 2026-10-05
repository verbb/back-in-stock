import '@verbb/plugin-kit-web/plugin-kit.css';

import { PkButton } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import { PkIcon } from '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { PkInput } from '@verbb/plugin-kit-web/components/input/pk-input.js';
import { PkOption } from '@verbb/plugin-kit-web/components/select/pk-option.js';
import { PkSelect } from '@verbb/plugin-kit-web/components/select/pk-select.js';
import { PkStatus } from '@verbb/plugin-kit-web/components/status/pk-status.js';
import {
    arrowLeft,
    arrowRight,
    circleCheck,
    circleExclamation,
    clock,
    eye,
    lock,
    magnifyingGlass,
    registerIcons,
    triangleExclamation,
} from '@verbb/plugin-kit-icons';

registerIcons({
    arrowLeft,
    arrowRight,
    circleCheck,
    circleExclamation,
    clock,
    eye,
    lock,
    magnifyingGlass,
    triangleExclamation,
});

const constructors = [PkButton, PkIcon, PkInput, PkOption, PkSelect, PkStatus] as const;

export function registerPluginKit(): void {
    for (const constructor of constructors) {
        if (typeof constructor !== 'function') {
            throw new Error('Back in Stock Plugin Kit constructor missing from bundle.');
        }
    }
}
