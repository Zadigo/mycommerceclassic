<template>
  <section id="home" class="space-y-2">
    <!-- Hero -->
    <!-- <base-hero-image /> -->
     <base-hero-video />

    <!-- Promo -->
    <lazy-base-hero-promo hydrate-on-visible />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Home',
  layout: 'default'
})
</script>
