import { test } from "@playwright/test"
import {faker} from '@faker-js/faker'
import { PageManager } from "../page-objects/pageManager"

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('navigate to form page', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName({lastName:'Hasan'})
    const randomEmail = `${randomFullName.toLowerCase().replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitGridFormWithCredentialsAndSelectOption(randomEmail, '123', 'Option 2')
    await page.screenshot({ path: 'screenshots/formsLayoutPage.png' });

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckBox(randomFullName, randomEmail, true)
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineForm.png' })
    
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(6, 15)
})
