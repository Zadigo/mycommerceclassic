<template>
  <section id="cart-index">
    <div class="max-w-6xl p-5 overflow-y-scroll">
      <motion-group :preset="VueUseMotions.Fade">
        <u-card v-for="item in items" :key="item.product.id" class="mb-5">
          <div class="flex justify-start gap-5">
            <nuxt-link to="/1234">
              <nuxt-img src="/img2.webp" class="rounded-lg" alt="Product Image" width="150" />
            </nuxt-link>
            
            <!-- Product Info -->
            <div id="product-info">
              <h2 class="font-normal">
                Nom du produit
              </h2>
    
              <p id="product-price" class="font-bold">
                17.90€
              </p>
  
              <p id="product-color" class="mt-5">
                Couleur: Rouge
              </p>
  
              <p id="product-size">
                Taille: XS
              </p>
    
              <div class="flex item-center justify-start gap-2 mt-5">
                <u-input v-model="item.quantity" type="number" placeholder="Quantité" />
                <u-button @click="() => { remove(item.product, item.size) }">
                  <icon name="i-lucide-trash" />
                </u-button>
              </div>
            </div>
          </div>
        </u-card>
      </motion-group>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Cart',
  layout: 'cart'
})

const { items, remove } = useCartComposable()
</script>
