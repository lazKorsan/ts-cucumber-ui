import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './hooks';
import { HomePage } from '../pages/HomePage';
import { Config } from '../utils/config';

let homePage: HomePage;

Given('Student kullanicisi anaSayfaya gider', async function () {
    homePage = new HomePage(page);
    await homePage.navigateTo(Config.baseUrl);
});

Given('Student kullanicisi url dogrular', async function () {
    await expect(page).toHaveURL(Config.baseUrl);
});

When('Student kullanicisi title ın {string} oldugunu dogrular', async function (expectedTitle: string) {
    const actualTitle = await homePage.getTitle();
    expect(actualTitle).toBe(expectedTitle);
});