import { calculateTotal, calculateNumberOfItems } from '#server/utils/cart'
import { getOrCreateSession } from '#server/utils/session'
import { createErrorTemplate } from '#shared/errors'

type RemoveCartItemRequestBody = { id: string, size: string }

export default defineEventHandler(async (event) => {
  const body = await readBody<RemoveCartItemRequestBody>(event)

  try {
    const { docRef, data } = await getOrCreateSession(event)
    const newItems = data.cart.items.filter(item => !(item.product.id === body.id && item.size.name === body.size))

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
