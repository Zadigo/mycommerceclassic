import { UpdateEmailFormData, UpdateEmailSchema } from '#shared/types/profile'
import { createErrorTemplate } from '#shared/errors'

type RequestBody = {
  currentPassword: string
  data: UpdateEmailFormData
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RequestBody>(event)
    const _validatedBody = UpdateEmailSchema.parse(body.data)
    return {
      message: 'Email updated successfully',
    }
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
