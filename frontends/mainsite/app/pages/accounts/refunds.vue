<template>
  <section id="refunds">
    <u-card>
      <accounts-empy-content>
        <template #title>
          Tu n'as pas de demandes de retour en ligne
        </template>

        <template #description>
          Tu peux faire une demande de retour en ligne à partir d'un récapitulatif d'achat en ligne
        </template>
      </accounts-empy-content>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'accounts',
  title: 'Return Requests',
})
</script>

