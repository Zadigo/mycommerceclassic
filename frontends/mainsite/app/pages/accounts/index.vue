<template>
  <section id="accounts-home" class="space-y-2">
    <u-card class="relative">
      <nuxt-img src="/img1.webp" class="aspect-square object-cover w-full h-80 rounded-lg" />
      <h1 class="text-primary-50 font-bold text-4xl absolute bottom-10 left-10">
        Bonjour, Julie
      </h1>
    </u-card>

    <u-card>
      <template #title>
        <h3 class="font-bold">
          Mes dernières commandes
        </h3>
      </template>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'accounts',
  title: 'Accounts',
})

/**
 * Autocomplete
 */

await useLazyAsyncData('autocomplete', () => $fetch('/api/accounts/autocomplete', { method: 'POST', body: { using: 'city' } }))
</script>
