import { test, expect } from '../fixtures';
import { VALID_CHECKOUT_INFO } from '../utils/testData';

test.describe('Navigation & Auth Guards', () => {
  test('TC-N01: Logout redirects to login page', { tag: ['@smoke', '@regression'] }, async ({ loggedIn, loginPage }) => {
    await loggedIn.logout();
    await expect(loggedIn.page).toHaveURL(/\/$|index\.html/);
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('TC-N02: Direct access to /inventory.html without login redirects to login', { tag: ['@regression'] }, async ({ page }) => {
    await page.goto('/inventory.html');
    expect(page).toRedirectToLogin();
  });

  test('TC-N03: Direct access to /cart.html without login redirects to login', { tag: ['@regression'] }, async ({ page }) => {
    await page.goto('/cart.html');
    expect(page).toRedirectToLogin();
  });

  test('TC-N04: Direct access to /checkout-step-one.html without login redirects to login', { tag: ['@regression'] }, async ({ page }) => {
    await page.goto('/checkout-step-one.html');
    expect(page).toRedirectToLogin();
  });

  test('TC-N05: Cancel from checkout step 1 returns to cart', { tag: ['@regression'] }, async ({ loggedIn, cartPage, checkoutStep1Page }) => {
    await loggedIn.addFirstItemToCart();
    await loggedIn.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStep1Page.cancel();
    await expect(loggedIn.page).toHaveURL(/cart\.html/);
  });

  test('TC-N06: Cancel from checkout step 2 returns to inventory', { tag: ['@regression'] }, async ({ loggedIn, cartPage, checkoutStep1Page, checkoutStep2Page }) => {
    await loggedIn.addFirstItemToCart();
    await loggedIn.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStep1Page.fillAndContinue(VALID_CHECKOUT_INFO);
    await checkoutStep2Page.cancel();
    await expect(loggedIn.page).toHaveURL(/inventory\.html/);
  });
});
