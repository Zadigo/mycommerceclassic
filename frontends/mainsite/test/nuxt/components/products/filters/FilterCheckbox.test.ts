import { describe, it, expect, vi, assert } from 'vitest'
import FilterCheckbox from '~/components/products/filters/FilterCheckbox.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const mockStore = vi.hoisted(() => ({
  selectedFilters: null,
  addFilter: vi.fn()
}))

vi.mock('~/composables/products', async (original) => {
  const actual = await original<typeof import('~/composables/products.ts')>()

  const selectedFiltersRef = ref({
    sizes: [],
    materials: []
  })

  mockStore.selectedFilters = selectedFiltersRef

  return {
    ...actual,
    useProductFiltersStore: vi.fn(() => {
      return {
        selectedFilters: mockStore.selectedFilters,
        addFilter: mockStore.addFilter,
      }
    })
  }
})

describe('components/products/filters/FilterCheckbox.vue', { tags: ['frontend'] }, () => {
  const sizes: Size[] = [
    {
      'name': 'S',
    }
  ]

  sizes.forEach((size) => {
    it(`should render the component with size: ${size.name}`, async () => {
      const component = await mountSuspended(FilterCheckbox, {
        props: {
          size,
        }
      })
      expect(component.exists()).toBe(true)
    })

    it('should be able to select size', async () => {
      const component = await mountSuspended(FilterCheckbox, {
        props: {
          size,
        }
      })
      const checkbox = component.find(`#product-filter-${size.name}`)
      expect(checkbox.exists()).toBe(true)
      
      await checkbox.trigger('click')

      expect(mockStore.addFilter).toHaveBeenCalledWith('sizes', size.name)
    })
  })
})
