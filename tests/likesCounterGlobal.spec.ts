import test, { expect } from "@playwright/test";

test('Global Like counter increase', async ({ page }) => {
    await page.goto(process.env.CONDUIT_FE, {
        waitUntil: 'networkidle'
    });
    await page.getByText('Global Feed').click();

    const firstLikeButton = page.locator('app-article-preview').first().locator('button')
    await expect(firstLikeButton).toContainText('0')
    await firstLikeButton.click()
    await expect(firstLikeButton).toContainText('1')
})