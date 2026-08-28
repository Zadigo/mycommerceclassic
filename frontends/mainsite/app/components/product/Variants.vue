<template>
  <div class="grid grid-cols-8 gap-2">
    <nuxt-link :to="`/${product.id}`">
      <nuxt-img :src="product.mainImage?.original" :alt="product.name" :class="isSelected(product)" class="w-full hover:opacity-75 transition-all ease-in-out duration-200" />
    </nuxt-link>

    <nuxt-link v-for="variant in _variants" :key="variant.id" :to="`/${variant.id}`" @mouseenter="emit('colorName', variant.color)">
      <nuxt-img :src="variant.mainImage?.original" :alt="variant.name" :class="isSelected(variant)" class="w-full hover:opacity-75 transition-all ease-in-out duration-200" />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { product, variants } = defineProps<{
  product: BaseProduct,
  variants: Product['data']['product']['colorVariants']
}>()

const emit = defineEmits<{
  'colorName': [string]
}>()

const _variants = computed(() => variants ?? [])

/**
 * Other
 */

const route = useRoute()

const isSelected = (variant: { id: string }) => {
  return route.params.id === variant.id ? 'opacity-50' : 'opacity-100'
}
</script>
