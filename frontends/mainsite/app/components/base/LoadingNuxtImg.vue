<template>
  <div class="overflow-hidden relative">
    <slot v-if="isLoading" name="loading">
      <u-skeleton :class="skeletonClass" />
    </slot>

    <slot v-else>
      <!-- <nuxt-img :src="_image" alt="Some alt" :class="imageClass" /> -->
      <img :src="_image" alt="Some alt" :class="imageClass" />
    </slot>
  </div>
</template>

<script setup lang="ts">
const { 
  image, 
  imageType = 'original', 
  skeletonClass = 'w-full h-200',
  imageClass = 'w-full hover:scale-120 transition-all ease-in-out duration-300 cursor-zoom-in'
} = defineProps<{
  image: MainImage | undefined | null
  imageType?:'original' | 'thumbnail'
  skeletonClass?: string
  imageClass?: string
}>()

const _image = computed(() => image?.[imageType || 'original'] || '')
const isLoading = computed(() => !isDefined(_image) || toValue(_image) === '')
</script>
