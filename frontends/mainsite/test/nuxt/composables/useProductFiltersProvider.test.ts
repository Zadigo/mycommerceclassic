import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProductFiltersProvider, useProductFiltersStore } from '~/composables/products'


describe('useProductFiltersProvider', () => {
  let component: ReturnType<typeof defineComponent> | undefined = undefined

  beforeEach(() => {
    const childComponent = defineComponent({
      name: 'ChildComponent',
      template: `<div data-test-id="child-component"></div>`,
      setup() {
        const { selectedFilters, addFilter } = useProductFiltersStore()
        return {
          selectedFilters,
          addFilter
        }
      }
    })

    component = defineComponent({
      name: 'TestComponent',
      components: { childComponent },
      template: `
      <div>
        <child-component />

        <p data-test-id="selected-filters">{{ selectedFilters.sizes[0] }}</p>

        <button data-test-id="action" @click="addFilter('sizes', 'M')">
          M
        </button>
      </div>`,
      setup() {
        const { selectedFilters, addFilter } = useProductFiltersProvider()
        return {
          selectedFilters,
          addFilter
        }
      }
    })
  })

  it('should initialize selectedFilters with empty arrays', async () => {
    if (component) {
      const wrapper = await mountSuspended(component)
      await wrapper.find('[data-test-id="action"]').trigger('click')
      
      const selectedFiltersText = wrapper.find('[data-test-id="selected-filters"]').text()
      expect(selectedFiltersText).toBe('M')

      // The size should be removed when the button is clicked again
      await wrapper.find('[data-test-id="action"]').trigger('click')
      const selectedFiltersTextAfterSecondClick = wrapper.find('[data-test-id="selected-filters"]').text()
      expect(selectedFiltersTextAfterSecondClick).toBe('')
    }
  })
})
