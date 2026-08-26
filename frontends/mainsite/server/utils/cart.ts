import type { CartItem } from '#shared/types/cart'

/**
 * Calculates the total price of all items in the cart.
 * @param items The array of cart items to calculate the total for.
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity * item.product.price, 0)
}

/**
 * Calculates the total number of items in the cart.
 * @param items The array of cart items to count.
 */
export function calculateNumberOfItems(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}
