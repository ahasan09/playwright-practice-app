import { test } from "../test-options"
import { faker } from '@faker-js/faker'

test('parametrized methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName({ lastName: 'Hasan' })
    const randomEmail = `${randomFullName.toLowerCase().replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitGridFormWithCredentialsAndSelectOption(randomEmail, '123', 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckBox(randomFullName, randomEmail, true)
})