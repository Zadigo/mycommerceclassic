import { createErrorTemplate } from "~~/shared/errors"
import { UpdatePersonalDataSchema } from '#shared/types/profile'
import type { UpdateProfileFormData } from '#shared/types/profile'

export default defineEventHandler(async (event) => {
  try {
    const _id = getRouterParam(event, 'id')
    const body = await readBody<UpdateProfileFormData>(event)
    
    const _validatedData = UpdatePersonalDataSchema.parse(body)

    return { message: 'Profile updated successfully' }
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
