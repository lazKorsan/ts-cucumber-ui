import {Given} from "@cucumber/cucumber";
import {Config} from "../utils/config";
import {MarsPage} from "../pages/MarsPage";
import {LoggerHelper} from "../utils/LoggerHelper";
import {ClickUtils} from "../utils/ClickUtils";
import ReasubleMethods from "../utils/ReasubleMethods";
import {SendKeysUtils} from "../utils/SendKeysUtils";
import {HomePage} from "../pages/HomePage";
import {AccountStorageHelper} from "../utils/AccountStorageHelper";


Given('Mars kullanicisi ana sayfaya gider', async function () {

    const marsPage = new MarsPage(this.page);
    await marsPage.navigateTo(Config.baseUrl);
    LoggerHelper.logInfo("Mars kullanicisi ana sayfaya gider");

});


Given(/^Mars kullanicisi "([^"]*)" butona tiklar$/, async function (elementName: string) {

    const marsPage = new MarsPage(this.page);
    const clickUtils = new ClickUtils(this.page);

    // smartClick: Önce enum'a bakar, bulamazsa metin ile tıklar
    const isClicked = await ClickUtils.smartClick(
        this.page,
        elementName,
        () => marsPage.getElementByName(elementName),
        {highlight: true}
    );

    if (!isClicked) {
        throw new Error(`[TEST FAILED] '${elementName}' butonuna tıklama başarısız oldu!`);
    }

    LoggerHelper.logInfo(`Mars kullanıcısı "${elementName}" butonuna tıkladı.`);


});


Given(/^Mars kullanicisi "([^"]*)" sayfasinda oldugunu dogrular$/, async function (expectedUrl: string) {

    // 2. verifyUrl doğrudan çağıralım
    await ReasubleMethods.verifyUrl(this.page, expectedUrl);

});


Given(/^Mars kullanicisi "([^"]*)" box kutusuna "([^"]*)" yazar$/, async function (elementName: string, text: string) {

    const marsPage = new MarsPage(this.page);


    const isSent = await SendKeysUtils.smartSendKeys(
        this.page,
        elementName,
        text,
        () => marsPage.getElementByName(elementName)
    );

    if (!isSent) {
        throw new Error(`[TEST FAILED] '${elementName}' kutusuna '${text}' yazılamadı!`);
    }

    LoggerHelper.logInfo(`"${elementName}" kutusuna "${text}" yazıldı.`);


});
Given(/^Mars kullanicisi sozlesme sartlarini kabul eder$/, async function () {
    const marsPage = new MarsPage(this.page);
    await this.page.getByText('I agree with terms & rules').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);

    // JavaScript ile tıkla
    await this.page.evaluate(() => {
        // Tüm label'ları bul
        const allLabels = document.querySelectorAll('label');

        // Her label'ı kontrol et
        allLabels.forEach(label => {
            const text = label.textContent || '';
            if (text.includes('I agree with terms') || text.includes('terms & rules')) {
                label.click();
                console.log('✅ Checkbox tıklandı!');
            }
        });
    });

    console.log('✅ Test tamamlandı!');

});
Given(/^Mars kullanicisi "([^"]*)" ismi ve "([^"]*)" sifresi ile kayit olusturur$/, async function (name: string, password: string) {

    const marsPage = new MarsPage(this.page);

    await ClickUtils.clickByName(this.page, "Register");

    // 1. Mail Box
    // Not: SendKeysUtils veya getElementByName asenkron ise await eklenmelidir.

    // 11111 ile 99999 arasında rastgele 5 haneli sayı üretme
    const randomNumber = Math.floor(Math.random() * (99999 - 11111 + 1)) + 11111;
    const dynamicEmail = `ahmet.student.${randomNumber}@InstuLearn.com`;
    // randomli sayiyi kod icinde kullanım
    const mailElement = await marsPage.getElementByName("register mail");
    await SendKeysUtils.sendKeysOnLocator(this.page, mailElement, dynamicEmail);
    LoggerHelper.logInfo(`Kullanici mail adresi girer: ${dynamicEmail}`);

    // 2. Name Box
    const nameElement = await marsPage.getElementByName("register name");
    await SendKeysUtils.sendKeysOnLocator(this.page, nameElement, name);
    LoggerHelper.logInfo("Kullanici isim girer");

    // 3. Password Box
    const passElement = await marsPage.getElementByName("register password");
    await SendKeysUtils.sendKeysOnLocator(this.page, passElement, password);
    LoggerHelper.logInfo("Kullanici PASSWORD girer");

    // 4. Confirm Password Box
    const confirmPassElement = await marsPage.getElementByName("register confirm password");
    await SendKeysUtils.sendKeysOnLocator(this.page, confirmPassElement, password);
    LoggerHelper.logInfo("Kullanici CONFIRM PASSWORD girer");

    // 5. CheckBox (Playwright'ın native locator'ı ile tıklama)
    await this.page.getByText('I agree with terms & rules').scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);

    // JavaScript ile tıkla
    await this.page.evaluate(() => {
        // Tüm label'ları bul
        const allLabels = document.querySelectorAll('label');

        // Her label'ı kontrol et
        allLabels.forEach(label => {
            const text = label.textContent || '';
            if (text.includes('I agree with terms') || text.includes('terms & rules')) {
                label.click();
                console.log('✅ Checkbox tıklandı!');
            }
        });
    });
    LoggerHelper.logInfo("Kullanici CHECKBOX tiklar");

    // 6. Register Submit Button
    const submitLocator = await marsPage.getElementByName("register submit");
    await ClickUtils.clickOnLocator(this.page, submitLocator);
    LoggerHelper.logInfo("Kullanici submit Button tiklar");

    AccountStorageHelper.saveAccount(dynamicEmail, password, name);



});
Given(/^Mars kullanicisi bazi testler yapar$/, async function () {

    // sayfayı goster
    const marsPage = new MarsPage(this.page);

    // CoursesButton
    await ClickUtils.clickByName(this.page, "Courses");

    await this.page.waitForTimeout(500);

    // Filter Items Button
    await this.page.getByRole('button', { name: 'Filter items' });
    const scrollerElement = await this.page.getByRole('button', { name: 'Filter items' });
    await scrollerElement.scrollIntoViewIfNeeded();
    LoggerHelper.logInfo("Scroll1 basarılı")

    await this.page.getByRole('button', { name: 'Join' }).scrollIntoViewIfNeeded();

   // await ClickUtils.clickByName(this.page, "'Filter items");
    LoggerHelper.logInfo("Scroll2 basarılı")

    // start learning buton
    await ClickUtils.clickByName(this.page, "Start Learning");



    ReasubleMethods.verifyUrl(this.page, "login")
    LoggerHelper.logInfo("Kullanici login sayfasindadir")


});