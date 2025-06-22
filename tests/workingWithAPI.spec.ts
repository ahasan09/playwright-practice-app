import test, { expect } from "@playwright/test"
import tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {

    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            contentType: 'application/json',
            body: JSON.stringify(tags)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/', {
        waitUntil: 'networkidle'
    });
})

test('has title', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
})

test('tags should show mock data', async ({ page }) => {
    // 1. Check Text Directly on Page
    await expect(page.getByText('Mocked123')).toBeVisible();

    const tagList = page.locator('.sidebar .tag-list');

    // 2. Check Specific COntainer
    await expect(tagList).toContainText('Mocked123');

    // 3. Check if the tag list is visible    
    await expect(tagList).toBeVisible();
    await expect(tagList).toContainText('Mocked123');

    // Optional visual confirmation
    await page.screenshot({ path: 'tags-loaded.png' });
})
