import { faker } from '@faker-js/faker'
import jsonFixtures from '../../../public/products.json'
import { computed, ref, toValue } from 'vue'
import type { Ref } from 'vue'

export function useLoadFixtures(): Ref<BaseProduct[]> {
  return computed(() => jsonFixtures)
}

export function useLoadCollectionFixture() {
  return ref<CollectionProducts>({
    data: {
      collection: {
        name: faker.word.words({ count: { min: 2, max: 5 } }),
        products: toValue(useLoadFixtures())
      }
    }
  })
}
