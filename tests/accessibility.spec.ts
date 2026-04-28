import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility checks', () => {
  test('form layouts has no critical axe violations', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const results = await new AxeBuilder({ page }).analyze();
    const criticalViolations = results.violations.filter((violation) => violation.impact === 'critical');

    expect(criticalViolations).toEqual([]);
  });
});
