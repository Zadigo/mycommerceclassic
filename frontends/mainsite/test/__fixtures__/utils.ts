import { faker } from '@faker-js/faker'
import type { BaseProduct, MainImage } from '~~/shared/types/product'
import type { BaseSizeSet } from '~~/shared/types/cart'

export function defineImage(idx: number): MainImage {
  return {
    id: idx.toString(),
    active: faker.datatype.boolean(),
    createdOn: faker.date.past().toISOString(),
    isMainImage: true,
    name: faker.system.fileName(),
    original: '/img2.webp',
    thumbnail: '/img2.webp',
    variant: faker.helpers.arrayElement([ 'default', 'red', 'blue', 'green' ]),
  }
}

export function defineSizeSet(size: BaseSizeSet['name']): BaseSizeSet {
  return {
    name: size,
    active: faker.datatype.boolean(),
    availability: faker.datatype.boolean(),
    metric: 'cm',
    variantPrice: faker.number.float({ min: 10, max: 100 }),
  }
}

export function defineBaseProduct(): BaseProduct {
  const name = faker.commerce.productName()
  const images = Array.from({ length: 3 }, (_, idx) => defineImage(idx))
  return {
    id: idx,
    name: name,
    active: true,
    ageGroupCategory: faker.helpers.arrayElement(['Adult', 'Kids', 'Teens']),
    category: faker.commerce.department(),
    color: faker.color.human(),
    displayNew: faker.datatype.boolean(),
    genderCategory: faker.helpers.arrayElement(['Male', 'Female', 'Unisex']),
    hasSizes: faker.datatype.boolean(),
    modelHeight: faker.number.int({ min: 150, max: 200 }),
    modelSize: faker.number.int({ min: 30, max: 50 }),
    modifiedOn: faker.date.recent().toISOString(),
    createdOn: faker.date.past().toISOString(),
    onSale: faker.datatype.boolean({ probability: 0.2 }),
    price: parseFloat(faker.commerce.price()),
    salePrice: parseFloat(faker.commerce.price()),
    saleValue: 10,
    unitPrice: parseFloat(faker.commerce.price()),
    sku: faker.string.alphanumeric(10),
    slug: faker.helpers.slugify(name),
    subCategory: faker.commerce.department(),
    video: null,
    mainImage: images[0] || null,
    productImages: images,
    sizeSet: [
      defineSizeSet('S'),
      defineSizeSet('M'),
      defineSizeSet('XL')
    ]
  }
}

export function defineDataProduct<K extends string>(key: K, length: number = 3): GraphQlData<K, BaseProduct[]> {
  return {
    data: {
      [key]: Array.from({ length }, () => defineBaseProduct())
    }
  }
}
