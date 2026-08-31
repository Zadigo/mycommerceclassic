import type { SearchProducts } from '~~/shared/types/product'

type SearchQuery = {
  q?: string
}

export default defineEventHandler(async (event) => {
  const _searchParams = getQuery<SearchQuery>(event)

  const { search, toNodes } = useLoadFixtures()
  return {
    data: {
      searchProducts: {
        edges: toNodes(search(event))
      }
    }
  } as SearchProducts
})
