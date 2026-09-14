import { Page, expect } from '@playwright/test';

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
    private logInfo(message: string): void {
        console.log(`${ConsoleColors.Cyan}ℹ️ ${message}${ConsoleColors.Reset}`);
    }


    static async verifyUrl(page: Page, expectedUrl: string | RegExp, timeout: number = 5000) {
        if (!page) {
            throw new Error("[HATA] ReasubleMethods.verifyUrl metoduna 'page' nesnesi gönderilmedi!");
        }

        const regex = typeof expectedUrl === 'string' ? new RegExp(expectedUrl) : expectedUrl;

        await expect(page).toHaveURL(regex, { timeout });
    }

}

export default ReasubleMethods




