import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// 1. Element Selector'larını tutan Enum
export enum HomePageElements {
    LOGIN_BUTTON = '//a[@href="/login" and normalize-space(text())="Login"]',
    REGISTER_BUTTON = '//a[@href="/register" and normalize-space(text())="Register"]',
    EMAIL_BOX='//input[@id="email"]',
    PASSWORD_BOX='//input[@id="password"]',
    SUBMIT_BUTTON='//*[@id="app"]/div[3]/div/div[2]/div/form/button'
}

export enum HomePageBox {

    EMAIL_BOX='//input[@id="email"]',
    PASSWORD_BOX='//input[@id="password"]',
    SUBMIT_BUTTON='//*[@id="app"]/div[3]/div/div[2]/div/form/button'
}



export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page); // this.page burada tanımlanır
    }

    // Sayfaya gitme metodu
    async gotoHomePage() {
        await this.navigateTo('https://qa.instulearn.com/');
    }

    /**
     * Feature dosyasından gelen "Login" veya "Register" metnini
     * arka planda "LOGIN_BUTTON" formatına getirip ilgili Locator'ı döner.
     */
    getElementByName(elementName: string): Locator {
        let formattedKey = elementName.trim().toUpperCase().replace(/\s+/g, '_');

        if (!formattedKey.endsWith('_BUTTON')) {
            formattedKey += '_BUTTON';
        }

        const selector = HomePageElements[formattedKey as keyof typeof HomePageElements];

        if (!selector) {
            throw new Error(`[HATA] '${elementName}' (Aranan Enum Key: '${formattedKey}') HomePageElements içinde bulunamadı!`);
        }

        // constructor çalıştıktan sonra bu metod çağrıldığı için this.page artık hazır!
        return this.page.locator(selector);
    }


    getBoxByName(elementName: string): Locator {
        let formattedKey = elementName.trim().toUpperCase().replace(/\s+/g, '_');

        if (!formattedKey.endsWith('_BOX')) {
            formattedKey += '_BOX';
        }

        const selector = HomePageElements[formattedKey as keyof typeof HomePageElements];

        if (!selector) {
            throw new Error(`[HATA] '${elementName}' (Aranan Enum Key: '${formattedKey}') HomePageBox içinde bulunamadı!`);
        }

        // constructor çalıştıktan sonra bu metod çağrıldığı için this.page artık hazır!
        return this.page.locator(selector);
    }


}