import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import ID from '~/pages/collection/[id].vue'
import { COLLECTION_PRODUCTS_FIXTURE } from '~~/test/__fixtures__/collection'

mockNuxtImport('$fetch', () => vi.fn())

mockNuxtImport('useAsyncData', () => {
  return vi.fn(() => ({
    data: COLLECTION_PRODUCTS_FIXTURE
  }))
})

vi.mock('~/components/products/filters/Base.vue', () => ({
  default: defineComponent({
    name: 'ProductsFiltersBase',
    template: '<div id="filters" />'
  })
}))

vi.mock('~/components/product/Card.vue', async () => {
  return {
    default: defineComponent({
      name: 'ProductCard',
      template: `<div data-test-id="product-card">{{ product.name }}</div>`,
      props: {
        product: {
          type: Object as PropType<BaseProduct>,
          required: true
        }
      }
    })
  }
})

describe('pages/collection/[id].vue', { tags: ['frontend'] }, () => {
  it('should render the collection page component', async () => {
    const component = await mountSuspended(ID)
    expect(component).toBeTruthy()
    console.log(component.html())
  })
})
