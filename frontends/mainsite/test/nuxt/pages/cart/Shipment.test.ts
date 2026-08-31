import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Shipment from '~/pages/cart/shipment.vue'

describe('pages/cart/shipment.vue', { tags: ['frontend'] }, () => {
  it('should render component properly', async () => {
    const component = await mountSuspended(Shipment)
    expect(component.exists()).toBe(true)
  })
})

