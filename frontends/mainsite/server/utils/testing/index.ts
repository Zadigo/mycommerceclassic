import { faker } from '@faker-js/faker'
import jsonFixtures from '../../../public/products.json'
import { computed, ref, toValue } from 'vue'
import type { H3Event } from 'h3'
 
export function useLoadFixtures() {
  const fixtures = computed(() => jsonFixtures)

  function getProduct(event: H3Event) {
    const id = getRouterParam(event, 'id')
    if (!id) return undefined
    return fixtures.value.find((product) => product.id.toString() === id)
  }

  function raw() {
    return toValue(fixtures)
  }

  function singleProduct() {
    return raw().at(0) as BaseProduct
  }

  return {
    fixtures,
    getProduct,
    raw,
    singleProduct
  }
}

export function useLoadCollectionFixture() {
  const result = ref<CollectionProducts>({
    data: {
      collection: {
        name: faker.word.words({ count: { min: 2, max: 5 } }),
        products: toValue(useLoadFixtures().fixtures)
      }
    }
  })

  return result
}
