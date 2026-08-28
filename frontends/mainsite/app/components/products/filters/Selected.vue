<template>
  <div v-show="selection.length > 0" class="flex justify-start flex-wrap gap-1 mb-5">
    <u-badge v-for="item in selection" :key="item" :label="item" size="lg" variant="subtle" color="info" icon="i-lucide-x" @click="emit('remove-filter', item)" />
    <u-button variant="subtle" color="info" @click="emit('remove-filters')">
      <icon name="i-lucide-trash-2" />
    </u-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selection: ProductFiltersList
}>()

const emit = defineEmits<{
  'remove-filters': [],
  'remove-filter': [ProductFiltersList[number]]
}>()
</script>
