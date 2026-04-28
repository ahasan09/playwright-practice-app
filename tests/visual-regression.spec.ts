import { expect, test } from '@playwright/test';

test.describe('Visual regression', () => {
  test('form layouts page snapshot', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    await expect(page).toHaveScreenshot('form-layouts-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('inline form card snapshot', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const inlineFormCard = page.locator('nb-card', { hasText: 'Inline form' });
    await expect(inlineFormCard).toHaveScreenshot('inline-form-card.png', {
      animations: 'disabled',
    });
  });
});
