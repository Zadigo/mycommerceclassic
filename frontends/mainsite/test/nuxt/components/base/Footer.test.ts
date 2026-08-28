import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Footer from '~/components/base/Footer.vue'

describe('components/base/Footer.vue', { tags: ['frontend'] }, () => {
  it('should render the footer correctly', async () => {
    const component = await mountSuspended(Footer)
    expect(component.exists()).toBe(true)
  })  

  it('should have correct src and alt attributes for all images', async () => {
    const component = await mountSuspended(Footer)
    const imageEls = component.findAll('img')

    imageEls.forEach((img) => {
      expect(img.attributes('src')).toBeDefined()
      expect(img.attributes('alt')).toBeDefined()
    })
  })
})
