import { test, expect } from '../fixtures';
import { USERS, ERROR_MESSAGES } from '../utils/testData';
import { UserType } from '../utils/types';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-L01: Successful login with standard_user', { tag: ['@smoke', '@regression'] }, async ({ loginPage }) => {
    await loginPage.login(USERS[UserType.STANDARD]);
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  test('TC-L02: locked_out_user sees locked-out error', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.login(USERS[UserType.LOCKED_OUT]);
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.lockedOut);
  });

  test('TC-L03: Empty submission shows username required error', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.usernameRequired);
  });

  test('TC-L04: Username only shows password required error', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.usernameInput.fill(USERS[UserType.STANDARD].username);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.passwordRequired);
  });

  test('TC-L05: Wrong password shows credentials mismatch error', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.usernameInput.fill(USERS[UserType.STANDARD].username);
    await loginPage.passwordInput.fill('wrong_password');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.credentialsMismatch);
  });

  test('TC-L06: Error dismiss X button clears error', { tag: ['@regression'] }, async ({ loginPage }) => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.dismissError();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});
