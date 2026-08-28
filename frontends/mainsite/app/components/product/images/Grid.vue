<template>
  <div id="product-images">
    <div class="grid grid-cols-2 gap-2">
      <motion-group :preset="VueUseMotions.Fade">
        <div v-for="i in 4" :key="i" class="overflow-hidden">
          <nuxt-img src="/img1.webp" alt="Some alt" class="w-full hover:scale-120 transition-all ease-in-out duration-300 cursor-zoom-in" @click="emit('zoom', 'img2.webp')" />
        </div>
      </motion-group>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'zoom': [string]
}>()
</script>
