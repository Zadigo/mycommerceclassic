import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import ID from '~/pages/collection/[id].vue'
import { COLLECTION_PRODUCTS_FIXTURE } from '~~/test/__fixtures__/collection'

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

describe('Collection Page', () => {
  it('should render the collection page component', async () => {
    const component = await mountSuspended(ID)
    expect(component).toBeTruthy()
  })
})
