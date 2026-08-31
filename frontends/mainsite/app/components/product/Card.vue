<template>
  <article :id="createElementId('product', 'card', product.id)">
    <div class="relative overflow-hidden group">
      <nuxt-link :to="`/${product.id}`" class="block">
        <base-loading-nuxt-img :image="product.mainImage" :fit="fit" :skeleton-class="skeletonClass" image-class="w-full md:group-hover:scale-120 transition-all ease-in-out duration-300" />
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

    <div v-if="showProductInfo" class="flex justify-between py-2 md:py-1 md:p-3">
      <p class="font-semibold text-sm md:text-md">
        {{  product.name }}
      </p>

      <p :id="createElementId('product', 'footer', 'price', product.id)" class="font-bold text-sm md:text-md">
        19,99 €
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BaseProduct } from '#shared/types/product'

const { 
  product, 
  skeletonClass,
  showProductInfo = true, 
  showLikeButton = true, 
  showBadges = true,
  fit = true
} = defineProps<{
  product: BaseProduct,
  showProductInfo?: boolean,
  showLikeButton?: boolean,
  showBadges?: boolean,
  fit?: boolean,
  skeletonClass?: string
}>()

const { add, getIcon } = useLikeComposable()
</script>
