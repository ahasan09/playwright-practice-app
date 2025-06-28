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
        responseBody.articles[1].title = 'This is a mocked article title';
        responseBody.articles[1].description = 'This is a mocked article description';

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
    //await page.screenshot({ path: 'tags-loaded.png' });
})

test('articles should show mock data', async ({ page }) => {
    // 1. Check Text Directly on Page
    await expect(page.getByText('This is a mocked article title')).toBeVisible();
    await expect(page.getByText('This is a mocked article description')).toBeVisible();

    // 2. Check Specific Container
    await expect(page.locator('app-article-list h1').nth(1)).toContainText('This is a mocked article title');
    await expect(page.locator('app-article-list p').nth(1)).toContainText('This is a mocked article description');
})

test('delete article', async ({ page, request }) => {
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: {
            "article": {
                "title": "Test article title",
                "description": "Test article about",
                "body": "Test article description",
                "tagList": ["test"]
            }
        }
    });
    expect(articleResponse.status()).toEqual(201);
    expect(articleResponse.ok()).toBeTruthy();

    await page.getByText('Global Feed').click();
    await page.getByText('Test article title').click();
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await page.getByText('Global Feed').click();

    await expect(page.locator('app-article-list h1').first()).not.toContainText('Test article title')
})

test('create article', async ({ page, request }) => {
    await page.getByText('New Article').click()
    await page.getByRole('textbox', { name: 'Article Title' }).fill('Playwrite is awesome')
    await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('About the Playwrite')
    await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill('Playwrite article detail')
    await page.getByRole('textbox', { name: 'Enter tags' }).fill('Playwrite')
    await page.getByRole('button', { name: 'Publish Article' }).click()

    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug

    await expect(page.locator('app-article-page h1')).toContainText('Playwrite is awesome')
    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).toContainText('Playwrite is awesome')

    // Delete article
    const deletedArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`);
    expect(deletedArticleResponse.status()).toEqual(204)

    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list h1').first()).not.toContainText('Playwrite is awesome')
})
