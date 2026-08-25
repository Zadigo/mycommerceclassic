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
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          active: faker.datatype.boolean(),
          ageGroupCategory: faker.helpers.arrayElement([ 'Adult', 'Kids', 'Teens' ]),
          category: faker.commerce.department(),
          color: faker.color.human(),
          createdOn: faker.date.past().toISOString(),
          displayNew: faker.datatype.boolean(),
          genderCategory: faker.helpers.arrayElement([ 'Male', 'Female', 'Unisex' ]),
          hasSizes: faker.datatype.boolean(),
          modelHeight: faker.number.int({ min: 150, max: 200 }),
          modelSize: faker.number.int({ min: 30, max: 50 }),
          modifiedOn: faker.date.recent().toISOString(),
          onSale: faker.datatype.boolean(),
          price: parseFloat(faker.commerce.price()),
          salePrice: parseFloat(faker.commerce.price()),
          saleValue: parseFloat(faker.commerce.price()),
          sku: faker.string.alphanumeric(10),
          slug: faker.helpers.slugify(faker.commerce.productName()),
          subCategory: faker.commerce.department(),
          unitPrice: parseFloat(faker.commerce.price()),
          video: null,
          mainImage: {
            id: faker.string.uuid(),
            active: faker.datatype.boolean(),
            createdOn: faker.date.past().toISOString(),
            isMainImage: true,
            name: faker.system.fileName(),
            original: '/img2.webp',
            thumbnail: '/img2.webp',
            variant: faker.helpers.arrayElement([ 'default', 'red', 'blue', 'green' ]),
          },
          productImages: Array.from({ length: 3 }, () => ({
            id: faker.string.uuid(),
            active: faker.datatype.boolean(),
            createdOn: faker.date.past().toISOString(),
            isMainImage: false,
            name: faker.system.fileName(),
            original: '/img2.webp',
            thumbnail: '/img2.webp',
            variant: faker.helpers.arrayElement([ 'default', 'red', 'blue', 'green' ]),
          })),
          sizeSet: null,
        }))
      }
    }
  } as CollectionProducts
})
