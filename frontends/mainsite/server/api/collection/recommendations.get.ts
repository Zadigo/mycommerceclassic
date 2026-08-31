import type { CollectionRecommendations } from '~~/shared/types/collection'
import { faker } from '@faker-js/faker'
import { useLoadFixtures } from '#server/utils/testing'
import { toValue } from 'vue'

type RequestBody = {
  quantity: number
}

export default defineEventHandler(async (event) => {
  const _query = getQuery<RequestBody>(event)
  const { fixtures } = useLoadFixtures()
  return {
    data: {
      collectionRecommendations: {
        name: faker.commerce.department(),
        products: toValue(fixtures)
      }
    }
  } as CollectionRecommendations
})
