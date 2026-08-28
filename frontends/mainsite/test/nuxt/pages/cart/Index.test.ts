import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Index from '~/pages/cart/index.vue'
import { CART_ITEMS } from '~~/test/__fixtures__/cart'

const mockStore = vi.hoisted(() => {
  const mockUseCartItemsComposable = vi.fn(() => {
    return {
      items: [] as CartItem[]
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

vi.mock('~/components/cart/Card.vue', async () => {
  return {
    default: defineComponent({
      name: 'CartCard',
      template: '<div data-test-id="cart-card">{{ item.product.name }}</div>',
      props: {
        item: {
          type: Object as PropType<CartItem>,
          required: true
        }
      }
    })
  }
})

describe('pages/cart/index.vue', { tags: ['frontend'] }, () => {
  it.each([
    [{ testCase: 'without items', items: [] }],
    [{ testCase: 'with items', items: CART_ITEMS }]
  ])('should render component properly with $testCase', async ({ items }) => {
    mockStore.mockUseCartItemsComposable.mockReturnValue({ items })

    const component = await mountSuspended(Index)
    expect(component.exists()).toBe(true)

    const emptyCartComponent = component.find('#cart-empty')

    if (items.length === 0) {
      expect(emptyCartComponent.exists()).toBe(true)
    }

    if (items.length > 0) {
      expect(emptyCartComponent.exists()).toBeFalsy()
      expect(component.findAll('[data-test-id="cart-card"]').length).toBe(items.length)
    }
  })  
})
  
