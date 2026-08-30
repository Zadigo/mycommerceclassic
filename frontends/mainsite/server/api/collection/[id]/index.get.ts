import { useLoadCollectionFixture } from '#server/utils/testing'
import type { CollectionProducts } from '#shared/types/collection'
import { toValue } from 'vue'

export default defineEventHandler(async (event) => {
  const query = getQuery<{ limit: string, offset: string }>(event)

  let limit = parseInt(query.limit || '21', 10)
  const offset = parseInt(query.offset || '0', 10)

  if (offset > 0) {
    limit = Math.min(limit, 21 - offset)
  }

  const results = useLoadCollectionFixture()
  return toValue(results) as CollectionProducts
})
