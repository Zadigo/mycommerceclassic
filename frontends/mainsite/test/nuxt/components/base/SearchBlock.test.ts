import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SearchBlock from '~/components/base/SearchBlock.vue'
import { PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'
import type { BaseProduct } from '#shared/types/product'

const mockStore = vi.hoisted(() => {
  const useSearchComposable = vi.fn(() => {
    return {
      searchQuery: ref(''),
      strHistory: ref<string[]>([]),
      searched: ref<SearchProducts>({
        data: {
          searchProducts: {
            edges: [],
          }
        }
      })
    }
  })

  return { useSearchComposable }
})

vi.mock('~/composables/search', async (original) => {
  const actual = await original<typeof import('~/composables/search')>()
  return {
    ...actual,
    useSearchComposable: mockStore.useSearchComposable
  }
})

vi.mock('~/components/base/Recommendations.vue', async () => {
  return {
    default: defineComponent({
      name: 'Recommendations',
      template: '<div data-test-id="recommendations">Recommendations</div>'
    })
  }
})

vi.mock('~/components/product/Card.vue', async () => {
  return {
    default: defineComponent({
      name: 'ProductCard',
      template: '<div data-test-id="product-card">{{ product.name }}</div>',
      props: {
        product: {
          type: Object as PropType<BaseProduct>,
          required: true
        }
      }
    })
  }
})

describe('components/base/SearchBlock.vue', { tags: ['frontend'] }, () => {
  it('should render component properly', async () => {
    const component = await mountSuspended(SearchBlock)
    expect(component.exists()).toBe(true)
    
    const inputEl = component.find('input[type="search"]')
    expect(inputEl.exists()).toBe(true)

    // When there are no search values render the recommendations
    expect(component.find('[data-test-id="recommendations"]').exists()).toBe(true)
  })

  it.each(
    [
      { searchQuery: '""', strHistory: ['test1', 'test2'], searched: { data: { searchProducts: { edges: [] } } } },
      { searchQuery: 'test', strHistory: ['test1', 'test2'], searched: { data: { searchProducts: { edges: [PRODUCT_NODE_FIXTURE] } } } }
    ]
  )('should render component properly when searchQuery is $searchQuery', async ({ searchQuery, strHistory, searched }) => {
    const searchQueryRef = ref(searchQuery)

    mockStore.useSearchComposable.mockReturnValue({
      searchQuery: searchQueryRef,
      strHistory: ref(strHistory),
      searched: ref(searched)
    })

    const component = await mountSuspended(SearchBlock)
    expect(component.exists()).toBe(true)

    
    const inputEl = component.find('input[type="search"]')
    expect(inputEl.exists()).toBe(true)
    
    // searchQueryRef.value = 'new search'
    // await component.vm.$nextTick()
    
    // expect(inputEl.element.value).toBe('new search')
    // console.log(component.html())
    
    if (searched.data.searchProducts.edges.length > 0) {
      // When there are no search values render the recommendations
      expect(component.find('[data-test-id="recommendations"]').exists()).toBe(false)
      expect(component.find('[data-test-id="product-card"]').exists()).toBe(true)
    }
  })
})

