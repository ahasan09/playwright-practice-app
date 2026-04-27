# Playwright Practice App

Angular 14 application with a comprehensive Playwright end-to-end test suite using the Page Object Model pattern, covering multiple browsers.

## Tech Stack
- Angular 14
- TypeScript
- Playwright (E2E testing)
- Page Object Model pattern

## Project Structure
```
playwright-practice-app/
├── src/
│   └── app/
├── page-objects/        # Page Object classes (PageManager + page objects)
├── tests/               # Playwright test specs and setup files
├── playwright.config.ts
├── global-setup.ts
├── global-teardown.ts
└── package.json
```

## Development
```bash
# Install dependencies
npm install

# Run Angular dev server
ng serve

# Run Playwright tests (requires running app)
npx playwright test

# Run tests with UI
npx playwright test --ui
```

## Key Notes
- Tests require the Angular dev server to be running (`ng serve`) before executing.
- Multi-browser coverage: Chromium, Firefox, WebKit.
