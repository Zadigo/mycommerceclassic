import { createErrorTemplate } from "~~/shared/errors"

export default defineEventHandler(async (event) => {
  try {
    return [
      {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Man',
        telephone: {
          countryCode: '+1',
          phone: '1234567890',
        },
        address: '123 Main St',
        city: 'Anytown',
        postalCode: '12345',
        province: 'State',
        country: 'Country',
        isBusiness: false,
        businessName: '',
        vatNumber: '',
        siretNumber: '',
      }
    ] as GenderAddressFormData[]
  } catch (error) {
    throw createError(createErrorTemplate(error))
  }
})
