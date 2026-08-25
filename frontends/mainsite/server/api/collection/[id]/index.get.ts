import type { CollectionProducts } from '~~/shared/types/collection'
import { faker } from '@faker-js/faker'

export default defineEventHandler(async (_event) => {
  return {
    data: {
      collection: {
        id: faker.number.int({ min: 1, max: 1000 }).toString(),
        reference: `coll-${faker.string.uuid()}`,
        name: faker.word.words({ count: { min: 2, max: 5 } }),
        products: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, () => ({
          id: faker.number.int({ min: 1, max: 1000 }).toString(),
          reference: `prod-${faker.string.uuid()}`,
          name: faker.commerce.productName()
        }))
      }
    }
  } as CollectionProducts
})
