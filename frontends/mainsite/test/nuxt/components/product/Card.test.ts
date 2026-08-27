import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import Card from '~/components/product/Card.vue'
import { PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'

describe('Card Component', () => {
  it('should render the Card component', async () => {
    const component = await mountSuspended(Card, {
      props: {
        product: PRODUCT_NODE_FIXTURE.node
      }
    })

    expect(component.exists()).toBe(true)

    const likeButtonEl = component.find('button[id^="product-card-like__"]')
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

  const testCases = [
    { type: 'displayNew', text: 'New' },
    { type: 'onSale', text: '10%' }
  ]

  testCases.forEach(({ type, text }) => {
    it(`should render the Card component with badges for ${type}`, async () => {
      if (type === 'displayNew') {
        PRODUCT_NODE_FIXTURE.node.displayNew = true
      }

      if (type === 'onSale') {
        PRODUCT_NODE_FIXTURE.node.onSale = true
        PRODUCT_NODE_FIXTURE.node.saleValue = 10
      }
      
      const component = await renderSuspended(Card, {
        props: {
          product: PRODUCT_NODE_FIXTURE.node
        }
      })

      if (type === 'displayNew') {
        expect(component.getByText(text, { exact: true })).toBeDefined()
      }

      if (type === 'onSale') {
        expect(component.getByText(text, { exact: true })).toBeDefined()
      }
    })
  })
})
