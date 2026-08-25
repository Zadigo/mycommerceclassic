import type { ProductFilterskeys, ProductFiltersSelection } from '~~/shared/types/filters'

const [useProductFiltersProvider, _useProductFiltersStore] = createInjectionState(() => {
  const selectedFilters = ref<ProductFiltersSelection>({
    sizes: [],
    materials: []
  })

  const searchParams = useUrlSearchParams() as { sizes?: string }

  watch(selectedFilters, (newFilters) => {
    const sizes = newFilters.sizes.join(',')
    searchParams.sizes = sizes || undefined
  }, { deep: true })

  // const query = computed(() => {
  //   const params = new URLSearchParams()
  //   if (selectedFilters.value.sizes.length > 0) {
  //     params.set('sizes', selectedFilters.value.sizes.join(','))
  //   }
  //   if (selectedFilters.value.materials.length > 0) {
  //     params.set('materials', selectedFilters.value.materials.join(','))
  //   }
  //   return params.toString()
  // })

  function addFilter(name: ProductFilterskeys, value: string) {
    const sizes = selectedFilters.value[name]
    if (sizes.includes(value)) {
      selectedFilters.value[name] = sizes.filter((s) => s !== value)
    } else {
      selectedFilters.value[name] = [...sizes, value]
    }
  }

  return {
    selectedFilters,
    addFilter
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
