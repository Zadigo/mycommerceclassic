import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import Card from '~/components/product/Card.vue'
import { PRODUCT_FIXTURE } from '~~/test/__fixtures__/product'

describe('Card Component', () => {
  it('should render the Card component', async () => {
    const component = await mountSuspended(Card, {
      props: {
        product: PRODUCT_FIXTURE
      }
    })

    expect(component.exists()).toBe(true)

    const likeButtonEl = component.find('button[id^="product-header-card__like__"]')
    expect(likeButtonEl.exists()).toBe(true)
    expect(likeButtonEl.isVisible()).toBe(true)
    expect(likeButtonEl.attributes('disabled')).toBeUndefined()

    const imageEl = component.find('img')
    expect(imageEl.exists()).toBe(true)
    expect(imageEl.isVisible()).toBe(true)
    expect(imageEl.attributes('src')).toBeDefined()
    expect(imageEl.attributes('alt')).toBeDefined()

    const linkEl = component.find('a')
    expect(linkEl.exists()).toBe(true)
    expect(linkEl.isVisible()).toBe(true)
    expect(linkEl.attributes('href')).toBeDefined()
  })
})
