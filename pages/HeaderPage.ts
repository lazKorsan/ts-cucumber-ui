import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

// 1. Enum'u doğrudan bu dosyanın içinde tanımlıyoruz.
// Dışarıdan import etmeye gerek yok!
export enum HeaderElements {
    LOGIN = 'Login',
    REGISTER = 'Register',
    CATEGORIES = 'Categories',
    HOME = 'Home',
    COURSES = 'Courses',
    INSTRUCTORS = 'Instructors',
    STORE = 'Store',
    BLOG = 'Blog',
    EMAIL = 'Email'
}

export class HeaderPage extends BasePage {
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly categoriesButton: Locator;
    readonly homeButton: Locator;
    readonly coursesButton: Locator;
    readonly instructorsButton: Locator;
    readonly storeButton: Locator;
    readonly blogButton: Locator;
    readonly emailBox: Locator;

    // Enum ve Locator eşleşmesini tutan obje
    private elementMap: Record<HeaderElements, Locator>;

    constructor(page: Page) {
        super(page);

        this.loginButton = page.getByRole('link', {name: 'Login'})
        this.registerButton = page.locator('a[href="/register"]');
        this.categoriesButton = page.getByText('Categories Development Web');

        // Home butonunu diğerleriyle aynı (ve en güvenli) formata getirdik
        this.homeButton = page.locator('li.nav-item').filter({hasText: 'Home'});

        this.coursesButton = page.locator('li.nav-item').filter({hasText: 'Courses'});
        this.instructorsButton = page.locator('li.nav-item').filter({hasText: 'Instructors'});
        this.storeButton = page.locator('li.nav-item').filter({hasText: 'Store'});
        this.blogButton = page.locator('li.nav-item').filter({hasText: 'Blog'});
        this.emailBox = page.locator('input[name="email"]');

        // Enum değerlerini Locator'lara bağlıyoruz
        this.elementMap = {
            [HeaderElements.LOGIN]: this.loginButton,
            [HeaderElements.REGISTER]: this.registerButton,
            [HeaderElements.CATEGORIES]: this.categoriesButton,
            [HeaderElements.HOME]: this.homeButton,
            [HeaderElements.COURSES]: this.coursesButton,
            [HeaderElements.INSTRUCTORS]: this.instructorsButton,
            [HeaderElements.STORE]: this.storeButton,
            [HeaderElements.BLOG]: this.blogButton,
            [HeaderElements.EMAIL]: this.emailBox,
        };
    }

    /**
     * Feature'dan gelen string'i (örn: "Home") Enum'a çevirip ilgili Locator'ı döner.
     */
    getHeaderElement(buttonName: string): Locator {
        // Baştaki/sondaki boşlukları ve : karakterini temizle
        const cleanName = buttonName.trim().replace(/:$/, '').toLowerCase();
        // Enum anahtarlarını alıp (LOGIN, HOME vb.) büyük/küçük harf duyarsız arıyoruz
        const key = Object.keys(HeaderElements).find(
            (k) => k.toLowerCase() === buttonName.toLowerCase()
        ) as keyof typeof HeaderElements;

        if (!key) {
            throw new Error(`[HATA] '${buttonName}' HeaderPage içinde bulunamadı! Geçerli değerler: ${Object.keys(HeaderElements).join(', ')}`);
        }

        const elementKey = HeaderElements[key];
        return this.elementMap[elementKey];
    }

}