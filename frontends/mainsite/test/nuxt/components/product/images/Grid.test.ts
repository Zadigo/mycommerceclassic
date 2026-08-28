import { describe, it, expect } from 'vitest'
import Grid from '~/components/product/images/Grid.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('components/product/images/Grid.vue', { tags: ['frontend'] }, () => {
  it('renders the component', async () => {
    const component = await mountSuspended(Grid)
    expect(component.exists()).toBe(true)
    
    const images = component.findAll('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('should have alt attributes for images', async () => {
    const component = await mountSuspended(Grid)
    const images = component.findAll('img')
    images.forEach((img) => {
      expect(img.attributes('alt')).toBeDefined()
    })
  })
})
