import { test, expect } from '../fixtures';

test.describe('Cart', () => {
  test('TC-C01: Cart empty after fresh login', { tag: ['@regression'] }, async ({ loggedIn, cartPage }) => {
    await loggedIn.goToCart();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('TC-C02: Add 1 item from inventory appears in cart', { tag: ['@smoke', '@regression'] }, async ({ loggedIn, cartPage }) => {
    await loggedIn.addFirstItemToCart();
    await expect(loggedIn.cartBadge).toHaveText('1');
    await loggedIn.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('TC-C03: Add 2 items both appear in cart', { tag: ['@regression'] }, async ({ loggedIn, cartPage }) => {
    const items = loggedIn.inventoryItems;
    await items.nth(0).locator('button').click();
    await items.nth(1).locator('button').click();
    await expect(loggedIn.cartBadge).toHaveText('2');
    await loggedIn.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('TC-C04: Remove item from cart page makes cart empty', { tag: ['@regression'] }, async ({ loggedIn, cartPage }) => {
    await loggedIn.addFirstItemToCart();
    await loggedIn.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.removeFirstItem();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('TC-C05: Continue Shopping from cart returns to inventory', { tag: ['@regression'] }, async ({ loggedIn, cartPage }) => {
    await loggedIn.goToCart();
    await cartPage.continueShopping();
    await expect(loggedIn.page).toHaveURL(/inventory/);
  });

  test('TC-C06: Checkout from cart goes to checkout step 1', { tag: ['@smoke', '@regression'] }, async ({ loggedIn, cartPage }) => {
    await loggedIn.addFirstItemToCart();
    await loggedIn.goToCart();
    await cartPage.proceedToCheckout();
    await expect(loggedIn.page).toHaveURL(/checkout-step-one/);
  });
});
