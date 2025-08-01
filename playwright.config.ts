import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import 'dotenv/config';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    // timeout: 40000,
    // globalTimeout: 60000,
    // expect:{
    //     timeout:2000
    // },

    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://localhost:4200/',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        extraHTTPHeaders: {
            'Authorization': `Token ${process.env.ACCESS_TOKEN}`
        },
        //navigationTimeout: 5000,
        video: 'on'
    },
    globalSetup: require.resolve('./global-setup.ts'),
    globalTeardown: require.resolve('./global-teardown.ts'),

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'setup',
            testMatch: 'auth.setup.ts'
        },
        {
            name: 'articleSetup',
            testMatch: 'newArticle.setup.ts',
            dependencies: ['setup'],
            teardown: 'articleCleanUp'
        },
        {
            name: 'articleCleanUp',
            testMatch: 'articleCleanUp.setup.ts'
        },
        {
            name: 'likeCounter',
            testMatch: 'likesCounter.spec.ts',
            use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
            dependencies: ['articleSetup']
        },
        {
            name: 'likeCounterGlobal',
            testMatch: 'likesCounterGlobal.spec.ts',
            use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
        },
        {
            name: 'chromium',
            testIgnore: 'likesCounter.spec.ts',
            use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
            dependencies: ['setup']
        },
        {
            name: 'firefox',
            testIgnore: 'likesCounter.spec.ts',
            use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
            dependencies: ['setup']
        },
        {
            name: 'webkit',
            testIgnore: 'likesCounter.spec.ts',
            use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
            dependencies: ['setup']
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
