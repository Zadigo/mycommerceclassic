<template>
  <section id="cart" class="grid grid-cols-12 h-screen relative px-12">
    <header class="p-5 col-span-12 flex items-center justify-center">
      <div class="font-bold uppercase">
        <nuxt-link to="/">
          Calvin Klein
        </nuxt-link>
      </div>
    </header>

    <div class="col-span-8">
      <slot />
    </div>

    <div class="col-span-4">
      <div class="p-5 space-y-5">
        <u-card>
          <p class="font-bold mb-10">
            Aperçu de votre panier
          </p>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <p>Sous-Total</p>
              <p class="font-bold">Prix 1</p>
            </div>
    
            <div class="flex justify-between">
              <p>Livraison standard</p>
              <p class="font-bold">Prix 1</p>
            </div>
          </div>
        </u-card>
  
        <u-card>
          <p class="font-light text-slate-300">
            Vous avez un code promo?
          </p>
  
          <u-input placeholder="Entrez votre code promo" />
  
          <div class="flex justify-between py-5">
            <p>Total (TVA comprise)</p>
            <p class="font-bold">Prix 1</p>
          </div>
          
          <div v-if="route.meta.title !== 'Payment'" class="flex justify-start gap-2">
            <u-button variant="soft" color="primary" size="md" @click="router.back()">
              Retour
            </u-button>
  
            <u-button :to="url" variant="solid" color="primary" size="md">
              {{ buttonTitle }}
            </u-button>
          </div>
        </u-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Links
 */

const router = useRouter()
const route = useRoute()

const url = computed(() => {
  if (route.meta.title === 'Cart') {
    return '/cart/shipment'
  } else if (route.meta.title === 'Shipment') {
    return '/cart/payment'
  }
})

const buttonTitle = computed(() => {
  if (route.meta.title === 'Cart') {
    return 'Valider la commande'
  } else if (route.meta.title === 'Shipment') {
    return 'Procéder au paiement'
  }
})

/**
 * Cart
 */

 const { items } = useCartItemsComposable()

const {  } = useCartComposable()
</script>
