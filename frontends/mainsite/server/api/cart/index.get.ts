import { getOrCreateSession } from '#server/utils/session'

export default defineEventHandler(async (event) => {
  const { data } = await getOrCreateSession(event)
  return data.cart.items
})
