import { test, expect } from '../fixtures';
import { SortOption } from '../utils/types';

test.describe('Products', () => {
  test('TC-P01: Inventory shows exactly 6 products', async ({ loggedIn }) => {
    await expect(loggedIn.inventoryItems).toHaveCount(6);
  });

  test('TC-P02: Sort by Name A→Z - names are alphabetical', async ({ loggedIn }) => {
    await loggedIn.sortBy(SortOption.NAME_ASC);
    const names = await loggedIn.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('TC-P03: Sort by Price low→high - prices ascending', async ({ loggedIn }) => {
    await loggedIn.sortBy(SortOption.PRICE_ASC);
    const prices = await loggedIn.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC-P04: Sort by Price high→low - prices descending', async ({ loggedIn }) => {
    await loggedIn.sortBy(SortOption.PRICE_DESC);
    const prices = await loggedIn.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('TC-P05: Click product navigates to detail page', async ({ loggedIn }) => {
    await loggedIn.productNames.first().click();
    await expect(loggedIn.page).toHaveURL(/inventory-item/);
  });

  test('TC-P06: Product detail shows name + price (soft assertions)', async ({ loggedIn, productDetailPage }) => {
    const productName = (await loggedIn.productNames.first().textContent()) ?? '';
    const productPrice = (await loggedIn.productPrices.first().textContent()) ?? '';
    await loggedIn.productNames.first().click();

    const softExpect = expect.soft;
    await softExpect(productDetailPage.productName).toBeVisible();
    await softExpect(productDetailPage.productPrice).toBeVisible();
    await softExpect(productDetailPage.addToCartButton).toBeVisible();

    await expect(productDetailPage.productName).toHaveText(productName);
    await expect(productDetailPage.productPrice).toHaveText(productPrice);
  });
});
