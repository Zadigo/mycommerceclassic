<template>
  <section id="shipment" class="space-y-5 max-w-5xl">
    <u-card>
      <div class="space-y-3">
        <div class="ring-1 dark:ring-slate-700 p-5 rounded-lg">
          <p class="font-light flex flex-col">
            <span class="font-bold">Livraison - 5€</span>
            <span>standard: 3-5 jours ouvrés</span>
          </p>
        </div>
  
        <div class="ring-1 dark:ring-slate-700 p-5 rounded-lg">
          <p class="font-light flex flex-col">
            <span class="font-bold">Express - 10€</span>
            <span>livraison: 1-2 jours ouvrés</span>
          </p>
        </div>
      </div>
    </u-card>

    <u-card>
      <form>
        <div class="flex justify-between gap-2">
          <u-input class="w-full" placeholder="Firstname" />
          <u-input class="w-full" placeholder="Lastname" />
        </div>

        <u-input placeholder="Address" class="w-full mt-5" />
        <u-input placeholder="Zip code" class="w-full mt-5" />
        <u-input placeholder="City" class="w-full mt-5" />
      </form>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Shipment',
  layout: 'cart'
})
</script>
