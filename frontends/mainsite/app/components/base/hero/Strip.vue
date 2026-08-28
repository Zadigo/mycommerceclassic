<template>
  <section id="product-strip">
    <base-grids-dynamic :grid="5">
      <product-card v-for="product in products" :key="product.id" :product="product" :show-like-button="false" :show-badges="false" />
    </base-grids-dynamic>
  </section>
</template>

<script setup lang="ts">
const data = await $fetch('/api/collection/recommendations', {
  method: 'GET',
  query: {
    quantity: 5
  }
})
const products = computed(() => data.data.collectionRecommendations.products)
</script>
