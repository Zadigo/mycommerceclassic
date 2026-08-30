import { useLoadFixtures } from '#server/utils/testing'
import { createErrorTemplate } from '#shared/errors'
 
export default defineEventHandler(async (event) => {
  try {
    const _id = getRouterParam(event, 'id')
    
    const { getProduct } = useLoadFixtures()
    return getProduct(event)
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
