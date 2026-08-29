import { createErrorTemplate } from "#shared/errors"
import type { UserDetails } from '#shared/types/profile'
import { faker } from '@faker-js/faker'

export default defineEventHandler(async (event) => {
  try {
    const _id = getRouterParam(event, 'id')

    return {
      data: {
        user: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          username: faker.person.fullName()
        }
      }
    } as UserDetails
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
