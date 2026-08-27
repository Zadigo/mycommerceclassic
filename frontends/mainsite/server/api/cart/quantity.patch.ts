import type { CartItem } from '#shared/types/cart'
import { FieldValue } from 'firebase-admin/firestore'
import { filterCartItemsFunc } from '#shared/cart'
import { createErrorTemplate } from '#shared/utils'
import { calculateTotal, calculateNumberOfItems } from '#server/utils/cart'

type QuantityRequestBody = {
  direction: 'increase' | 'decrease'
  cartItem: CartItem
  size?: string
}

type QuantityResponse = {
  success: boolean
  total: number
  numberOfItems: number
}

export default defineEventHandler(async (event) => {
  try {
    const { docRef, data } = await getOrCreateSession(event)
    const existingItems = data.cart.items
    const body = await readBody<QuantityRequestBody>(event)
    const itemIndex = existingItems.findIndex(filterCartItemsFunc(body.cartItem))

    if (itemIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Item not found in cart' })
    }

    const item = existingItems[itemIndex]
    if (item && body.direction === 'increase') {
      item.quantity += 1
    } else if (item && body.direction === 'decrease') {
      item.quantity -= 1
      
      if (item.quantity <= 0) {
        existingItems.splice(itemIndex, 1)
      }
    }

    await docRef.update({
      'cart.items': existingItems,
      'cart.total': calculateTotal(existingItems),
      'cart.numberOfItems': calculateNumberOfItems(existingItems),
      'cart.updatedAt': FieldValue.serverTimestamp()
    })

    return { success: true, total: calculateTotal(existingItems), numberOfItems: calculateNumberOfItems(existingItems) } as QuantityResponse
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
