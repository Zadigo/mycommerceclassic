import { describe, it, vi, beforeEach, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Base from '~/components/products/filters/Base.vue'
import { useProductFiltersProvider } from '~/composables/products.ts'
import { defineComponent } from 'vue'

mockNuxtImport('$fetch', () => vi.fn())

describe('integrations: components/products/filters/Base.vue', { tags: ['integration', 'frontend'] }, () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render the component correctly', async () => {
    const Child = defineComponent({
      name: 'TestComponent',
      components: {
        Base
      },
      template: `
        <div data-test-id="child">
          <Base />
        </div>
      `
    })

    const Parent = defineComponent({
      name: 'TestComponent',
      components: {
        Child,
        Base
      },
      template: `
        <div data-test-id="parent">
          <Child />
        </div>
      `,
      setup() {
        useProductFiltersProvider()
      }
    })

    const component = await mountSuspended(Parent)
    expect(component.exists()).toBe(true)
  })  
})
