import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { SortOption } from '../utils/types';

export class InventoryPage extends BasePage {
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async navigate(): Promise<void> {
    await this.goto('/inventory.html');
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async clickProduct(name: string): Promise<void> {
    await this.page.locator('.inventory_item_name', { hasText: name }).click();
  }

  async addFirstItemToCart(): Promise<void> {
    await this.page.locator('.inventory_item').first().locator('button').click();
  }

  async addItemToCartByName(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    await item.locator('button').click();
  }

  async openBurgerMenu(): Promise<void> {
    await this.burgerMenu.click();
  }

  async logout(): Promise<void> {
    await this.openBurgerMenu();
    await this.logoutLink.click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }

}
