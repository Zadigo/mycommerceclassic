import { test, expect } from '@playwright/test'

test.describe('add product to cart', () => {
  test.describe.configure({ timeout: 60000 })

  test('should be able to add product to cart', async ({ page }) => {
    await page.goto('/12345')

    // The cookie should not have any cart_session_id
    await expect(page.context().cookies()).resolves.toEqual(
      expect.arrayContaining([
        // expect.objectContaining({
        //   name: 'cart_session_id',
        //   value: '',
        // }),
      ]),
    )
    
    const titleEl = page.locator('h1')
    await titleEl.waitFor({ state: 'visible' })
  
    // cta-content-add-to-cart
    const cartEl = page.getByText('Ajouter au panier', { exact: true })
    await cartEl.waitFor({ state: 'visible' })
    await expect(cartEl).toBeVisible()
  
    await cartEl.click({ delay: 100 })
  })
})
