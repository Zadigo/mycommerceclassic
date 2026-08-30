import { createErrorTemplate } from '#shared/errors'
import type { SimpleResponseBody } from '#shared/types/responses'

export default defineEventHandler(async (event) => {
  try {
    const _id = getRouterParam(event, 'id')
    return { status: true } as SimpleResponseBody
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
