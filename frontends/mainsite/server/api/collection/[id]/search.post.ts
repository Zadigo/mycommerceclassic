type SearchQuery = {
  sizes: string[]
  materials: string[]
}

export default defineEventHandler(async (event) => {
  const _searchParams = await readBody(event) as Partial<SearchQuery>

  const { search, toNodes } = useLoadFixtures()
  return {
    data: {
      searchCollection: {
        edges: toNodes(search(event))
      }
    }
  } as SearchCollection
})
