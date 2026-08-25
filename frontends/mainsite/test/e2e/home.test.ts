import { test } from '@playwright/test'

test('Home page should load', async ({ page }) => {
  await page.goto('/')
})
