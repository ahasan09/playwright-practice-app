# Improvement Plan: playwright-practice-app

## Overview
Angular 14 app with a Playwright e2e test suite using the Page Object Model. Well-structured foundation. Improvements focus on CI integration, test coverage, and reporting.

## Improvements

### CI/CD (High Priority)
- Add GitHub Actions workflow that:
  1. Installs dependencies and Playwright browsers
  2. Starts the Angular dev server
  3. Runs all Playwright tests in parallel
  4. Uploads the Playwright HTML report as a CI artifact
- Set up Playwright's sharding to distribute tests across multiple CI runners

### Test Coverage
- Add tests for error states (API failures, network errors, form validation errors)
- Add visual regression tests using `expect(page).toHaveScreenshot()` for key UI states
- Add accessibility tests using `@axe-core/playwright` on critical pages
- Add API-mocking tests using Playwright's `page.route()` to test UI behavior with controlled data

### Angular App
- Upgrade from Angular 14 to Angular 17+
- Add more complex UI interactions to test: drag-and-drop, file upload, date pickers, modals
- Add a mock API server (e.g., `json-server`) so tests don't depend on an external service

### Reporting
- Add Playwright's built-in HTML reporter configuration with screenshots on failure
- Add Allure Report integration for richer test history and trend analysis

### Code Quality
- Add ESLint for the test files
- Tune the existing `playwright.config.ts` for CI (currently sets `retries: 2` and `workers: 1` on CI; consider raising workers and enabling `fullyParallel: true`)
- Document the Page Object Model / `PageManager` structure in the README

### Developer Experience
- Add a `npm run test:ui` script to launch Playwright's UI mode for interactive debugging
- Add `npm run test:headed` for local visual debugging
- Add scripts covering all browsers (currently only `pageObjects-firefox` and `workingWithAPI-firefox` exist)
