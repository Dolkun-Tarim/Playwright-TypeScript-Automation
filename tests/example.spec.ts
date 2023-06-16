import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test('Community link', async ({ page }) => {
 await page.goto('https://playwright.dev/');

    // Click the get Community link.
    await page.getByRole('link',{name: 'Community'}).click();
     // Expects the URL to contain welcome.
    await expect(page.locator('div>h1')).toHaveText('Welcome');
   
  });