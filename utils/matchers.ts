import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { CheckoutSummary } from './types';

expect.extend({
  toBeSortedAscending(received: number[]) {
    const sorted = [...received].sort((a, b) => a - b);
    const pass = JSON.stringify(received) === JSON.stringify(sorted);
    return {
      pass,
      message: () => pass
        ? `Expected array NOT to be sorted ascending, but got [${received}]`
        : `Expected [${received}] to be sorted ascending`,
    };
  },

  toBeSortedDescending(received: number[]) {
    const sorted = [...received].sort((a, b) => b - a);
    const pass = JSON.stringify(received) === JSON.stringify(sorted);
    return {
      pass,
      message: () => pass
        ? `Expected array NOT to be sorted descending, but got [${received}]`
        : `Expected [${received}] to be sorted descending`,
    };
  },

  toBeSortedAlphabetically(received: string[]) {
    const sorted = [...received].sort((a, b) => a.localeCompare(b));
    const pass = JSON.stringify(received) === JSON.stringify(sorted);
    return {
      pass,
      message: () => pass
        ? `Expected array NOT to be sorted alphabetically, but got [${received}]`
        : `Expected [${received}] to be sorted alphabetically`,
    };
  },

  toHaveTaxApplied(received: CheckoutSummary) {
    const expectedTotal = parseFloat((received.subtotal + received.tax).toFixed(2));
    const pass =
      received.total > received.subtotal &&
      Math.abs(received.total - expectedTotal) < 0.01;
    return {
      pass,
      message: () => pass
        ? `Expected summary NOT to have tax applied (subtotal: ${received.subtotal}, tax: ${received.tax}, total: ${received.total})`
        : `Expected total (${received.total}) to equal subtotal (${received.subtotal}) + tax (${received.tax}) = ${expectedTotal}`,
    };
  },

  toRedirectToLogin(received: Page) {
    const url = received.url();
    const pass = /\/$|index\.html/.test(url);
    return {
      pass,
      message: () => pass
        ? `Expected page NOT to have redirected to login, but URL was "${url}"`
        : `Expected page to redirect to login, but URL was "${url}"`,
    };
  },
});

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeSortedAscending(): R;
      toBeSortedDescending(): R;
      toBeSortedAlphabetically(): R;
      toHaveTaxApplied(): R;
      toRedirectToLogin(): R;
    }
  }
}
