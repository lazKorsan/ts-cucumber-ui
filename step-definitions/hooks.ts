import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(30 * 1000);

export let browser: Browser;
export let page: Page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

After(async function (scenario) {
    // Test başarısız olursa ekran görüntüsü alıp rapora ekler
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await page.screenshot({ type: 'png' });
        await this.attach(screenshot, 'image/png');
    }

    if (browser) {
        await browser.close();
    }
});