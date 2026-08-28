<template>
  <section id="shipment" class="space-y-5 max-w-5xl">
    <u-card>
      <div class="rounded-lg overflow-hidden">
        <a v-for="option in shipmentOptions" :key="option.name" href="#" :class="[isSelected(option), 'block border border-slate-100 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 dark:bg-slate-800 p-5 cursor-pointer']" @click.prevent="selectShipmentOption(option)">
          <p class="font-light flex flex-col">
            <span class="font-bold">Livraison - {{ option.price }}€</span>
            <span>{{ option.description }}</span>
          </p>
        </a>
      </div>
    </u-card>
    
    <u-card>
      <template #header>
        <h2 class="font-bold text-lg">
          Addresse de livraison
        </h2>
      </template>

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
import type { ShipmentResponse } from '#shared/types/shipment'
  
definePageMeta({
  title: 'Shipment',
  layout: 'cart'
})

const shipmentOptions = computedAsync(async() => $fetch('/api/cart/shipment'))
const selectedShipmentOption = ref(shipmentOptions.value?.find(option => option.name === 'Standard') || null)

const selectShipmentOption = (option: ShipmentResponse) => {
  selectedShipmentOption.value = option
}

const isSelected = (option: ShipmentResponse) => ({
  'bg-white': selectedShipmentOption.value?.name !== option.name,
  'bg-slate-100': selectedShipmentOption.value?.name === option.name
})
</script>
