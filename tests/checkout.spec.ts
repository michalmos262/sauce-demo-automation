import { test, expect } from '../fixtures';
import { VALID_CHECKOUT_INFO, INCOMPLETE_CHECKOUT_INFO } from '../utils/testData';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loggedIn, cartPage }) => {
    await loggedIn.addItemToCartByName('Sauce Labs Backpack');
    await loggedIn.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('TC-CH01: Missing first name shows validation error', { tag: ['@regression'] }, async ({ checkoutStep1Page }) => {
    await checkoutStep1Page.fillAndContinue(INCOMPLETE_CHECKOUT_INFO.missingFirstName);
    await expect(checkoutStep1Page.errorMessage).toContainText('First Name is required');
  });

  test('TC-CH02: Missing last name shows validation error', { tag: ['@regression'] }, async ({ checkoutStep1Page }) => {
    await checkoutStep1Page.fillAndContinue(INCOMPLETE_CHECKOUT_INFO.missingLastName);
    await expect(checkoutStep1Page.errorMessage).toContainText('Last Name is required');
  });

  test('TC-CH03: Missing postal code shows validation error', { tag: ['@regression'] }, async ({ checkoutStep1Page }) => {
    await checkoutStep1Page.fillAndContinue(INCOMPLETE_CHECKOUT_INFO.missingPostalCode);
    await expect(checkoutStep1Page.errorMessage).toContainText('Postal Code is required');
  });

  test('TC-CH04: Valid info proceeds to step 2 order overview', { tag: ['@regression'] }, async ({ checkoutStep1Page }) => {
    await checkoutStep1Page.fillAndContinue(VALID_CHECKOUT_INFO);
    await expect(checkoutStep1Page.page).toHaveURL(/checkout-step-two/);
  });

  test('TC-CH05: Overview total is greater than subtotal (tax applied)', { tag: ['@regression'] }, async ({ checkoutStep1Page, checkoutStep2Page }) => {
    await checkoutStep1Page.fillAndContinue(VALID_CHECKOUT_INFO);
    await expect(checkoutStep1Page.page).toHaveURL(/checkout-step-two/);
    await expect.soft(checkoutStep2Page.subtotalLabel).toBeVisible();
    const summary = await checkoutStep2Page.getSummary();
    expect(summary.total).toBeGreaterThan(summary.subtotal);
  });

  test('TC-CH06: Finish shows confirmation page with thank-you', { tag: ['@smoke', '@regression'] }, async ({ checkoutStep1Page, checkoutStep2Page, checkoutCompletePage }) => {
    await checkoutStep1Page.fillAndContinue(VALID_CHECKOUT_INFO);
    await checkoutStep2Page.finish();
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
  });
});
