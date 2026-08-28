import type { ProductFilterskeys, ProductFiltersList, ProductFiltersSelection } from '~~/shared/types/filters'

const [useProductFiltersProvider, _useProductFiltersStore] = createInjectionState(() => {
  const selectedFilters = ref<ProductFiltersSelection>({
    sizes: [],
    materials: []
  })

  function _isSelected<K extends ProductFilterskeys>(name: K, value: ProductFiltersSelection[K][number]) {
    return selectedFilters.value[name].includes(value)
  }

  const isSelected = reactify(_isSelected)

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
    selectedFilters,
    strSelectedFilters,
    removeSignal,
    removeFilterSignal,
    isSelected,
    addFilter,
    clearAll,
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
 * @param initial - A MaybeRefOrGetter of the initial collection of products.
 */
export function usePaginationComposable(initial: MaybeRefOrGetter<CollectionProducts | undefined>) {
  const params = useUrlSearchParams() as { limit?: string, offset?: string }
  const limit = computed(() => parseInt(params.limit || '21', 21))
  const offset = computed(() => parseInt(params.offset || '0', 0))

  const hasOffset = computed(() => offset.value > 0)

  const paginatedData = ref<CollectionProducts | undefined>(toValue(initial))
  const { id } = useRoute().params as { id: string }

  watchEffect(async () => {
    if (!hasOffset.value) {
      paginatedData.value = toValue(initial)
    } else {
      paginatedData.value = await $fetch<CollectionProducts>(`/api/collection/${id}`, {
        method: 'GET',
        query: {
          limit: limit.value,
          offset: offset.value
        }
      })
    }
  })

  async function nextPage() {
    params.offset = (offset.value + limit.value).toString()
    // await execute()
  }

  return {
    limit,
    offset,
    hasOffset,
    paginatedData,
    nextPage
  }
}
