<template>
  <div id="product-filters" class="p-5 rounded-xl transition-all duration-300 ease-in-out">
    <p v-if="filterElements.length === 0" class="p-5">No filters available</p>
    <div :id="createElementId('filter', item.name)" v-for="item in filterElements" class="rounded-xl not-last:mb-3">
      <div class="flex justify-between items-center py-3">
        <p class="font-bold">
          {{ item.name }}
        </p>

        <u-button :id="createElementId('filter', 'expand', item.name)" variant="subtle" color="neutral" @click="() => { expand(item) }">
          <icon name="i-lucide-plus" />
        </u-button>
      </div>

      <template v-if="isExpanded(item)">
        <products-filters-filter-checkbox v-for="value in item.values" :key="value.name" :size="value" :material="value" @selected-filter="emit('selected-filters', strSelectedFilters)" />
      </template>

      <u-separator />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'update-products': [SearchCollection | undefined]
  'selected-filters': [ProductFiltersList]
}>()

/**
 * Filters
 */

const { id } = useRoute().params as { id: string }
const { data } = await useAsyncData('filters', () => $fetch<ProductFilters>(`/api/collection/${id}/filters`))

const filterElements = computed(() => {
  return toValue(data)?.data.productFilters || []
})

const { selectedFilters, strSelectedFilters } = useProductFiltersStore()

/**
 * Selection
 */

const selectedItem = ref<string[]>([])

const isExpanded = (item: BaseProductFilter) => {
  return selectedItem.value.includes(item.name)
}

const expand = (item: BaseProductFilter) => {
  if (selectedItem.value.includes(item.name)) {
    selectedItem.value = selectedItem.value.filter(name => name !== item.name)
  } else {
    selectedItem.value.push(item.name)
  }
}

/**
 * Filtering
 */

const filteredProducts = ref<SearchCollection>()

watchDebounced(selectedFilters, async () => {
  filteredProducts.value = await $fetch<SearchCollection>(`/api/collection/${id}/search`, {
    method: 'POST',
    body: toValue(selectedFilters)
  })

  emit('update-products', toValue(filteredProducts))
}, { debounce: 500, deep: true })
</script>
