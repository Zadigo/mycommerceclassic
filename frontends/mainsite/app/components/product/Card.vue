<template>
  <article :id="createElementId('product', 'card', product.id)">
    <div class="relative overflow-hidden group">
      <nuxt-link :to="`/${product.id}`" class="block">
        <nuxt-img :alt="product.name" src="/img1.webp" class="w-full group-hover:scale-120 transition-all ease-in-out duration-300" />
      </nuxt-link>
      
      <!-- Badges -->
      <div v-if="showBadges" class="absolute top-2 left-2 flex gap-2">
        <u-badge v-if="product.displayNew" variant="solid" color="neutral">
          New
        </u-badge>

        <u-badge v-if="product.onSale" variant="solid" color="error">
          {{ product.saleValue }}%
        </u-badge>
      </div>

      <!-- Like Button -->
      <u-button v-if="showLikeButton" :id="createElementId('product', 'card', 'like', product.id)" :icon="getIcon(product)" variant="subtle" color="neutral" class="absolute top-2 right-2" @click="add(product)" />
    </div>

    <div v-if="showProductInfo" class="flex justify-between p-3">
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

const { 
  product, 
  showProductInfo = true, 
  showLikeButton = true, 
  showBadges = true
} = defineProps<{
  product: BaseProduct,
  showProductInfo?: boolean,
  showLikeButton?: boolean,
  showBadges?: boolean
}>()

const { add, getIcon } = useLikeComposable()
</script>
