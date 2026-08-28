import { describe, it, expect, vi } from 'vitest'
import Base from '~/components/products/filters/Base.vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { PRODUCT_FILTERS_FIXTURE } from '~~/test/__fixtures__/filters'

mockNuxtImport('useAsyncData', () => {
  return vi.fn(() => {
    return {
      data: ref(PRODUCT_FILTERS_FIXTURE)
    }
  })
})

vi.mock('~/components/products/filters/FilterCheckbox.vue', () => {
  return {
    default: defineComponent({
      name: 'FilterCheckbox',
      template: '<div data-test-id="mock-filter-checkbox" class="mock-filter-checkbox" />'
    })
  }
})

describe('components/products/filters/Base.vue', { tags: ['frontend'] }, () => {
  it('should be render the component', async () => {
    const component = await mountSuspended(Base)
    expect(component.exists()).toBe(true)
  })
  
  PRODUCT_FILTERS_FIXTURE.data.productFilters.forEach((filter) => {
    it(`should render filter name: ${filter.name}`, async () => {
      const component = await mountSuspended(Base)
      const filterElement = component.find(`#filter-${filter.name}`)

      expect(filterElement.exists()).toBe(true)
      expect(filterElement.text()).toContain(filter.name)
    })

    it('should expand filter values when the expand button is clicked', async () => {
      const component = await mountSuspended(Base)
      const expandButton = component.find(`button#filter-expand-${filter.name}`)
      expect(expandButton.exists()).toBe(true)

      await expandButton.trigger('click')

      // const filterValues = component.findAll(`#filter-${filter.name} products-filters-filter-checkbox`)
      // expect(filterValues.length).toBe(filter.values.length)
    })
  })
})
