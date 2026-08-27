<template>
  <section id="shipment" class="space-y-5 max-w-5xl">
    <u-card>
      Payment block

      <u-button to="/cart/success">
        Payer {{ docRef?.cart.total || 0 }}€
      </u-button>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Payment',
  layout: 'cart'
})

const { docRef } = useSessionComposable()
</script>
