<template>
  <u-skeleton v-if="isLoading" :class="skeletonClass" />
  <nuxt-img v-else ref="imageEl" :src="_image" alt="Some alt" class="w-full cursor-grab" />
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'

const { image, key = 'original', skeletonClass = 'h-full w-full' } = defineProps<{
  image: MainImage | undefined
  key?:'original' | 'thumbnail'
  skeletonClass?: string
}>()

const _image = computed(() => image?.[key || 'original'] || '')
const { isLoading } = useImage({ src: toValue(_image) })
</script>
