import { faker } from '@faker-js/faker'
import type { CollectionProducts } from '#shared/types/collection'
import { PRODUCT_NODE_FIXTURE } from './product'

export const COLLECTION_PRODUCTS_FIXTURE: CollectionProducts = {
  data: {
    collection: {
      id: faker.number.int({ min: 1, max: 1000 }).toString(),
      reference: `coll-${faker.string.uuid()}`,
      name: faker.word.words({ count: { min: 2, max: 5 } }),
      products: [
        PRODUCT_NODE_FIXTURE.node
      ]
    }
  }
}
