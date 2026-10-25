import { Page, Dialog } from '@playwright/test';
import { LoggerHelper } from './LoggerHelper';

export class AlertUtils {
    /**
     * Açılacak olan ilk Alert'ü otomatik onaylar (Accept / OK) ve mesajını döndürür.
     */
    static acceptAlertOnNextTrigger(page: Page): void {
        page.once('dialog', async (dialog: Dialog) => {
            LoggerHelper.logInfo(`[ALERT ALINDI] Tip: ${dialog.type()}, Mesaj: "${dialog.message()}"`);
            await dialog.accept();
            LoggerHelper.logSuccess(`[ALERT ACCEPTED] Alert başarıyla onaylandı.`);
        });
    }

    /**
     * Açılacak olan ilk Alert'ü reddeder (Dismiss / Cancel).
     */
    static dismissAlertOnNextTrigger(page: Page): void {
        page.once('dialog', async (dialog: Dialog) => {
            LoggerHelper.logInfo(`[ALERT ALINDI] Tip: ${dialog.type()}, Mesaj: "${dialog.message()}"`);
            await dialog.dismiss();
            LoggerHelper.logWarn(`[ALERT DISMISSED] Alert iptal edildi.`);
        });
    }

    /**
     * Prompt tipindeki Alert kutusuna metin yazıp onaylar.
     */
    static sendPromptText(page: Page, text: string): void {
        page.once('dialog', async (dialog: Dialog) => {
            LoggerHelper.logInfo(`[PROMPT ALINDI] Mesaj: "${dialog.message()}"`);
            await dialog.accept(text);
            LoggerHelper.logSuccess(`[PROMPT ACCEPTED] Prompt kutusuna "${text}" yazıldı ve onaylandı.`);
        });
    }
}