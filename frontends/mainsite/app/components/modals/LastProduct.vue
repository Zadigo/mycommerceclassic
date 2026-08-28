<template>
  <u-slideover v-model:open="modalState">
    <template #body>
      <template v-if="lastProduct">
        <p class="font-bold mb-5">
          Produit ajouté au panier
        </p>
  
        <div class="flex justify-left gap-4">
          <nuxt-img src="/img2.webp" width="150" />
          <div>
            <h4 class="font-bold">
              Nom du produit
            </h4>
  
            <p class="font-bold mb-3">
              18,99 €
            </p>
  
            <p class="font-light">
              Taille: S
            </p>
          </div>
        </div>
  
        <div class="space-y-2 my-5">
          <u-button variant="solid" block>
            Passer à la caisse
          </u-button>
    
          <u-button to="/cart" variant="outline" block>
            Voir le panier
          </u-button>
        </div>
  
        <!-- Recommendations -->
        <base-recommendations :grid="3" :show-title="true" :show-product-info="false" :show-like-button="false" :show-badges="false" class="mt-8" title-class="font-bold text-xl mb-2"  />
      </template>
      <div v-else>
        Loading....
      </div>
    </template>
  </u-slideover>
</template>

<script setup lang="ts">
// const openLastProductModal = useState<boolean>('openLastProductModal')

/**
 * State
 */

const { lastProduct } = useCartComposable()
const { modalState } = useLastProductComposable(lastProduct)
</script>
