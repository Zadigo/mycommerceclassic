<template>
  <section id="site" class="relative">
    <header class="fixed top-0 left-0 w-full z-40">
      <base-navbar />
      <!-- <lazy-base-ecommerce-menu /> -->
    </header>

    <main :class="theme">
      <slot />
    </main>

    <!-- Modals -->
    <lazy-modals-last-product :hydrate-after="1000" />

    <!-- Footer -->
    <lazy-base-footer hydrate-on-visible />
  </section>
</template>

<script setup lang="ts">
const route = useRoute()

const theme = computed(() => {
  return [
    {
      'pt-[calc(65px)]': route.meta.title !== 'Home'
    }
  ]
})
</script>
