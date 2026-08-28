<template>
  <div class="flex justify-start items-center gap-2 p-2 transition-all duration-700 ease-in-out">
    <u-checkbox :id="createElementId('product', 'filter', size?.name || material?.name || '')" v-model="isSelected" />
    <p v-if="size" class="uppercase">
      {{ size.name }}
    </p>
    
    <p v-else-if="material" class="uppercase">
      {{ material.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Material, Size } from '~~/shared/types/filters'

const { size, material } = defineProps<{
  size?: Size
  material?: Material
}>()

const emit = defineEmits<{
  'selected-filter': [Size | Material | undefined]
}>()

/**
 * Store
 */

const { addFilter } = useProductFiltersStore()

/**
 * Selection
 */

const isSelected = ref(false)

watch(isSelected, () => {
  if (size) {
    addFilter('sizes', size.name)
  } else if (material) {
    addFilter('materials', material.name)
  }
  
  emit('selected-filter', size || material)
})
</script>
