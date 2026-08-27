<template>
  <section id="cart-index" class="max-w-6xl">
    <template v-if="items && items.length > 0">
      <motion-group :preset="VueUseMotions.Fade">
        <cart-card v-for="item in items" :key="item.product.id" :item="item" />
      </motion-group>
    </template>

    <u-card v-else>
      <p class="text-xl font-bold text-center">
        Votre panier est vide
      </p>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Cart',
  layout: 'cart'
})

/**
 * Cart
 */

const { items } = useCartItemsComposable()
</script>
