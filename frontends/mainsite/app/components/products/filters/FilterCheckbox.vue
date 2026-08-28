<template>
  <div class="flex justify-start items-center gap-2 p-2 transition-all duration-700 ease-in-out">
    <u-checkbox :id="createElementId('product', 'filter', labelName)" :label="labelName" v-model="isSelected" />
  </div>
</template>

<script setup lang="ts">
const { size, material } = defineProps<{
  size?: Size
  material?: Material
}>()

const emit = defineEmits<{
  'selected-filter': [Size | Material | undefined, boolean]
}>()


const isSelected = ref(false)

/**
 * Store
 */

const { removeSignal, removeFilterSignal, addFilter } = useProductFiltersStore()

whenever(removeSignal, () => {
  isSelected.value = false
})

watch(removeFilterSignal, (value) => {
  if (value === size?.name || value === material?.name) {
    isSelected.value = false
  }
})

/**
 * Selection
 */

watch(isSelected, () => {
  if (size) {
    addFilter('sizes', size.name)
  } else if (material) {
    addFilter('materials', material.name)
  }
  
  emit('selected-filter', size || material, isSelected.value)
})

/**
 * Utilities
 */

const labelName = computed(() => size?.name || material?.name || '')
</script>
