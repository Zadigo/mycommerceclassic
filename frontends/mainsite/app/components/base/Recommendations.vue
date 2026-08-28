<template>
  <section id="product-recommendations">
    <base-grids-dynamic :grid="grid">
      <template #default>
        <div class="col-span-full">
          <h2 v-if="showTitle" :class="titleClass">
            {{  title }}
          </h2>
        </div>
  
        <motion-group :preset="VueUseMotions.Fade">
          <product-card v-for="product in products" :key="product.id" :product="product" :show-like-button="showLikeButton" :show-product-info="showProductInfo" :show-badges="showBadges" />
        </motion-group>
      </template>
    </base-grids-dynamic>
  </section>
</template>

<script setup lang="ts">
import type { ClassValue, HTMLAttributes } from 'vue'

const { 
  title = 'Vous pourriez aussi aimer', 
  grid = 5, 
  showTitle = true, 
  sizeClass = 'max-w-5xl mx-auto', 
  titleClass = 'font-bold text-3xl text-center mb-5',
  showLikeButton = true, 
  showProductInfo = true,
  showBadges = true,
  quantity = 10
} = defineProps<{
  title?: string
  showTitle?: boolean
  sizeClass?: HTMLAttributes['class'] | ClassValue,
  titleClass?: HTMLAttributes['class'] | ClassValue,
  grid?: number,
  showProductInfo?: boolean,
  showLikeButton?: boolean,
  showBadges?: boolean
  quantity?: number
}>()

const { data } = await useAsyncData(async () => await $fetch('/api/collection/recommendations', {
  method: 'GET',
  query: {
    quantity
  }
}))
const products = computed(() => data.value?.data?.collectionRecommendations?.products || [])
</script>
