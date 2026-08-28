import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Navbar from '~/components/base/Navbar.vue'

vi.mock('~/components/base/SearchBlock.vue', async () => {
  return {
    default: defineComponent({
      name: 'SearchBlock',
      template: '<div data-test-id="search-block">SearchBlock</div>'
    })
  }
})


describe('components/base/Navbar.vue', { tags: ['frontend'] }, () => {
  it('should render the navbar correctly', async () => {
    const component = await mountSuspended(Navbar)
    expect(component.exists()).toBe(true)
  })  
})
