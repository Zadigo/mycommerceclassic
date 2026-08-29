<template>
  <section id="orders">
    <u-card>
      <accounts-empty-content :show-button="true" @btn-clicked="toggleFindOrderModal">
        <template #title>
          Tu n'as encore aucun achat en ligne
        </template>

        <template #description>
          Si tu ne trouves pas ton achat, tu as peut-être passé commande sans être inscrit(e).
        </template>

        <template #button-text>
          Trouver une commande
        </template>
      </accounts-empty-content>
    </u-card>

    <!-- Modals -->
    <client-only>
      <lazy-accounts-modals-find-order v-model:open="openFindOrderModal" hydrate-on-visible />
    </client-only>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'accounts',
  title: 'Mes achats',
})

const openFindOrderModal = ref(false)
const toggleFindOrderModal = useToggle(openFindOrderModal)

/**
 * Composables
 */

useUserOrdersComposable()
</script>
