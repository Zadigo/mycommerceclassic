<template>
  <section id="home" class="space-y-2">
    <!-- Hero -->
    <!-- <base-hero-image /> -->
     <base-hero-video />

    <!-- Promo -->
    <lazy-base-hero-promo hydrate-on-visible />

    <section class="p-20">
      <div class="space-y-4 text-center max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-5xl font-bold font-primary-50">
          Welcome to our e-commerce site!
        </h2>
        <p class="text-sm md:text-md">
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>

    <!-- Product Strip -->
    <suspense>
      <async-product-strip />

      <template #fallback>
        Loading products...
      </template>
    </suspense>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Home',
  layout: 'default'
})

const AsyncProductStrip = defineAsyncComponent(() => import('~/components/base/hero/Strip.vue'))
</script>
