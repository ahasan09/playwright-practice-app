import { expect, test } from '@playwright/test';

test.describe('Error and validation states', () => {
  test('shows validation state for invalid email', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const emailInput = page
      .locator('nb-card', { hasText: 'Using the Grid' })
      .getByRole('textbox', { name: 'Email' });

    await emailInput.fill('not-an-email');
    await emailInput.blur();

    await expect(emailInput).toHaveClass(/ng-invalid/);
  });

  test('keeps shell visible when articles API fails', async ({ page }) => {
    await page.route('*/**/api/articles*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ errors: { server: ['internal error'] } }),
      });
    });

    await page.goto(process.env.CONDUIT_FE || 'https://conduit.bondaracademy.com/', {
      waitUntil: 'domcontentloaded',
    });

    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.getByText('Global Feed')).toBeVisible();
  });
});
