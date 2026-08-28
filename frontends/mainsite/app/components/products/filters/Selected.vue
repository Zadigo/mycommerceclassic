<template>
  <div v-show="selection.length > 0" class="flex justify-start flex-wrap gap-1 mb-5">
    <u-badge v-for="item in selection" :key="item" :label="item" size="lg" variant="subtle" color="info" icon="i-lucide-x" />
    <u-button variant="subtle" color="info" @click="selection = []">
      <icon name="i-lucide-trash-2" />
    </u-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selection: ProductFiltersList
}>()
</script>
