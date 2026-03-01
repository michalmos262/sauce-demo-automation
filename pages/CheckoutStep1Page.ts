import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfo } from '../utils/types';

export class CheckoutStep1Page extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');
  }

  async fillInfo(info: CheckoutInfo): Promise<void> {
    if (info.firstName) await this.firstNameInput.fill(info.firstName);
    if (info.lastName) await this.lastNameInput.fill(info.lastName);
    if (info.postalCode) await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async fillAndContinue(info: CheckoutInfo): Promise<void> {
    await this.fillInfo(info);
    await this.continue();
  }
}
