import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Örnek Element Tanımlamaları (Locator)
    readonly loginButton = this.page.locator('text=Login');

    async gotoHomePage() {
        await this.navigateTo('https://qa.instulearn.com/');
    }
}