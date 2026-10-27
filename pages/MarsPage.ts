import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class MarsPage extends BasePage {
    private elementMap: Record<string, Locator>;

    constructor(page: Page) {
        super(page);

        // Tek yer: Map. Field'lar yok!
        this.elementMap = {
            'login':       page.getByRole('link', { name: 'Login' }),
            //'register':    page.locator('a[href="/register"]'),
            //'categories':  page.getByText('Categories Development Web'),
            'home':        page.locator('li.nav-item').filter({ hasText: 'Home' }),
            //'courses':     page.locator('li.nav-item').filter({ hasText: 'Courses' }),
            'instructors': page.locator('li.nav-item').filter({ hasText: 'Instructors' }),
            'store':       page.locator('li.nav-item').filter({ hasText: 'Store' }),
            'blog':        page.locator('li.nav-item').filter({ hasText: 'Blog' }),
            'email':       page.getByLabel('Email', { exact: false }),
            'register mail':   page.getByRole('textbox', { name: 'Email :' }),
            'register name': page.locator('input[name="full_name"]'),
            'register password': page.getByRole('textbox', { name: 'Password:', exact: true }),
            'register confirm password': page.getByRole('textbox', { name: 'Retype Password:' }),
            'checkbox': page.getByRole('checkbox', { name: 'I agree with terms & rules' }),
            'register submit': page.getByRole('button', { name: 'Signup' })
        };
    }

    getElementByName(elementName: string): Locator {
        if (!elementName || !elementName.trim()) {
            throw new Error(`[HATA] Element adı boş olamaz! Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`);
        }

        const key = elementName.trim().replace(/:+$/, '').toLowerCase();
        const locator = this.elementMap[key];

        if (!locator) {
            throw new Error(
                `[HATA] '${elementName}' CommonPage içinde bulunamadı! ` +
                `Geçerli değerler: ${Object.keys(this.elementMap).join(', ')}`
            );
        }
        return locator;
    }
}