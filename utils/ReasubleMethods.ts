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

}

export default ReasubleMethods


export class logInfo {
}