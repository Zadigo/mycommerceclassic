<template>
  <div class="h-[90vh] w-full p-5 md:p-20">
    <div class="max-w-7xl mx-auto">
      <u-input v-model="searchQuery" type="search" size="xl" placeholder="Search for products..." class="w-full" />
      
      <div class="flex gap-2 my-5">
        <nuxt-link v-for="(item, index) in strHistory" :key="index" to="/">
          <u-badge :label="item" variant="subtle" icon="i-lucide-user" />
        </nuxt-link>
      </div>

      <div v-if="searched && searched.data.searchProducts.edges.length > 0">
        <base-grids-dynamic scrollable>
          <lazy-product-card v-for="product in searched.data.searchProducts.edges" :key="product.node.id" :product="product.node" hydrate-on-idle />
        </base-grids-dynamic>
      </div>
      <lazy-base-recommendations v-else hydrate-on-idle />
    </div>
  </div>
</template>

<script setup lang="ts">
const { searchQuery, strHistory, searched } = useSearchComposable()
</script>
