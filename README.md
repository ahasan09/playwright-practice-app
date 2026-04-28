# 🎭 Playwright Testing Practice (Angular)

A sandbox Angular application for mastering Playwright end-to-end testing. This repo includes various test scenarios, UI components, and best practices for writing reliable browser automation tests.

## 🚀 Features

- **Angular 14** app with TypeScript for realistic testing
- **Pre-configured Playwright** test suite with examples
- **Diverse test scenarios** covering:
  - Form interactions & validations
  - Dynamic content loading (API mocking)
  - Authentication flows
  - Visual regression tests
  - Component isolation tests
- **CI/CD-ready** with GitHub Actions example

## 🧱 Page Object Model Structure

This project uses a `PageManager` entrypoint to keep tests clean and composable:

- `page-objects/pageManager.ts`: central factory that exposes all page objects.
- `page-objects/navigationPage.ts`: navigation helpers for menu routing.
- `page-objects/formLayoutsPage.ts`: form interactions and reusable submit flows.
- `page-objects/datepickerPage.ts`: datepicker interactions and reusable date logic.
- `test-options.ts`: custom fixtures for wiring `PageManager` into tests.

The intended test flow is:

1. Use `PageManager` in the test.
2. Navigate through `navigationPage` helpers.
3. Execute domain actions through page-object methods.
4. Keep assertions in tests unless an assertion is tightly coupled to a page-object action.

## 📦 Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/ahasan09/playwright-practice-app
   cd playwright-practice-app
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```
3. **Run the Angular app (http://localhost:4200)**:
   ```bash
   ng serve
   ```
2. **Run Playwright tests**:
   ```bash
   npm test
   ```

## 🧪 Test Commands

- Run all tests: `npm test`
- Run Playwright UI mode: `npm run test:ui`
- Run headed Chromium: `npm run test:headed`
- Run browser-specific suites:
  - `npm run test:chromium`
  - `npm run test:firefox`
  - `npm run test:webkit`
  - `npm run test:all-browsers`
- Update visual snapshots: `npm run test:update-snapshots`
- Open Playwright HTML report: `npm run test:report`
- Generate/open Allure reports:
  - `npm run allure:generate`
  - `npm run allure:open`
- Lint Playwright/page-object TypeScript files: `npm run lint:tests`

## ⚙️ CI/CD

The workflow in `.github/workflows/playwright.yml` now includes:

1. Dependency + Playwright browser installation.
2. Parallelized test execution using Playwright sharding.
3. Blob report upload per shard.
4. Post-processing job to merge shard reports into a single HTML report artifact.

CI artifact:

- `playwright-html-report` (Playwright merged HTML report)

## 🧪 Additional Coverage Added

- Error-state tests for validation and API failure handling.
- Visual regression tests with `toHaveScreenshot()`.
- Accessibility checks using `@axe-core/playwright`.
- Existing API mocking patterns are kept and extended through route interception tests.

## 🛰️ Local Mock API

`json-server` is configured with sample data at `mock-api/db.json`.

- Start only mock API: `npm run mock-api`
- Start mock API + Angular app together: `npm run start:with-mock-api`

## 🌟 Advanced Features
- Parallel test execution
- Mobile viewport testing
- Video recording of test runs
- HTML report generation

## 🤝 Contributing
1. Fork the repository
2. Create a branch (git checkout -b feature/your-feature)
3. Commit changes (git commit -m 'Add some feature')
4. Push to branch (git push origin feature/your-feature)
5. Open a Pull Request