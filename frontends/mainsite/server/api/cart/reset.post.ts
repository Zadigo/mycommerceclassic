import { getOrCreateSession } from '#server/utils/session'
import { createErrorTemplate } from '#shared/errors'

export default defineEventHandler(async (event) => {
  try {
    const { docRef, sessionId } = await getOrCreateSession(event)

    await docRef.update({
      'cart.items': [],
      'cart.total': 0,
      'cart.numberOfItems': 0
    })

    return { sessionId }
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
