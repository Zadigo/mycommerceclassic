import type { CartItem } from '#shared/types/cart'
import { filterCartItemsFunc } from '#shared/cart'
import { calculateTotal, calculateNumberOfItems } from '#server/utils/cart'
import { getOrCreateSession } from '#server/utils/session'
import { createErrorTemplate } from '#shared/errors'
import { usePrecision } from '@vueuse/math'
import { toValue } from 'vue'

export default defineEventHandler(async (event) => {
  const body = await readBody<CartItem>(event)

  try {
    const { docRef, data } = await getOrCreateSession(event)
    const existingItems = data.cart.items
    const itemIndex = existingItems.findIndex(filterCartItemsFunc(body))

    let newItems: CartItem[] = []

    if (itemIndex !== -1) {
      newItems = existingItems.map((item, idx) => {
        if (idx !== itemIndex) return item
        const quantity = item.quantity + body.quantity
        return { ...item, quantity, total: toValue(usePrecision(quantity * item.product.price, 2)) }
      })
    } else {
      newItems = [...existingItems, body]
    }

    await docRef.update({
      'cart.items': newItems,
      'cart.total': calculateTotal(newItems),
      'cart.numberOfItems': calculateNumberOfItems(newItems)
    })

    return { success: true }
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
