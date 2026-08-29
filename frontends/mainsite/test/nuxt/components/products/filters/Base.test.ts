import { describe, it, expect, vi, beforeEach } from 'vitest'
import Base from '~/components/products/filters/Base.vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { PRODUCT_FILTERS_FIXTURE } from '~~/test/__fixtures__/filters'
import type { NitroFetchRequest } from 'nitropack/types'

const mockStore = vi.hoisted(() => {
  const mockedAsyncData = vi.fn(() => {
    return {
      data: {
        data: {
          productFilters: []
        }
      } as ProductFilters
    }
  })

  return {
    mockedAsyncData
  }
})

mockNuxtImport('useAsyncData', () => mockStore.mockedAsyncData)

vi.mock('~/composables/products', async (original) => {
  const actual = await original<typeof import('~/composables/products')>()
  return {
    ...actual,
    useProductFiltersStore: vi.fn(() => {
      return {
        selectedFilters: ref([]),
        strSelectedFilters: ref([]),
      }
    })
  }
})

vi.mock('~/components/products/filters/FilterCheckbox.vue', () => {
  return {
    default: defineComponent({
      name: 'FilterCheckbox',
      template: '<div data-test-id="mock-filter-checkbox" class="mock-filter-checkbox" />'
    })
  }
})

describe.only('components/products/filters/Base.vue', { tags: ['frontend'] }, () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render the component', async () => {
    const component = await mountSuspended(Base)
    expect(component.exists()).toBe(true)
  })

  describe.each(
    [
      [{ testCase: 'with no filters', filters: {} as ProductFilters, selectedItem: [] }],
      [{ testCase: 'with filters', filters: PRODUCT_FILTERS_FIXTURE, selectedItem: ['XS'] }],
    ]
  )('should implement all interaction tests and rendering with $testCase', ({ testCase, filters, selectedItem }) => {
    it('should render the filter name', async () => {
      if (testCase === 'with filters') {
        mockStore.mockedAsyncData.mockReturnValueOnce({
          data: filters
        })
      }

      
      const component = await mountSuspended(Base, {
        data() {
          return {
            selectedItem: ref(selectedItem)
          }
        }
      })
      const filterElement = component.findAll('[data-test-id="mock-filter-checkbox"]')
      
      if (testCase === 'with no filters') {
        expect(component.find('p').exists()).toBeTruthy()
        expect(component.find('p').text()).toBe('No filters available')
        
        expect(filterElement.length).toBe(0)
        expect(component.html()).toMatchSnapshot()
      }
      
      if (testCase === 'with filters') {
        const expandButtons = component.findAll('button')
        expect(expandButtons.length).toBeGreaterThan(0)
        
        // console.log(component.html())

        expandButtons.forEach((button) => {
          button.trigger('click')
        })
        // expect(filterElement.length).toBeGreaterThan(0)
      }
    })
  })
})
