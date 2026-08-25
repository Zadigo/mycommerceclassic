import { test } from '@playwright/test'

test.describe('collection filtering', () => {
  test.describe.configure({ timeout: 60000 })

  test('should be able to filter the collection on the page', async ({ page }) => {
    await page.goto('/collection/some-collection')

    // await page.waitForEvent('response', (response) => response.url().includes('api/collection/sous-vetements-femme/filters') && response.status() === 200)
  
    await page.waitForSelector('h1', { state: 'visible' })
  
    const sizeFilter = page.locator('#filter-expand-Size')
    await sizeFilter.waitFor({ state: 'visible' })

    await sizeFilter.isVisible()
    await sizeFilter.click({ button: 'left' })
  })
})

test('should be able to interact with product', async ({ page }) => {
  await page.goto('/collection/some-collection')

  // await page.waitForEvent('response', (response) => response.url().includes('/api/products') && response.status() === 200)
  // await page.locator('#product-header-card__like__though-once-versus').click()
})
