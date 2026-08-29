import { createErrorTemplate } from "~~/shared/errors"

type AutocompleteType = 'country' | 'state' | 'city' | 'zip'

type RequestBody = {
  using: AutocompleteType
}

type ResponseBody = {
  name: AutocompleteType
  suggestions: string[]
}

/**
 * A GET endpoint that returns a list of autocomplete suggestions 
 * for the specified type (country, state, city, or zip).
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RequestBody>(event)

    switch (body.using) {
      case 'country':
        return {} as ResponseBody
      case 'state':
        return {} as ResponseBody
      case 'city':
        return {} as ResponseBody
      case 'zip':
        return {} as ResponseBody
      default:
        throw createError({
          statusCode: 400,
          statusMessage: `Invalid autocomplete type: ${body.using}`,
        })
    }
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
