import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async goBack(): Promise<void> {
    await this.backToProductsButton.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }
}