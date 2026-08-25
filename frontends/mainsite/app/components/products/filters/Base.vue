<template>
  <div id="filters" class="p-5 rounded-xl">
    <div :id="createElementId('filter', item.name)" v-for="item in data?.data.productFilters" class="rounded-xl not-last:mb-3">
      <div class="flex justify-between items-center py-3">
        <p class="font-bold">
          {{ item.name }}
        </p>

        <u-button :id="createElementId('filter', 'expand', item.name)" variant="subtle" color="neutral" @click="() => { toggleExpanded() }">
          <icon name="i-lucide-plus" />
        </u-button>
      </div>

      <template v-if="isExpanded">
        <products-filters-filter-checkbox v-for="value in item.values" :size="value" :material="value" />
      </template>
      <u-separator />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductFilters } from '~~/shared/types/filters'

const emit = defineEmits<{
  updateProducts: [SearchCollection]
}>()

const { id } = useRoute().params as { id: string }
const { data } = await useAsyncData('filters', () => $fetch<ProductFilters>(`/api/collection/${id}/filters`))
const { selectedFilters } = useProductFiltersProvider()

const isExpanded = ref(false)
const toggleExpanded = useToggle(isExpanded)

const filteredProducts = ref<SearchCollection>()

watchDebounced(selectedFilters, async () => {
  filteredProducts.value = await $fetch<SearchCollection>(`/api/collection/${id}/search`, {
    method: 'POST',
    body: toValue(selectedFilters)
  })
  emit('updateProducts', filteredProducts.value)
}, { debounce: 500, deep: true })
</script>
