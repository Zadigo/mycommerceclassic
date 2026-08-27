import { describe, it, expect, vi, beforeEach } from 'vitest'
import { calculateNumberOfItems, calculateTotal } from '#server/utils/cart'
import { CART_ITEMS } from '~~/test/__fixtures__/cart'

describe('server/utils/cart/calculateTotal', () => {
  const simplifiedItem: CartItem = { ...CART_ITEMS[0] as CartItem }

  beforeEach(() => {
    // Reset the values of the item to simple
    // values for testing purposes
    simplifiedItem.product.price = 10
    simplifiedItem.quantity = 1
    simplifiedItem.total = 0
  })

  it.each(
    [
      [{ values: [simplifiedItem], expected: 10 }],
      [{ values: [simplifiedItem, simplifiedItem], expected: 20 }],
      [{ values: [{ ...simplifiedItem, quantity: 2 }], expected: 20 }],
    ]
  )('should return total of $expected€', ({ values, expected }) => {
    const total = calculateTotal(values)
    expect(total).toBe(expected)
  })
})

describe('server/utils/cart/calculateNumberOfItems', () => {
  const simplifiedItem: CartItem = { ...CART_ITEMS[0] as CartItem }

  beforeEach(() => {
    // Reset the values of the item to simple
    // values for testing purposes
    simplifiedItem.product.price = 10
    simplifiedItem.quantity = 1
    simplifiedItem.total = 0
  })

  it.each(
    [
      [{ values: [simplifiedItem], expected: 1 }],
      [{ values: [simplifiedItem, simplifiedItem], expected: 2 }],
      [{ values: [{ ...simplifiedItem, quantity: 2 }, simplifiedItem], expected: 3 }],
    ]
  )('should return number of items $expected', ({ values, expected }) => {
    const total = calculateNumberOfItems(values)
    expect(total).toBe(expected)
  })
})

