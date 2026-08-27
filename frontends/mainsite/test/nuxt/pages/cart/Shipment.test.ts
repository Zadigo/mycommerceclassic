import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Shipment from '~/pages/cart/shipment.vue'

describe('cart/shipment.vue', () => {
  it('should render component properly', async () => {
    const component = await mountSuspended(Shipment)
    expect(component.exists()).toBe(true)
  })
})

