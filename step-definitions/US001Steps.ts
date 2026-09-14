import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';

import {HomePage} from '../pages/HomePage';
import {Config} from '../utils/config';
import ReasubleMethods from "../utils/ReasubleMethods";
import {ClickUtils, createClickUtils} from "../utils/clickUtils";
import {SendKeysUtils} from "../utils/SendKeysUtils";


Given('Student kullanicisi anaSayfaya gider', async function () {

    const homePage = new HomePage(this.page);
    await homePage.navigateTo(Config.baseUrl);
});

Given('Student kullanicisi url dogrular', async function () {

    await expect(this.page).toHaveURL(Config.baseUrl);
});

When('Student kullanicisi title ın {string} oldugunu dogrular', async function (expectedTitle: string) {
    // 3. homePage nesnesini this.page ile ilklendiriyoruz
    const homePage = new HomePage(this.page);
    const actualTitle = await homePage.getTitle();

    expect(actualTitle).toBe(expectedTitle);
});


Given(/^Student kullanicisi "([^"]*)" buttona tiklar$/, async function (buttonName: string) {

    const homePage = new HomePage(this.page);
    await homePage.getElementByName(buttonName).click()
});


Given(/^Student kullanicisi "([^"]*)" sayfasinda oldugunu dogrular$/, async function (expectedUrl: string) {


    // 2. verifyUrl doğrudan çağıralım
    await ReasubleMethods.verifyUrl(this.page, expectedUrl);
});


Given(/^Student kullanicisi "([^"]*)" kutusuna "([^"]*)" yazar$/, async function (elementName: string, envKey: string) {


    const homePage = new HomePage(this.page);

    // 1. .env dosyasından değeri çek, eğer .env içinde yoksa doğrudan tırnak içindeki değeri kullan
    const valueToFill = process.env[envKey] || envKey;

    if (!process.env[envKey]) {
        console.warn(`[UYARI] '${envKey}' anahtarı .env dosyasında bulunamadı, doğrudan metin olarak yazılıyor: "${envKey}"`);
    }

    // 2. Enum üzerinden ilgili kutuyu bul ve değeri yaz
    await homePage.getBoxByName(elementName).fill(valueToFill);
});
Given(/^Student kullanicisi clickUtils methodu ile "([^"]*)" buttona tiklar$/, async function (buttonName: string) {


    const homePage = new HomePage(this.page);

    // 1. Enum'dan Locator'ı çek
    const locator = homePage.getElementByName(buttonName);

    // 2. ClickUtils'in tüm akıllı özellikleriyle (scroll, hover, highlight, 8 aşamalı fallback) tıkla
    await ClickUtils.clickOnLocator(this.page, locator);


});
Given(/^Student kullanicisi sendKeys methodu ile "([^"]*)" baox kutusuna "([^"]*)" yazar$/, async function (elementName: string, envKey: string) {

    const homePage = new HomePage(this.page);
    const locator = homePage.getBoxByName(elementName);

    const valueToFill = process.env[envKey] || envKey;

    await SendKeysUtils.sendKeysOnLocator(this.page, locator, valueToFill);

});