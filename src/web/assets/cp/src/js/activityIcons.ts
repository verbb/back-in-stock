import type { PkIcon } from '@verbb/plugin-kit-icons';

// Expanded outline paths use the registry's fill-only contract, without changing
// shared glyphs or reaching into pk-icon's shadow DOM.
export const activityIcons = {
    'bis-subscription-created': {
        width: 24,
        height: 24,
        path: 'M9 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 12c-4.42 0-8 3.13-8 7v3h1.5v-3c0-3.04 2.91-5.5 6.5-5.5 1.57 0 3.01.47 4.14 1.26l.86-1.23A8.8 8.8 0 0 0 9 12Zm9-1v4h-4v1.5h4v4h1.5v-4h4V15h-4v-4Z',
    },
    'bis-verification-pending': {
        width: 24,
        height: 24,
        path: 'M7 10V7a5 5 0 0 1 10 0v3h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1Zm1.5 0h7V7a3.5 3.5 0 0 0-7 0v3ZM6 11.5A1.5 1.5 0 0 0 4.5 13v6A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H6Zm5.25 3h1.5v4h-1.5Z',
    },
    'bis-subscription-verified': {
        width: 24,
        height: 24,
        path: 'M12 1 3 5v7c0 5 4 9 9 11 5-2 9-6 9-11V5l-9-4Zm0 1.65 7.5 3.32V12c0 4.12-3.28 7.62-7.5 9.37C7.78 19.62 4.5 16.12 4.5 12V5.97L12 2.65ZM8.06 11.44 7 12.5l3.5 3.5L17 9.5l-1.06-1.06-5.44 5.44Z',
    },
    'bis-notification-sent': {
        width: 24,
        height: 24,
        path: 'M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H4Zm0 1.5h16c.38 0 .73.14 1 .37L12 12.5 3 5.87c.27-.23.62-.37 1-.37ZM2.5 7.36l9.5 6.99 9.5-6.99V17a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7.36Z',
    },
    'bis-notification-review': {
        width: 24,
        height: 24,
        path: 'M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h9v-1.5H4A1.5 1.5 0 0 1 2.5 17V7.36l9.5 6.99 9.5-6.99V13H23V7a3 3 0 0 0-3-3H4Zm0 1.5h16c.38 0 .73.14 1 .37L12 12.5 3 5.87c.27-.23.62-.37 1-.37Zm12.06 9.44L15 16l2.44 2.44L15 20.88l1.06 1.06 2.44-2.44 2.44 2.44L22 20.88l-2.44-2.44L22 16l-1.06-1.06-2.44 2.44Z',
    },
    'bis-activity': {
        width: 24,
        height: 24,
        path: 'M12 1a11 11 0 1 1 0 22 11 11 0 0 1 0-22Zm0 1.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm-.75 3.5v6.44l4.97 2.87.75-1.3-4.22-2.44V6Z',
    },
} satisfies Record<string, PkIcon>;
