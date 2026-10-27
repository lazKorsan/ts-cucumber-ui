import { Page, expect } from '@playwright/test';
import {HomePage} from "../pages/HomePage";


enum ConsoleColors {
    Blue = '\x1b[34m',
    Green = '\x1b[32m',
    Yellow = '\x1b[33m',
    Red = '\x1b[31m',
    Cyan = '\x1b[36m',
    Reset = '\x1b[0m',
    Bold = '\x1b[1m'
}

/**
 * Log seviyeleri
 */
enum LogLevel {
    INFO = 'ℹ️',
    SUCCESS = '✅',
    WARNING = '⚠️',
    ERROR = '❌',
    DEBUG = '🔍'
}

interface UrlVerifyOptions {
    timeout?: number;
    exactMatch?: boolean;
    screenshotOnFail?: boolean;
}



class ReasubleMethods {

    private log(message: string, level: LogLevel = LogLevel.INFO, color: ConsoleColors = ConsoleColors.Cyan): void {
        const separator = '═'.repeat(60);
        console.log(`${ConsoleColors.Bold}${color}${separator}${ConsoleColors.Reset}`);
        console.log(`${ConsoleColors.Bold}${color}${level} ${message}${ConsoleColors.Reset}`);
        console.log(`${ConsoleColors.Bold}${color}${separator}${ConsoleColors.Reset}`);
    }

    /**
     * Hata logu
     */
    private logError(message: string): void {
        console.log(`${ConsoleColors.Red}❌ ${message}${ConsoleColors.Reset}`);
    }

    /**
     * Başarı logu
     */
    private logSuccess(message: string): void {
        console.log(`${ConsoleColors.Green}✅ ${message}${ConsoleColors.Reset}`);
    }

    /**
     * Bilgi logu
     */
    public (message: string): void {
        console.log(`${ConsoleColors.Cyan}ℹ️ ${message}${ConsoleColors.Reset}`);
    }


    static async verifyUrl(page: Page, expectedUrl: string | RegExp, timeout: number = 5000) {
        if (!page) {
            throw new Error("[HATA] ReasubleMethods.verifyUrl metoduna 'page' nesnesi gönderilmedi!");
        }

        const regex = typeof expectedUrl === 'string' ? new RegExp(expectedUrl) : expectedUrl;

        await expect(page).toHaveURL(regex, { timeout });
    }

    static async wait(page: Page, seconds: number): Promise<void> {
        if (!page) {
            throw new Error("[HATA] ReasubleMethods.wait metoduna 'page' nesnesi gönderilmedi!");
        }

        // this.logInfo ve logSuccess metotları da static olduğu için bu şekilde logları da açabilirsiniz:
        //this.logInfo(`${seconds} saniye bekleniyor...`);

        // page: Page yapınca waitForTimeout hata vermeyi bırakacaktır
        await page.waitForTimeout(seconds * 1000);

        //this.logSuccess(`${seconds} saniyelik bekleme tamamlandı.`);
    }

    static logInfo(message: string): void {
        console.log(`[INFO] [${new Date().toISOString()}] - ${message}`);
    }

    /**
     * Hata logu basar
     */
    static logError(message: string, error?: any): void {
        console.error(`[ERROR] [${new Date().toISOString()}] - ${message}`, error ?? '');
    }

    /**
     * Uyarı logu basar
     */
    static logWarn(message: string): void {
        console.warn(`[WARN] [${new Date().toISOString()}] - ${message}`);
    }

    /**
     * Belirtilen element ismine sırasıyla Role, Text, Filter(hasText) ve XPath yöntemleriyle tıklamayı dener.
     * @param page Playwright Page nesnesi
     * @param elementName Tıklanacak elementin üzerindeki metin/isim
     */
    static async clickByName(page: Page, elementName: string): Promise<void> {
        if (!page) {
            this.logError("clickByName metoduna 'page' nesnesi gönderilmedi!");
            throw new Error("[HATA] ReasubleMethods.clickByName metoduna 'page' nesnesi gönderilmedi!");
        }

        const timeoutConfig = { timeout: 2000 }; // Her locator için maksimum 2 saniye deneme süresi
        this.logInfo(`'${elementName}' elementi için dinamik arama ve tıklama işlemi başlatıldı...`);

        // 1. İhtimal: getByRole (En yaygın element tiplerini tarar)
        const roles: Array<'button' | 'link' | 'heading' | 'tab'> = ['button', 'link', 'heading', 'tab'];
        for (const role of roles) {
            try {
                const locator = page.getByRole(role, { name: elementName, exact: false });
                if (await locator.first().isVisible()) {
                    await locator.first().click(timeoutConfig);
                    this.logInfo(`[BAŞARILI] '${elementName}' elementi getByRole('${role}') ile bulundu ve tıklandı.`);
                    return;
                }
            } catch (e) {
                // Görünür değilse veya tıklanamadıysa bir sonraki role geç
            }
        }

        // 2. İhtimal: getByText
        try {
            const locator = page.getByText(elementName, { exact: false });
            if (await locator.first().isVisible()) {
                await locator.first().click(timeoutConfig);
                this.logInfo(`[BAŞARILI] '${elementName}' elementi getByText() ile bulundu ve tıklandı.`);
                return;
            }
        } catch (e) {}

        // 3. İhtimal: filter({ hasText })
        try {
            const locator = page.locator('*').filter({ hasText: elementName });
            if (await locator.first().isVisible()) {
                await locator.first().click(timeoutConfig);
                this.logInfo(`[BAŞARILI] '${elementName}' elementi filter({ hasText }) ile bulundu ve tıklandı.`);
                return;
            }
        } catch (e) {}

        // 4. İhtimal: XPath ile normalize-space
        try {
            const xpathSelector = `//*[normalize-space(text())='${elementName}' or contains(normalize-space(text()), '${elementName}')]`;
            const locator = page.locator(xpathSelector);
            if (await locator.first().isVisible()) {
                await locator.first().click(timeoutConfig);
                this.logInfo(`[BAŞARILI] '${elementName}' elementi XPath yardımıyla bulundu ve tıklandı.`);
                return;
            }
        } catch (e) {}

        // Eğer hiçbir locator yöntemi başarılı olamadıysa hata fırlatır ve log basar
        const errorMessage = `'${elementName}' isimli element getByRole, getByText, hasText veya XPath yöntemlerinin hiçbiriyle bulunamadı veya tıklanamadı!`;
        this.logError(errorMessage);
        throw new Error(`❌ HATA: ${errorMessage}`);
    }





}

export default ReasubleMethods


export class logInfo {
}