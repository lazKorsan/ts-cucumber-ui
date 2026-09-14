import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';

setDefaultTimeout(30 * 1000);

let browser: Browser;

Before(async function () {
    // 1. Tarayıcıyı başlatıyoruz
    browser = await chromium.launch({ headless: false });

    // 2. Yeni bir bağlam ve sayfa açıyoruz
    const context: BrowserContext = await browser.newContext();

    // 3. KRİTİK NOKTA: Sayfayı Cucumber'ın "this" (World) nesnesine atıyoruz!
    this.page = await context.newPage();
});

After(async function (scenario) {
    // Test başarısız olursa ekran görüntüsü alıp rapora ekler
    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({ type: 'png' });
        await this.attach(screenshot, 'image/png');
    }

    // Her senaryo bittiğinde açık olan sayfayı ve tarayıcıyı kapatıyoruz
    if (this.page) {
        await this.page.close();
    }
    if (browser) {
        await browser.close();
    }
});