import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import {Config} from '../utils/config';


import {LoggerHelper} from "../utils/LoggerHelper";

import {HeaderPage} from "../pages/HeaderPage";
import {VerifyElements} from "../utils/VerifyElements";
import {ClickUtils} from "../utils/ClickUtils";
import ReasubleMethods from "../utils/ReasubleMethods";
import {SendKeysUtils} from "../utils/SendKeysUtils";

Given('Header kullanicisi anaSayfaya gider', async function () {

   const headerPage = new HeaderPage(this.page);
   await headerPage.navigateTo(Config.baseUrl);

});

When(/^Header kullanicisi title ın "([^"]*)" oldugunu dogrular$/, async function (expectedTitle: string) {
    const headerPage = new HeaderPage(this.page);
    const actualTitle = await headerPage.getTitle();

    LoggerHelper.logInfo(actualTitle);
    // Hardcoded string yerine parametreyi kullan!
    expect(actualTitle).toBe(expectedTitle);
});

Given(/^Header kullanicisi "([^"]*)" butonun aktif oldugunu dogrular$/, async function (elementName: string) {

    const headerPage = new HeaderPage(this.page);

    const buttonLocator = headerPage.getHeaderElement(elementName);
    const isVerified = await VerifyElements.verifyButton(buttonLocator, elementName);
    if (!isVerified) {
        throw new Error(`[TEST FAILED] '${elementName}' butonunun aktif olduğu doğrulanamadı!`);
    }




});
Given(/^Header kullanicisi "([^"]*)" butona tiklar$/, async function (elementName: string) {

    const headerPage = new HeaderPage(this.page);
    const clickUtils = new ClickUtils(this.page);

    // smartClick: Önce enum'a bakar, bulamazsa metin ile tıklar
    const isClicked = await ClickUtils.smartClick(
        this.page,
        elementName,
        () => headerPage.getHeaderElement(elementName),
        { highlight: true }
    );

    if (!isClicked) {
        throw new Error(`[TEST FAILED] '${elementName}' butonuna tıklama başarısız oldu!`);
    }

    LoggerHelper.logInfo(`Header kullanıcısı "${elementName}" butonuna tıkladı.`);


});


Given(/^Header kullanicisi "([^"]*)" sayfasinda oldugunu dogrular$/, async function (expectedUrl: string) {


    await ReasubleMethods.verifyUrl(this.page, expectedUrl);



});
Given(/^Header kullanicisi "([^"]*)" kutusuna "([^"]*)" yazar$/, async function (elementName: string, mail: string) {


    const headerPage = new HeaderPage(this.page);


    const isSent = await SendKeysUtils.smartSendKeys(
        this.page,
        elementName,
        mail,
        () => headerPage.getHeaderElement(elementName)
    );

    if (!isSent) {
        throw new Error(`[TEST FAILED] '${elementName}' kutusuna '${mail}' yazılamadı!`);
    }

    LoggerHelper.logInfo(`"${elementName}" kutusuna "${mail}" yazıldı.`);




});