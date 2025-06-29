import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.UI_TESTING_PLAYGROUND}/ajax`)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //const text = await successButton.textContent()

    //await successButton.waitFor({ state: 'attached' })
    //const text = await successButton.allTextContents()

    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test('Alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //___ wait for element
    //await page.waitForSelector('.bg-success')

    //___ wait for particular response
    await page.waitForResponse(`${process.env.UI_TESTING_PLAYGROUND}/ajaxdata`)


    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip('Timeouts', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
})