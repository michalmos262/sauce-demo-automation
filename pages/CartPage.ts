import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  async navigate(): Promise<void> {
    await this.goto('/cart.html');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.locator('[data-test^="remove"]').click();
  }

  async removeFirstItem(): Promise<void> {
    await this.cartItems.first().locator('[data-test^="remove"]').click();
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

}
