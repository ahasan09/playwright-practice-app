import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe('forms suit', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('navigate to form layouts page', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('modal suit', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
    })

    test('navigate to dialog page', async ({ page }) => {
        await page.getByText('Dialog').click()
    })

    test('navigate to popover page', async ({ page }) => {
        await page.getByText('Popover').click()
    })

    test('navigate to tooltip page', async ({ page }) => {
        await page.getByText('Tooltip').click()
    })
})

test.describe('tables suit', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Tables & Data').click()
    })

    test('navigate to smart table page', async ({ page }) => {
        await page.getByText('Smart Table').click()
    })

    test('navigate to tree grid page', async ({ page }) => {
        await page.getByText('Tree Grid').click()
    })
})

test('navigate to charts page', async ({ page }) => {
    await page.getByText('Charts').first().click()
    await page.getByText('Echarts').nth(0).click()
})
