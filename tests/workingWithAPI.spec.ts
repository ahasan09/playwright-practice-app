import test, { expect } from "@playwright/test"
import tags from '../test-data/tags.json'
import { log } from "console"

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

    // await page.route('*/**/api/articles*', async route => {
    //     const response = await route.fetch();
    //     const responseBody = await response.json();
    //     responseBody.articles[0].title = 'This is a mocked article title';
    //     responseBody.articles[0].description = 'This is a mocked article description';

    //     await route.fulfill({
    //         status: 200,
    //         headers: {
    //             'Cache-Control': 'no-cache, no-store, must-revalidate',
    //             'Pragma': 'no-cache',
    //             'Expires': '0'
    //         },
    //         contentType: 'application/json',
    //         body: JSON.stringify(responseBody)
    //     })
    // })

    await page.goto('https://conduit.bondaracademy.com/', {
        waitUntil: 'networkidle'
    });
    await page.getByText('Sign in').click();
    await page.getByRole('textbox', { name: 'Email' }).fill('hasan@mail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('hasan123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByText('Global Feed').click();
    await page.waitForLoadState('networkidle');
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

test('delete article', async ({ page, request }) => {
    // 1. Login to get the token
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: { "user": { "email": "hasan@mail.com", "password": "hasan123" } }
    })
    const responseBody = await loginResponse.json();
    const accessToken = responseBody.user.token;

    // 2. Create a new article
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: { 
            "article": { 
                "title": "Test article title", 
                "description": "Test article about", 
                "body": "Test article description", 
                "tagList": ["test"] 
            } 
        },
        headers: {
            'Authorization': `Token ${accessToken}`
        }
    });
    expect(articleResponse.status()).toEqual(201);
    expect(articleResponse.ok()).toBeTruthy();

    await page.getByText('Global Feed').click();
    await page.getByText('Test article title').click();
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await page.getByText('Global Feed').click();
})
