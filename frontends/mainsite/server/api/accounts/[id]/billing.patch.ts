import { createErrorTemplate } from "~~/shared/errors"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UpdateProfileFormData>(event)
    const _validatedData = BaseAddressSchema.parse(body)
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
