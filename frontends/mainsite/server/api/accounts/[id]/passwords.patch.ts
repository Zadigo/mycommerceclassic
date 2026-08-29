import { UpdatePasswordFormData, UpdatePasswordSchema } from '#shared/types/profile'
import { createErrorTemplate } from '#shared/errors'

type RequestBody = {
  currentPassword: string
  data: UpdatePasswordFormData
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RequestBody>(event)
    const _validatedBody = UpdatePasswordSchema.parse(body.data)
    return {
      message: 'Password updated successfully',
    }
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
