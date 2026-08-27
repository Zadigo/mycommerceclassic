export const useSearchComposable = createGlobalState(() => {
  const searchQuery = ref<string>('')
  const searchParams = useUrlSearchParams() as { q: string }

  const { history } = useRefHistory(searchQuery, { capacity: 10, flush: 'post' })
  const strHistory = computed(() => history.value.map((item) => item.snapshot))

  const searched = ref<SearchProducts | undefined>(undefined)

  watch(searchQuery, async (newValue) => {
    searchParams.q = newValue
  }, { immediate: true })

  watchDebounced(searchQuery, async (newValue) => {
    searched.value = await $fetch<SearchProducts>('/api/product/search', {
      method: 'GET',
      query: {
        q: newValue
      },
    })
  }, { debounce: 1000 })

  const [openSearch, toggleOpenSearch] = useToggle()

  onMounted(() => {
    if (searchParams.q) {
      searchQuery.value = searchParams.q
    } 
  })

  return {
    history,
    strHistory,
    searchQuery,
    searched,
    openSearch,
    toggleOpenSearch,
  }
})
