<template>
  <div class="w-full h-full absolute top-0 left-0 overflow-scroll z-50">
    <div class="relative">
      <u-button :id="createElementId('cta', 'super-zoom', 'close')" variant="solid" color="neutral" icon="i-lucide-x" class="fixed top-5 right-5 z-50" @click="$emit('close')" />
      <nuxt-img src="/img2.webp" alt="Some alt" class="w-full cursor-grab" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'close': []
}>()
</script>
