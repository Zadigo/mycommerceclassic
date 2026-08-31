import type { ProductFilterOptions } from '#server/types/filter'

/**
 * Filter products in a collection based on the given search query. The search query is expected to 
 * be a JSON object with the following structure:
 * {
 *   "sizes": ["XL", "M", "XXL"],
 *   "materials": ["Coton", "Polyester", "Laine"]
 * }
 */
export default defineEventHandler(async (event) => {
  const filterOptions = await readBody<ProductFilterOptions>(event)
  const { filter, toNodes } = useLoadFixtures()

  return {
    data: {
      searchCollection: {
        edges: toNodes(filter(filterOptions))
      }
    }
  } as SearchCollection
})
