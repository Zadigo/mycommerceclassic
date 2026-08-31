import type { ProductFilterskeys, ProductFiltersList, ProductFiltersSelection } from '~~/shared/types/filters'
import { multipleToBaseProducts } from '~~/shared/utils'

const [useProductFiltersProvider, _useProductFiltersStore] = createInjectionState(() => {
  /**
   * Selection
   */

  const selectedFilters = ref<ProductFiltersSelection>({
    sizes: [],
    materials: []
  })

  function _isSelected<K extends ProductFilterskeys>(name: K, value: ProductFiltersSelection[K][number]) {
    return selectedFilters.value[name].includes(value)
  }

  const isSelected = reactify(_isSelected)

  /**
   * Search Params
   */

  const searchParams = useUrlSearchParams() as { sizes?: string }

  watch(selectedFilters, (newFilters) => {
    const sizes = newFilters.sizes.join(',')
    searchParams.sizes = sizes || undefined
  }, { deep: true })

  function addFilter(name: ProductFilterskeys, value: string) {
    const sizes = selectedFilters.value[name]

    if (sizes.includes(value)) {
      selectedFilters.value[name] = sizes.filter((s) => s !== value)
    } else {
      selectedFilters.value[name] = [...sizes, value]
    }
  }

  const strSelectedFilters = computed(() => Object.values(selectedFilters.value).flat())
  
  /**
   * Products
   */
  
  const response = ref<Undefineable<SearchCollection>>()
  const initialProducts = useNuxtData<CollectionProducts>('productCollection')

  /** TODO: Transform to a single source of truth */
  const products = computed(() => {
    if (toValue(response)) {
      const items = toValue(response)?.data.searchCollection.edges[0]?.node.products
      return multipleToBaseProducts(items)
    }

    return multipleToBaseProducts(initialProducts.data.value?.data.collection.products)
  })

  watchEffect(async () => {
    response.value = await $fetch<SearchCollection>('/api/collection/TEST-COLLECTION-ID/filter', {
      method: 'POST',
      body: {
        filters: toValue(selectedFilters)
      }
    })
  })

  /**
   * Signals
   */

  // Notify the parent and/or children who listen
  // to this signal that the filters have been cleared
  const removeSignal = refAutoReset(false, 400)

  // Notify the parent and/or children who listen
  // to this signal that a filter has been removed
  // this time using the value of the filter that was removed
  const removeFilterSignal = refAutoReset<ProductFiltersList[number] | undefined>(undefined, 400)

  function clearAll() {
    removeSignal.value = true
  }

  function remove<K extends ProductFilterskeys>(value: ProductFiltersSelection[K][number]) {    
    removeFilterSignal.value = value
  }

  return {
    /**
     * The response from the API that contains the filtered products based on the selected filters.
     * @default undefined
     */
    response,
    /**
     * A computed property that returns the filtered products based on the selected filters.
     * @default []
     */
    products,
    /**
     * Filters that are currently selected by the user.
     * @default { sizes: [], materials: [] }
     */
    selectedFilters,
    /**
     * A computed property that returns a flat array of all selected filters.
     * @default []
     */
    strSelectedFilters,
    /**
     * A signal that notifies when all filters have been cleared.
     * @default false
     */
    removeSignal,
    /**
     * A signal that notifies when a specific filter has been removed.
     * @default undefined
     */
    removeFilterSignal,
    /**
     * A function that checks if a specific filter is selected.
     * @param name - The name of the filter category (e.g., 'sizes', 'materials').
     * @param value - The value of the filter to check.
     */
    isSelected,
    /**
     * A function that adds or removes a filter from the selected filters.
     * @param name - The name of the filter category (e.g., 'sizes', 'materials').
     * @param value - The value of the filter to add or remove.
     */
    addFilter,
    /**
     * A function that clears all selected filters and notifies listeners.
     */
    clearAll,
    /**
     * A function that removes a specific filter from the selected filters and notifies listeners.
     * @param value - The value of the filter to remove.
     */
    remove,
  }
})

export { useProductFiltersProvider }

export function useProductFiltersStore() {
  const store = _useProductFiltersStore()
  if (!store) {
    throw new Error('useProductFiltersStore must be used within a useProductFiltersProvider')
  }
  return store
}
  
/**
 * A composable that handles pagination for a collection of products. 
 * It takes an initial collection of products and manages the limit and offset for pagination. 
 * It also provides a method to fetch the next page of products.
 * 
 * @param initial - A MaybeRefOrGetter of CollectionProducts or SearchCollection that represents the initial collection of products.
 */
export function usePaginationComposable<T extends MaybeRefOrGetter<Undefineable<CollectionProducts | SearchCollection>>>(initial: T) {
  const _params = useUrlSearchParams() as { limit?: string, offset?: string }

  const paginationInfo = computed(() => {
    const template = {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null
    }

    const initialData = toValue(initial)
    if (!initialData) return template

    const data = initialData.data
    if (!data) return template

    if ('collection' in data) {
      return template
    } else if ('searchCollection' in data) {
      if (!data.searchCollection.pageInfo) {
        return template
      } else {
        return data.searchCollection.pageInfo
      }
    }
    return template
  })
  

  const paginatedResponse = ref<T>(initial)
  /** TODO: Transform to a single source of truth */
  const products = computed(() => {
    const responseData = toValue(paginatedResponse)
    
    if (!responseData) return []

    const data = responseData.data

    if ('searchCollection' in data) {
      const items = responseData?.data.searchCollection.edges[0]?.node.products
      return multipleToBaseProducts(items)
    } else {
      return multipleToBaseProducts(responseData?.data.collection.products)
    }
  })

  const { id } = useRoute().params as { id: string }

  const getProducts = async () => {
    return await $fetch<CollectionProducts>(`/api/collection/${id}`, {
      method: 'GET',
      query: {
        before: paginationInfo.value.startCursor,
        after: paginationInfo.value.endCursor
      }
    })
  }

  watchEffect(async () => {
    /** TODO: COllectionProducts should be pagineable */
    // paginatedResponse.value = await getProducts()
  })

  async function nextPage() {
    paginatedResponse.value = await getProducts()
  }

  return {
    products,
    paginationInfo,
    paginatedResponse,
    nextPage
  }
}
