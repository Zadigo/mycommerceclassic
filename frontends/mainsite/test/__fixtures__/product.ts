import type { ProductNode } from '#shared/types/product'
import { faker } from '@faker-js/faker'

export const PRODUCT_FIXTURE: ProductNode = {
  node: {
    id: '1',
    name: faker.commerce.productName(),
    reference: faker.string.uuid(),
  }
}
