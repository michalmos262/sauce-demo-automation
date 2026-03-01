# Test Plan - Sauce Demo E2E Automation

## 1. Overview

| Field | Value |
|---|---|
| Project | QA Automation Home Assignment |
| Application Under Test | [https://www.saucedemo.com](https://www.saucedemo.com) |
| Test Type | End-to-End (E2E) UI Automation |
| Framework | Playwright + TypeScript |
| Pattern | Page Object Model (POM) |
| Total Test Cases | 30 |
| Execution Mode | Parallel, headless by default |

### Application Description

Sauce Demo is a reference e-commerce demo site built for QA practice. It exposes a login screen, a product inventory page, a shopping cart, a two-step checkout flow, and several built-in user types that simulate real-world edge cases (locked accounts, slow rendering, broken images).

---

## 2. Scope

### In Scope

| Area | Description |
|---|---|
| Authentication | Login / logout, error messages, form validation |
| Inventory | Product count, sorting, navigation to detail page |
| Product Detail | Name, price, add-to-cart visibility (soft assertions) |
| Cart | Add / remove items, badge counter, navigation |
| Checkout Step 1 | Form field validation (first name, last name, postal code) |
| Checkout Step 2 | Order summary, tax calculation, finish action |
| Navigation & Auth Guards | Direct URL access without session, cancel buttons |

### Out of Scope

- `problem_user` visual/functional defects (images, broken add-to-cart)
- `performance_glitch_user` timing/load tests
- `error_user` - intentional backend error simulation
- Mobile/responsive layout testing
- Accessibility (a11y) audits
- API-level testing
- Payment processing (no real payments exist)
- Cross-browser beyond the configured projects

---

## 3. Test Accounts

| Username | Password | Role |
|---|---|---|
| `standard_user` | `secret_sauce` | Primary test account (all happy-path tests) |
| `locked_out_user` | `secret_sauce` | Verifies locked-account error message |
| `problem_user` | `secret_sauce` | Out of scope |
| `performance_glitch_user` | `secret_sauce` | Out of scope |

---

## 4. Test Cases

### 4.1 Login (TC-L)

| Test ID | Description | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-L01 | Successful login with standard_user | 1. Navigate to `/`  2. Enter valid credentials  3. Click Login | Redirected to `/inventory.html` | High |
| TC-L02 | locked_out_user sees locked-out error | 1. Navigate to `/`  2. Enter locked_out_user credentials  3. Click Login | Error message: *"Sorry, this user has been locked out."* | High |
| TC-L03 | Empty form submission shows username-required error | 1. Navigate to `/`  2. Click Login without filling any field | Error message: *"Epic sadface: Username is required"* | High |
| TC-L04 | Username only - shows password-required error | 1. Navigate to `/`  2. Fill username only  3. Click Login | Error message: *"Epic sadface: Password is required"* | Medium |
| TC-L05 | Wrong password shows credentials-mismatch error | 1. Navigate to `/`  2. Fill valid username + wrong password  3. Click Login | Error message: *"Epic sadface: Username and password do not match…"* | Medium |
| TC-L06 | Error dismiss (×) button clears the error banner | 1. Navigate to `/`  2. Submit empty form (error appears)  3. Click × on error banner | Error banner is no longer visible | Low |

---

### 4.2 Products (TC-P)

All product tests use the `loggedIn` fixture (authenticated as `standard_user`).

| Test ID | Description | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-P01 | Inventory shows exactly 6 products | 1. Land on inventory page | `inventoryItems` locator resolves to exactly 6 elements | High |
| TC-P02 | Sort by Name A→Z returns alphabetical order | 1. Select "Name (A to Z)" sort  2. Read all product names | Names array equals its sorted copy | High |
| TC-P03 | Sort by Price low→high returns ascending prices | 1. Select "Price (low to high)" sort  2. Read all prices | Prices array equals its ascending-sorted copy | High |
| TC-P04 | Sort by Price high→low returns descending prices | 1. Select "Price (high to low)" sort  2. Read all prices | Prices array equals its descending-sorted copy | Medium |
| TC-P05 | Clicking a product navigates to its detail page | 1. Click first product name | URL matches `/inventory-item.html` | High |
| TC-P06 | Product detail page shows correct name, price, and Add-to-Cart button | 1. Note name + price on inventory  2. Click first product  3. Soft-assert name, price, button visible  4. Hard-assert values match inventory | All three elements visible; name and price match inventory values | High |

---

### 4.3 Cart (TC-C)

| Test ID | Description | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-C01 | Cart is empty after fresh login | 1. Login  2. Navigate to `/cart.html` | Cart item list has 0 elements | High |
| TC-C02 | Add 1 item from inventory - appears in cart | 1. Login  2. Click "Add to cart" on first item  3. Navigate to cart | Cart badge shows "1"; cart contains 1 item | High |
| TC-C03 | Add 2 items - both appear in cart | 1. Login  2. Add items 1 and 2  3. Navigate to cart | Cart badge shows "2"; cart contains 2 items | High |
| TC-C04 | Remove item from cart page - cart becomes empty | 1. Login  2. Add first item  3. Go to cart  4. Click Remove | Cart contains 0 items | High |
| TC-C05 | "Continue Shopping" returns to inventory | 1. Login  2. Navigate to cart  3. Click "Continue Shopping" | URL matches `/inventory.html` | Medium |
| TC-C06 | "Checkout" from cart navigates to checkout step 1 | 1. Login  2. Add first item  3. Go to cart  4. Click "Checkout" | URL matches `/checkout-step-one.html` | High |

---

### 4.4 Checkout (TC-CH)

All checkout tests use a `beforeEach` that adds "Sauce Labs Backpack" to cart and navigates to step 1.

| Test ID | Description | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-CH01 | Missing first name shows validation error | 1. Leave first name blank  2. Fill last name + postal code  3. Click Continue | Error contains *"First Name is required"* | High |
| TC-CH02 | Missing last name shows validation error | 1. Fill first name + postal code  2. Leave last name blank  3. Click Continue | Error contains *"Last Name is required"* | High |
| TC-CH03 | Missing postal code shows validation error | 1. Fill first name + last name  2. Leave postal code blank  3. Click Continue | Error contains *"Postal Code is required"* | High |
| TC-CH04 | Valid info proceeds to step 2 (order overview) | 1. Fill all fields with valid data  2. Click Continue | URL matches `/checkout-step-two.html` | High |
| TC-CH05 | Order total is greater than subtotal (tax applied) | 1. Fill valid info → Continue  2. Read subtotal and total values | `total > subtotal`; subtotal label is visible (soft) | High |
| TC-CH06 | Finish button shows order-confirmation page | 1. Fill valid info → Continue  2. Click Finish | Confirmation header reads *"Thank you for your order!"* | High |

---

### 4.5 Navigation & Auth Guards (TC-N)

| Test ID | Description | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-N01 | Logout redirects to login and clears form fields | 1. Login  2. Open burger menu  3. Click Logout | URL is `/`; login button visible; username & password fields empty (soft) | High |
| TC-N02 | Direct access to `/inventory.html` without session redirects to login | 1. Open `/inventory.html` without logging in | URL redirects to `/` (login page) | High |
| TC-N03 | Direct access to `/cart.html` without session redirects to login | 1. Open `/cart.html` without logging in | URL redirects to `/` (login page) | High |
| TC-N04 | Direct access to `/checkout-step-one.html` without session redirects to login | 1. Open `/checkout-step-one.html` without logging in | URL redirects to `/` (login page) | High |
| TC-N05 | Cancel on checkout step 1 returns to cart | 1. Login  2. Add item → Cart → Checkout  3. Click Cancel | URL matches `/cart.html` | Medium |
| TC-N06 | Cancel on checkout step 2 returns to inventory | 1. Login  2. Add item → Cart → Checkout → Step 1 → Continue  3. Click Cancel on step 2 | URL matches `/inventory.html` | Medium |

---

## 5. Priority Summary

| Priority | Count | Test IDs |
|---|---|---|
| High | 23 | L01–L03, P01–P03, P05–P06, C01–C04, C06, CH01–CH06, N01–N04 |
| Medium | 5 | L04, P04, C05, N05, N06 |
| Low | 1 | L06 |
| **Total** | **30** | |

---

## 6. Test Risks

| Risk | Impact | Mitigation |
|---|---|---|
| CSS slide-in animation on inventory items causes stability timeout on clicks | High - TC-C02, TC-C03, TC-C06 flaky | `loggedIn` fixture waits for `toHaveCount(6)` instead of `toBeVisible()` on the first item, ensuring all items are rendered and animations have settled before any interaction |
| External site availability (saucedemo.com is a third-party demo) | High - all tests fail if site is down | No mitigation; retry (`retries: 1`) reduces transient failure noise |
| `performance_glitch_user` slow navigation may exceed default timeout | Medium | This user type is excluded from the automated suite |
| Parallel execution sharing global browser state | Low - each worker gets an isolated browser context | Playwright's default test isolation ensures no shared state between tests |
| Selector drift if Sauce Demo updates its DOM | Medium | All locators use `data-test` attributes where available, falling back to stable CSS class names |

---

## 7. Test Environment

| Item | Value |
|---|---|
| Node.js | ≥ 18 |
| Playwright | Latest (see `package.json`) |
| Browsers configured | Chromium, Firefox, WebKit |
| Base URL | Configured via `BASE_URL` in `.env` |
| Retries | 1 (configured in `playwright.config.ts`) |
| Screenshots | On failure |
| Video | Retain on failure |
| Reporter | HTML (built-in) |

---

## 8. Execution Commands

```bash
# Run all tests (headless)
npx playwright test

# Run all tests on Chromium only
npx playwright test --project=chromium

# Run a single spec file
npx playwright test tests/cart.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Open the HTML report after a run
npx playwright show-report
```

---

## 9. Summary

The suite covers the full user journey across five functional areas: authentication, product browsing, cart management, checkout flow, and navigation/auth guards. All 30 cases are independent and parallelisable. The primary known risk - animation-induced element instability - has been addressed at the fixture level so individual tests require no special workarounds.
