import { faker } from '@faker-js/faker'


export const CART_ITEMS: CartItem[] = [
  {
    total: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
    quantity: faker.number.int({ min: 1, max: 5 }),
    size: {
      active: true,
      availability: true,
      metric: 'cm',
      name: 'S',
      variantPrice: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
    },
    product: {
      id: '1',
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
      salePrice: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
      unitPrice: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
      mainImage: {
        active: true,
        createdOn: faker.date.past().toISOString(),
        id: faker.string.uuid(),
        isMainImage: true,
        name: faker.commerce.productName(),
        original: faker.image.url(),
        thumbnail: faker.image.url(),
        variant: faker.commerce.productName()
      }
    }
  }
]
