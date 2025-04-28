import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    await page.locator('#inputEmail1').click()

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selector
    page.locator('input[placeholder="Email"][nbinput]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locator', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'Sign in' }).first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByLabel('Password').first().click()

    await page.getByText('Basic form').first().click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

    await page.locator('nb-card').nth(4).getByRole('button').click()
})

test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator('nb-card', { hasText: "Basic form" }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Password' }).click()

    await page.locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: 'Sign In' })
        .getByRole('textbox', { name: 'Email' }).click()
})

test('Reusing the locators', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })

    await emailField.fill('test@email.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('123456')
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@email.com')
})

test('Extracting values', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: "Basic form" })
    //single test value
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    //input value
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@email.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@email.com')

    //attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Alternative waits', async ({ page }) => {
    await page.waitForResponse('')
})
