import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Payment from '~/pages/cart/payment.vue'

const mockStore = vi.hoisted(() => {
  const mockUseCartItemsComposable = vi.fn(() => {
    return {
      items: [] as CartItem[],
      docRef: ref({
        cart: {
          total: 0
        }
      })
    }
  })
  return {
    mockUseCartItemsComposable
  }
})

vi.mock('~/composables/cart', async (original) => {
  const actual = await original<typeof import('~/composables/cart')>()
  return {
    ...actual,
    useCartItemsComposable: mockStore.mockUseCartItemsComposable
  }
})

describe('cart/payment.vue', () => {
  it('should render component properly', async () => {
    const component = await mountSuspended(Payment)
    expect(component.exists()).toBe(true)

    const homeLink = component.find('a')
    expect(homeLink.attributes('id')).toBeDefined()
    expect(homeLink.text()).toContain('Payer 0€')
  })
})

