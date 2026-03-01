import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../utils/testData';
import { UserType } from '../utils/types';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStep1Page } from '../pages/CheckoutStep1Page';
import { CheckoutStep2Page } from '../pages/CheckoutStep2Page';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

type MyFixtures = {
  loginPage: LoginPage;
  loggedIn: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutStep1Page: CheckoutStep1Page;
  checkoutStep2Page: CheckoutStep2Page;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  loggedIn: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS[UserType.STANDARD]);
    await expect(inventoryPage.sortDropdown).toBeVisible();

    await use(inventoryPage);
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutStep1Page: async ({ page }, use) => {
    await use(new CheckoutStep1Page(page));
  },

  checkoutStep2Page: async ({ page }, use) => {
    await use(new CheckoutStep2Page(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  }
});

export { expect } from '@playwright/test';