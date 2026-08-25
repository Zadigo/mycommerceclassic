import { faker } from '@faker-js/faker'
import { Product } from '~~/shared/types/product'

export default defineEventHandler(async (_event) => {
  return {
    data: {
      product: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        active: faker.datatype.boolean(),
        ageGroupCategory: faker.helpers.arrayElement(['Adult', 'Kids', 'Teens']),
        category: faker.commerce.department(),
        color: faker.color.human(),
        createdOn: faker.date.past().toISOString(),
        displayNew: faker.datatype.boolean(),
        genderCategory: faker.helpers.arrayElement(['Male', 'Female', 'Unisex']),
        hasSizes: faker.datatype.boolean(),
        modelHeight: faker.number.int({ min: 150, max: 200 }),
        modelSize: faker.number.int({ min: 30, max: 50 }),
        modifiedOn: faker.date.recent().toISOString(),
        onSale: faker.datatype.boolean(),
        price: faker.number.float({ min: 10, max: 30 }),
        salePrice: faker.number.float({ min: 10, max: 100 }),
        saleValue: faker.number.int({ min: 10, max: 100 }),
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
          variant: faker.helpers.arrayElement(['default', 'red', 'blue', 'green']),
        },
        productImages: Array.from({ length: 3 }, () => ({
          id: faker.string.uuid(),
          active: faker.datatype.boolean(),
          createdOn: faker.date.past().toISOString(),
          isMainImage: false,
          name: faker.system.fileName(),
          original: '/img2.webp',
          thumbnail: '/img2.webp',
          variant: faker.helpers.arrayElement(['default', 'red', 'blue', 'green']),
        })),
        sizeSet: [
          {
            name: 'S',
            active: faker.datatype.boolean(),
            availability: faker.datatype.boolean(),
            metric: 'cm',
            variantPrice: faker.number.float({ min: 10, max: 30 }),
          },
          {
            name: 'XL',
            active: faker.datatype.boolean(),
            availability: faker.datatype.boolean(),
            metric: 'cm',
            variantPrice: faker.number.float({ min: 10, max: 30 }),
          },
          {
            name: 'M',
            active: faker.datatype.boolean(),
            availability: false,
            metric: 'cm',
            variantPrice: faker.number.float({ min: 10, max: 30 }),
          }
        ],
      }
    }
  } as Product
})
