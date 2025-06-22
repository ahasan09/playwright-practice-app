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

    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch();
        const responseBody = await response.json();
        responseBody.articles[0].title = 'This is a mocked article title';
        responseBody.articles[0].description = 'This is a mocked article description';

        await route.fulfill({
            status: 200,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            contentType: 'application/json',
            body: JSON.stringify(responseBody)
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

test('articles should show mock data', async ({ page }) => {
    // 1. Check Text Directly on Page
    await expect(page.getByText('This is a mocked article title')).toBeVisible();
    await expect(page.getByText('This is a mocked article description')).toBeVisible();

    // 2. Check Specific Container
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a mocked article title');
    await expect(page.locator('app-article-list p').first()).toContainText('This is a mocked article description');
})
