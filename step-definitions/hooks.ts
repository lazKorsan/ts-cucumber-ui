import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';

setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;


BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false,
        args: [
            '--start-maximized',
            '--remote-allow-origins=*',
            '--disable-notifications',
            '--disable-popup-blocking',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-extensions',
            '--disable-blink-features=AutomationControlled',
            '--force-device-scale-factor=1.0',
            '--disable-search-engine-choice-screen'
        ]
    });

    context = await browser.newContext({
        viewport: null
    });
});


Before(async function () {
    this.page = await context.newPage();
});


After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({ type: 'png' });
        await this.attach(screenshot, 'image/png');
    }

    if (this.page) {
        await this.page.close();
    }
});


AfterAll(async function () {
    if (context) {
        await context.close();
    }
    if (browser) {
        await browser.close();
    }
});