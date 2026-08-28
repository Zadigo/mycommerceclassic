import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Recommendations from '~/components/base/Recommendations.vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'

const mockStore = vi.hoisted(() => {
  const mockFetch = vi.fn(async () => {
    return {
       data: {
        collectionRecommendations: {
           id: 'some-id',
           name: 'some-name',
           reference: 'some-reference',
           products: []
        }
       }
    } as CollectionRecommendations
  })
  return { mockFetch }
})

mockNuxtImport('$fetch', () => mockStore.mockFetch)

vi.mock('~/components/product/Card.vue', async () => {
  return {
    default: defineComponent({
      name: 'ProductCard',
      template: '<div data-test-id="product-card">ProductCard</div>'
    })
  }
})

vi.mock('@vueuse/motion', async (original) => {
  const actual = await original<typeof import('@vueuse/motion')>()
  return {
    ...actual,
    MotionComponent: defineComponent({
      name: 'MotionComponent',
      template: '<div data-test-id="motion-component"><slot /></div>'
    })
  } 
})

describe('components/base/Recommendations.vue', { tags: ['frontend'] }, () => {
  it('should render recommendations properly', async () => {
    const component = await mountSuspended(Recommendations)
    expect(component.exists()).toBe(true)

    const title = component.find('h2')
    expect(title).toBeDefined()
  })

  it.each(
    [
      [{ showTitle: false, sizeClass: 'h-100' }],
      [{ showTitle: true, sizeClass: 'h-100' }]
    ]
  )('should render with showTitle set to $showTitle and size class to $sizeClass', async ({ showTitle, sizeClass }) => {
    const component = await mountSuspended(Recommendations, {
      props: {
        showTitle,
        sizeClass
      }
    })
    
    if (showTitle) {
      expect(component.find('h2').exists()).toBeTruthy()
    }

    if (!showTitle) {
      expect(component.find('h2').exists()).toBeFalsy()
    }

    // expect(component.classes()).toContain('h-100')
  })

  it.each(
    [
      [{testCase: 'products is undefined', products: []}],
      [{testCase: 'products has values', products: [PRODUCT_NODE_FIXTURE.node]}]
    ]
  )('should render products from fetch when products $testCase', async ({ products }) => {
    mockStore.mockFetch.mockResolvedValue({
      data: {
        collectionRecommendations: {
          id: 'some-id-1',
          name: 'some-name-1',
          reference: 'some-reference-1',
          products: products
        }
      }
    })

    const component = await mountSuspended(Recommendations)
    expect(component.exists()).toBe(true)

    expect(mockStore.mockFetch).toHaveBeenCalled()
    expect(mockStore.mockFetch).toHaveBeenCalledWith('/api/collection/recommendations', { method: 'GET' })
  })
})

