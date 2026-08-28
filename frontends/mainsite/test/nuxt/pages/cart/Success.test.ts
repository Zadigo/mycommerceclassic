import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Success from '~/pages/cart/success.vue'

vi.stubGlobal('import', () => {
  return defineComponent({
    name: 'Recommendations',
    template: '<div data-test-id="recommendations">Recommendations</div>'
  })
})

describe('pages/cart/success.vue', { tags: ['frontend'] }, () => {
  it('should render component properly', async () => {
    const component = await mountSuspended(Success)
    expect(component.exists()).toBe(true)
  })
})

