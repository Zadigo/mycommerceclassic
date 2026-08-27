import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Dynamic from '~/components/base/grids/Dynamic.vue'

describe('Dynamic.vue', () => {
  it.each([
    [{ grid: 4, scrollable: true, containerHeight: 'h-200' }],
    [{ grid: 3, scrollable: false, containerHeight: 'h-100' }],
    [{ grid: 2, scrollable: false, containerHeight: 'h-100' }],
    [{ grid: undefined, scrollable: false, containerHeight: 'h-100' }]
  ])('should render correctly with grid set to $grid', async ({ grid, scrollable, containerHeight }) => {
    const component = await mountSuspended(Dynamic, { props: { grid, scrollable, containerHeight } })
    expect(component.exists()).toBe(true)

    if (!grid) {
      expect(component.classes()).toContain('grid-cols-4')
    } else {
      if (scrollable) {
        expect(component.classes()).toContain('overflow-y-scroll')
        expect(component.classes()).toContain(containerHeight)
      }
  
      if (grid >= 3) {
        expect(component.classes()).toContain(`grid-cols-${grid}`)
      }
  
      if (grid < 3) {
        expect(component.classes()).not.toContain(`grid-cols-${grid}`)
      }
    }

  })  
})
