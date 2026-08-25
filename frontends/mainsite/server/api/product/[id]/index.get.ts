import { faker } from '@faker-js/faker'
import { Product } from '~~/shared/types/product'

export default defineEventHandler(async (_event) => {
  return {
    data: {
      product: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
      }
    }
  } as Product
})
