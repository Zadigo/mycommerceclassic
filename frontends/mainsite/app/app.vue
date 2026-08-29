<template>
  <u-app>
    <nuxt-layout>
      <nuxt-loading-indicator />
      <nuxt-page />

      <!-- Global Modals -->
      <lazy-modals-login hydrate-on-idle />
    </nuxt-layout>
  </u-app>
</template>

<script setup lang="ts">
useSessionCreateComposable()

/**
 * Globals
 */

useState<boolean>('openLoginModal', () => false)
</script>
