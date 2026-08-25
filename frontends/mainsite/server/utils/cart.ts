import type { CartItem } from '#shared/types/cart'

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity * item.product.price, 0)
}

export function calculateNumberOfItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}
