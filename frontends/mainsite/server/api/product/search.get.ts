import type { SearchProducts } from '~~/shared/types/product'
import { faker } from '@faker-js/faker'

type SearchQuery = {
  q?: string
}

export default defineEventHandler(async (event) => {
  const queryParams = getQuery<SearchQuery>(event)

  return {
    data: {
      searchProducts: {
        edges: Array.from({ length: 10 }, () => ({
          node: {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            mainImage: {
              id: faker.string.uuid(),
              active: true,
              createdOn: faker.date.past().toISOString(),
              isMainImage: true,
              name: faker.commerce.productName(),
              original: faker.image.urlLoremFlickr({ category: 'fashion', width: 800, height: 800 }),
              thumbnail: faker.image.urlLoremFlickr({ category: 'fashion', width: 200, height: 200 }),
              variant: 'default',
            },
            productImages: [],
            sizeSet: null,
            active: true,
            ageGroupCategory: 'adult',
            category: 'clothing',
            color: faker.color.human(),
            createdOn: faker.date.past().toISOString(),
            displayNew: false,
            genderCategory: 'unisex',
            hasSizes: false,
            modelHeight: null,
            modelSize: null,
            modifiedOn: faker.date.recent().toISOString(),
            onSale: false,
            price: parseFloat(faker.commerce.price()),
            salePrice: 0,
            saleValue: 0,
            sku: faker.string.alphanumeric(8),
            slug: faker.helpers.slugify(faker.commerce.productName()),
            subCategory: 'shirts',
            unitPrice: parseFloat(faker.commerce.price()),
            video: null,
          }
        }))
      }
    }
  } as SearchProducts
})
