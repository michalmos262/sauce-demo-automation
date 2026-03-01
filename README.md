# Sauce Demo Automation

End-to-end test automation for [https://www.saucedemo.com](https://www.saucedemo.com) built with **Playwright** and **TypeScript**, following the Page Object Model pattern.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running Tests](#running-tests)
- [Viewing Reports](#viewing-reports)
  - [Playwright HTML Report](#playwright-html-report)
  - [Allure Report](#allure-report)
  - [Live Allure Report (GitHub Pages)](#live-allure-report-github-pages)
- [Project Structure](#project-structure)
- [Test Coverage](#test-coverage)
- [Technologies](#technologies)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/michalmos262/sauce-demo-automation.git
cd sauce-demo-automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps
```

---

## Environment Setup

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

`.env.example`:

```
BASE_URL=https://www.saucedemo.com
PASSWORD=secret_sauce
STANDARD_USER=standard_user
LOCKED_OUT_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user
```

> The `.env` file is gitignored and will never be committed. All variables have working defaults if the file is omitted.

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests headlessly (default) |
| `npm run test:headed` | Run with browser window visible |
| `npm run test:debug` | Step-through debug mode |
| `npm run test:ui` | Playwright interactive UI mode |

Run a single test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests by title:

```bash
npx playwright test --grep "TC-L01"
```

---

## Viewing Reports

### Playwright HTML Report

Generated automatically after every test run inside `playwright-report/`.

```bash
npm run test:report
```

Opens the report in your default browser.

---

### Allure Report

`allure-commandline` is included as a dev dependency — no global install needed.

#### Option A — Quick serve (recommended)

Generates and opens the report in one command:

```bash
npm run allure:serve
```

#### Option B — Generate then open

```bash
# 1. Run the tests (writes raw results to allure-results/)
npm test

# 2. Build the HTML report
npm run allure:generate

# 3. Open the report in the browser
npm run allure:open
```

> **Note:** `allure-results/` and `allure-report/` are gitignored.

---

### Live Allure Report (GitHub Pages)

The latest Allure report from the `main` branch is automatically published after every CI run and is accessible at:

**https://michalmos262.github.io/sauce-demo-automation/**

> The report is only updated on pushes to `main`. Pull request runs upload the report as a downloadable artifact instead.

---

## Project Structure

```
sauce-demo-automation/
├── .env.example                   # Environment variables template
├── playwright.config.ts           # Playwright configuration
├── fixtures/
│   └── index.ts                   # Custom fixtures — injects page objects into tests
├── pages/                         # Page Object Models
│   ├── BasePage.ts                # Abstract base class (navigate, waitForNetworkIdle)
│   ├── LoginPage.ts               # Login page interactions
│   ├── InventoryPage.ts           # Products listing, sorting, cart badge
│   ├── ProductDetailPage.ts       # Individual product detail page
│   ├── CartPage.ts                # Shopping cart
│   ├── CheckoutStep1Page.ts       # Checkout — customer info form
│   ├── CheckoutStep2Page.ts       # Checkout — order summary
│   └── CheckoutCompletePage.ts    # Order confirmation
├── tests/                         # Test specs
│   ├── login.spec.ts              # Authentication tests (TC-L01–L06)
│   ├── products.spec.ts           # Product display & sorting (TC-P01–P06)
│   ├── cart.spec.ts               # Cart functionality (TC-C01–C06)
│   ├── checkout.spec.ts           # Checkout flow (TC-CH01–CH06)
│   └── navigation.spec.ts         # Navigation & auth guards (TC-N01–N06)
├── utils/
│   ├── types.ts                   # TypeScript interfaces and enums
│   └── testData.ts                # Credentials, error messages, checkout data
└── .github/
    └── workflows/
        └── playwright.yml         # GitHub Actions CI workflow
```

---

## Test Coverage

| Suite | Tests | Description |
|---|---|---|
| Login | 6 | Successful login, locked user, empty fields, wrong password, error dismiss |
| Products | 6 | Product count, sorting (A→Z, price low/high), product detail navigation |
| Cart | 6 | Empty cart, add 1/2 items, remove item, continue shopping, proceed to checkout |
| Checkout | 6 | Validation errors, valid info, tax calculation, order confirmation |
| Navigation | 6 | Logout, direct URL guards (/inventory, /cart, /checkout), cancel flows |
| **Total** | **30** | |

---

## Technologies

| Technology | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | E2E test framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [allure-playwright](https://www.npmjs.com/package/allure-playwright) | Allure reporter plugin |
| [allure-commandline](https://www.npmjs.com/package/allure-commandline) | Allure CLI for generating/serving reports |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
