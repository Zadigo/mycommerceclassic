<template>
  <section id="site">
    <header class="fixed top-0 left-0 w-full z-50">
      <base-navbar />
      <lazy-base-ecommerce-menu />
    </header>

    <main class="pt-[calc(65px)]">
      <slot />
    </main>
  </section>
</template>

<script setup lang="ts">
// callOnce('initiateCookie', async () => {
//   await $fetch('/api/cart/create', { method: 'POST' })
// }, { mode: 'render'})
</script>
