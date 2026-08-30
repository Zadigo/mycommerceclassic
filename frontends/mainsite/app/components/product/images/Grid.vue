<template>
  <div id="product-images">
    <div class="grid grid-cols-2 gap-2">
      <motion-group :preset="VueUseMotions.Fade">
        <div v-for="item in _images" :key="item.id" class="overflow-hidden">
          <base-loading-nuxt-img :image="item" image-class="w-full hover:scale-120 transition-all ease-in-out duration-300 cursor-zoom-in" @click="$emit('zoom', item)" />
        </div>
      </motion-group>
    </div>
  </div>
</template>

<script setup lang="ts">
const { images } = defineProps<{
  images: BaseProduct['productImages'] | undefined
}>()

const emit = defineEmits<{
  zoom: [BaseProduct['productImages'][number]]
}>()

/**
 * Images
 */

const _images = defaultArray<BaseProduct['productImages'][number]>(images)
</script>
