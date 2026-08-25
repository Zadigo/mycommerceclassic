<template>
  <article :id="`product-${product.id}`">
    <div class="relative overflow-hidden group">
      <nuxt-link :to="`/${product.id}`" class="block">
        <nuxt-img :alt="product.name" src="/img1.webp" class="w-full group-hover:scale-120 transition-all ease-in-out duration-300" />
      </nuxt-link>
      
      <!-- Badge -->
      <u-badge variant="solid" color="info" class="absolute top-2 left-2">
        New
      </u-badge>

      <!-- Like Button -->
      <u-button :id="createElementId('product', 'header', 'card', 'like', product.name)" :icon="getIcon(product)" variant="subtle" color="neutral" class="absolute top-2 right-2" @click="add(product)" />
    </div>

    <div class="flex justify-between p-3">
      <p class="font-light">
        {{  product.name }}
      </p>

      <p :id="createElementId('product', 'footer', 'price', product.id)" class="font-bold">
        19,99 €
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BaseProduct } from '#shared/types/product'

defineProps<{
  product: BaseProduct
}>()

const { add, getIcon } = useLikeComposable()
</script>
