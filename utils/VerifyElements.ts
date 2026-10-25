import { Locator, expect } from '@playwright/test';
import { LoggerHelper } from './LoggerHelper'; // Var olan veya oluşturduğunuz logger sınıfınız

export class VerifyElements {
    private static TIMEOUT_MS = 5000; // Toplam bekleme süresi (5 saniye)
    private static POLLING_MS = 200;  // Kontrol aralığı (200 milisaniye)

    /**
     * Elementi 200ms aralıklarla 5 saniye boyunca ekranda görünür olana kadar bekler.
     */
    private static async waitForElement(elementLocator: Locator, description: string): Promise<boolean> {
        const startTime = Date.now();
        LoggerHelper.logInfo(`[BEKLENİYOR] '${description}' elementi aranıyor...`);

        while (Date.now() - startTime < this.TIMEOUT_MS) {
            try {
                const isVisible = await elementLocator.isVisible();
                if (isVisible) {
                    LoggerHelper.logSuccess(`[BULUNDU] '${description}' elementi ${Date.now() - startTime}ms içinde ekranda doğrulandı.`);
                    return true;
                }
            } catch (error) {
                // Hata durumunda döngü devam eder
            }

            // 200ms bekle ve tekrar kontrol et
            await new Promise((resolve) => setTimeout(resolve, this.POLLING_MS));
        }

        LoggerHelper.logError(`[HATA] '${description}' elementi ${this.TIMEOUT_MS}ms boyunca arandı fakat bulunamadı!`);
        return false;
    }

    /**
     * Butonun görünür ve tıklanabilir (active/enabled) olduğunu doğrular.
     */
    static async verifyButton(elementLocator: Locator, buttonName: string): Promise<boolean> {
        const isVisible = await this.waitForElement(elementLocator, buttonName);

        if (!isVisible) {
            return false;
        }

        const isEnabled = await elementLocator.isEnabled();
        if (isEnabled) {
            LoggerHelper.logSuccess(`[VERIFY SUCCESS] '${buttonName}' butonu görünür ve AKTİF (enabled) durumda.`);
            return true;
        } else {
            LoggerHelper.logError(`[VERIFY FAIL] '${buttonName}' butonu sayfada görünür fakat PASİF (disabled) durumda!`);
            return false;
        }
    }

    /**
     * Input / Textarea kutusunun görünür ve yazılabilir (editable) olduğunu doğrular.
     */
    static async verifyBox(elementLocator: Locator, boxName: string): Promise<boolean> {
        const isVisible = await this.waitForElement(elementLocator, boxName);

        if (!isVisible) {
            return false;
        }

        const isEditable = await elementLocator.isEditable();
        if (isEditable) {
            LoggerHelper.logSuccess(`[VERIFY SUCCESS] '${boxName}' kutusu görünür ve YAZILABİLİR durumda.`);
            return true;
        } else {
            LoggerHelper.logError(`[VERIFY FAIL] '${boxName}' kutusu görünür fakat KİLİTLİ / READONLY durumda!`);
            return false;
        }
    }

    /**
     * Herhangi bir metin alanının metnini doğrular.
     */
    static async verifyText(elementLocator: Locator, expectedText: string, elementName: string): Promise<boolean> {
        const isVisible = await this.waitForElement(elementLocator, elementName);

        if (!isVisible) {
            return false;
        }

        const actualText = await elementLocator.innerText();
        if (actualText.includes(expectedText)) {
            LoggerHelper.logSuccess(`[VERIFY SUCCESS] '${elementName}' metni doğrulandı. Beklenen: "${expectedText}", Alınan: "${actualText}"`);
            return true;
        } else {
            LoggerHelper.logError(`[VERIFY FAIL] '${elementName}' metni eşleşmedi! Beklenen: "${expectedText}", Alınan: "${actualText}"`);
            return false;
        }
    }
}