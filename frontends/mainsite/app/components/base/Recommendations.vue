<template>
  <section id="product-recommendations">
    <div :class="['grid grid-cols-5 gap-2', sizeClass]">
      <div class="col-span-5">
        <h2 v-if="showTitle" class="font-bold text-3xl text-center mb-5">
          Vous pourriez aussi aimer
        </h2>
      </div>

      <motion-group :preset="VueUseMotions.Fade">
        <product-card v-for="product in products" :key="product.id" :product="product" :show-like-button="false" :show-product-info="false" />
      </motion-group>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ClassValue, HTMLAttributes } from 'vue'

const { showTitle = true, sizeClass = 'max-w-5xl mx-auto' } = defineProps<{
  showTitle?: boolean
  sizeClass?: HTMLAttributes['class'] | ClassValue
}>()

const { data } = useAsyncData(async () => await $fetch('/api/collection/recommendations', { method: 'GET' }))
const products = computed(() => data.value?.data?.collectionRecommendations?.products || [])
</script>
