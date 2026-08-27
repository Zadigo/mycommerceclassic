<template>
  <section id="cart" class="grid grid-cols-12 h-screen relative transition-all ease-in-out duration-300">
    <header class="p-5 col-span-12 flex items-center justify-center border-b border-b-slate-100 fixed top-0 left-0 w-full bg-white z-10">
      <nuxt-link to="/" class="font-bold uppercase">
        Calvin Klein
      </nuxt-link>
    </header>

    <div class="col-span-8 p-5 space-y-5 mt-[calc(70px+1rem)]">
      <slot />
    </div>

    <div class="col-span-4 p-5 relative border-l border-l-slate-100 bg-slate-100">
      <div class="sticky right-0 top-[calc(70px+1rem)] space-y-5">
        <u-card>
          <p class="font-bold mb-10">
            Aperçu de votre panier
          </p>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <p>Sous-Total</p>
              <p class="font-bold">{{ docRef?.cart.total || 0 }}€</p>
            </div>
    
            <div class="flex justify-between">
              <p>Livraison standard</p>
              <p class="font-bold">5€</p>
            </div>
          </div>
        </u-card>
  
        <u-card>
          <p class="font-light text-slate-300">
            Vous avez un code promo?
          </p>
  
          <u-input size="xl" class="w-full" placeholder="Entrez votre code promo" />
  
          <div class="flex justify-between py-5">
            <p>Total (TVA comprise)</p>
            <p class="font-bold">{{ docRef?.cart.total || 0 }}€</p>
          </div>
          
          <div v-if="route.meta.title !== 'Payment'" class="flex justify-start gap-2 mt-10">
            <u-button variant="soft" color="primary" size="xl" @click="router.back()">
              Retour
            </u-button>
  
            <u-button :to="url" variant="solid" color="primary" size="xl">
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

const { docRef } = useSessionComposable()
const { items } = useCartItemsComposable()
</script>
