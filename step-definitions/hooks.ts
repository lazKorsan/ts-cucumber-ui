import {Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status, BeforeStep, AfterStep} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { LoggerHelper } from '../utils/LoggerHelper';

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




Before(async function (scenario) {
    // 1. Chrome Argümanları ve Başlangıç Ayarları
    if (!browser) {
        browser = await chromium.launch({
            headless: false, // Tarayıcıyı görünür açar
            args: [
                '--start-maximized',                      // Tam ekran başlatır
                '--disable-notifications',                // Bildirimleri kapatır
                '--disable-popup-blocking',               // Pop-up engellemeyi kapatır
                '--disable-dev-shm-usage',                // Bellek optimizasyonu
                '--no-sandbox',                           // Linux/CI güvenliği
                '--disable-extensions',                   // Eklentileri kapatır
                '--disable-blink-features=AutomationControlled', // Otomasyon uyarısını gizler
                '--force-device-scale-factor=1.0',        // Ekran ölçeğini %100 yapar
                '--disable-search-engine-choice-screen',   // Chrome arama motoru seçim ekranını kapatır
                '--disable-features=Translate', // Çeviri özelliğini tamamen devre dışı bırakır
                '--lang=tr-TR'
            ]
        });
    }

    // 2. Her Ebat/Ekran Çözünürlüğünde Birebir Aynı Olması İçin:
    this.context = await browser.newContext({
        viewport: null,
        locale: 'tr-TR', // Tarayıcı locale ayarını Türkçe yapar
        extraHTTPHeaders: {
            'Accept-Language': 'tr-TR,tr;q=0.9' // HTTP isteklerindeki dil tercihini Türkçe yapar
        }
    });

    this.page = await this.context.newPage();
});
After(async function () {
    // Her senaryo sonunda sayfayı ve context'i kapatıyoruz
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
});


AfterAll(async function () {
    if (context) {
        await context.close();
    }
    if (browser) {
        await browser.close();
    }
});


let stepCounter = 0;

Before(async function (scenario) {
    stepCounter = 0;

    // Tag'leri çekiyoruz
    const tags = scenario.pickle.tags.map(t => t.name).join(', ') || 'Tag Yok';

    // Feature dosyasının adını çekiyoruz (Örn: US002VerifyElement.feature)
    const featureFilePath = scenario.pickle.uri;
    const featureFileName = featureFilePath.split('/').pop()?.split('\\').pop() || 'Unknown Feature';

    // LoggerHelper'a 3 parametreyi de gönderiyoruz
    LoggerHelper.logScenarioStart(scenario.pickle.name, tags, featureFileName);
});

BeforeStep(function (step) {
    stepCounter++; // Adım sayısını 1 artır
    // KRİTİK NOKTA: stepCounter'ı ikinci argüman olarak metoda gönderiyoruz!
    LoggerHelper.logStep(step.pickleStep.text, stepCounter);
});

AfterStep(function (step) {
    if (step.result?.status === Status.FAILED) {
        LoggerHelper.logError(`Step Başarısız Oldu -> ${step.pickleStep.text}`);
    }
});

After(async function (scenario) {
    const isPassed = scenario.result?.status === Status.PASSED;
    LoggerHelper.logScenarioEnd(scenario.pickle.name, isPassed);
});