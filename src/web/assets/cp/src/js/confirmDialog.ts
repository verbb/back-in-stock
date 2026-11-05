import type { PkButton } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import type { PkDialog } from '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';

type ConfirmOptions = {
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    destructive?: boolean;
};

/**
 * Asks for confirmation in a Plugin Kit dialog, resolving `false` however the dialog is dismissed.
 * The dialog is removed afterwards so repeated row actions never stack hidden dialogs in the page.
 */
export function confirmAction(options: ConfirmOptions): Promise<boolean> {
    const dialog = document.createElement('pk-dialog') as PkDialog;
    dialog.label = options.title;

    const message = document.createElement('p');
    message.className = 'bis-dialog-message';
    message.textContent = options.message;

    const cancel = document.createElement('pk-button') as PkButton;
    cancel.slot = 'footer';
    cancel.textContent = options.cancelLabel;

    const confirm = document.createElement('pk-button') as PkButton;
    confirm.slot = 'footer';
    confirm.variant = 'primary';
    confirm.textContent = options.confirmLabel;

    if (options.destructive) {
        confirm.classList.add('bis-button-destructive');
    }

    dialog.append(message, cancel, confirm);
    document.body.append(dialog);

    return new Promise(resolve => {
        let confirmed = false;

        cancel.addEventListener('click', () => void dialog.hide('api'));
        confirm.addEventListener('click', () => {
            confirmed = true;
            void dialog.hide('api');
        });
        // Escape, the close button and backdrop clicks all end here, as well as the two buttons.
        dialog.addEventListener('pk-after-hide', () => {
            dialog.remove();
            resolve(confirmed);
        }, { once: true });

        void dialog.show();
    });
}
