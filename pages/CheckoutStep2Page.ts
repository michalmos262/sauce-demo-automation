import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutSummary } from '../utils/types';

export class CheckoutStep2Page extends BasePage {
  readonly subtotalLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getSummary(): Promise<CheckoutSummary> {
    const subtotalText = await this.subtotalLabel.textContent() ?? '';
    const totalText = await this.totalLabel.textContent() ?? '';

    const subtotalMatch = subtotalText.match(/[\d.]+/);
    const totalMatch = totalText.match(/[\d.]+/);

    const subtotal = subtotalMatch ? parseFloat(subtotalMatch[0]) : 0;
    const total = totalMatch ? parseFloat(totalMatch[0]) : 0;
    const tax = parseFloat((total - subtotal).toFixed(2));

    return { subtotal, tax, total };
  }
}
