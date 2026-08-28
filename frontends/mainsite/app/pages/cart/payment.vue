<template>
  <section id="payment" class="space-y-5 max-w-3xl mx-auto">
    <u-card>
      Payment block

      <u-button :id="createElementId('cta', 'footer', 'payment')" to="/cart/success">
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
