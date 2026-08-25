import { test } from '@playwright/test'

test('should be able to filter the collection on the page', async ({ page }) => {
  await page.goto('/collection/some-collection')

  await page.waitForSelector('h1')
  await page.waitForSelector('#filter-expand-Size')

  const sizeFilter = page.locator('#filter-expand-Size')
  await sizeFilter.isVisible()
  await sizeFilter.click()
})

test('should be able to interact with product', async ({ page }) => {
  await page.goto('/collection/some-collection')

  // await page.waitForEvent('response', (response) => response.url().includes('/api/products') && response.status() === 200)
  // await page.locator('#product-header-card__like__though-once-versus').click()
})
