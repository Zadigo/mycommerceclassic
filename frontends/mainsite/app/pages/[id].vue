<template>
  <section id="product" class="px-5 relative">
    <div class="grid grid-cols-12 gap-8">
      <!-- Images -->
      <lazy-product-images-grid class="col-span-12 md:col-span-8" hydrate-on-idle @zoom="select" />

      <aside v-if="product" class="col-span-12 md:col-span-4 md:py-15">
        <u-breadcrumb :items="items">
          <template #separator>
            <span class="mx-2 text-muted" />
          </template>
        </u-breadcrumb>

        <div id="product-info" class="py-6">
          <h1 id="product-name" class="font-bold text-2xl">
            Culotte - Icon Logo
          </h1>
          
          <p id="product-price" class="text-light">
            17,90 €(TVA comprise)
          </p>
        </div>

        <div id="other-products">
          <p class="font-light">
            Couleur: Bleu
          </p>
          
          <lazy-product-variants class="mt-2" hydrate-on-idle :product="product" :variants="product.colorVariants" />
        </div>

        <div id="size" class="py-5">
          <p class="font-light">
            Taille
          </p>

          <!-- Size -->
          <div :id="createElementId('cta', 'content', 'sizes')">
            <div id="cta-sizes" class="flex gap-2">
              <u-button v-for="size in product.sizeSet" :key="size.name" :variant="sizeIsSelected(size) ? 'solid' : 'outline'" size="md" class="min-w-10 flex justify-center" @click="selectSize(size)">
                {{ size.name }}
              </u-button>
            </div>

            <u-button variant="link" icon="i-lucide-ruler" class="mt-2">
              Guide des tailles
            </u-button>
          </div>

          <!-- Actions -->
          <div id="cart-actions">
            <motion :preset="VueUseMotions.Fade">
              <div v-if="showSizeWarning" class="p-5 bg-red-50 rounded-xl">
                Veuillez sélectionner une taille pour ajouter le produit au panier.
              </div>
            </motion>

            <div id="actions" class="flex items-center-safe justify-start gap-2 mt-5">
              <u-button :id="createElementId('cta', 'content', 'add-to-cart')" variant="solid" color="primary" size="xl" @click="addToCart(data)">
                Ajouter au panier
              </u-button>
  
              <u-button :id="createElementId('cta', 'content', 'like')" size="xl" class="h-full" @click="add(product)">
                <icon :name="getIcon(product)" />
              </u-button>
            </div>

            <!-- Klarna -->
            <p class="font-light mt-3">
              3 paiements à 0 % d'intérêt avec <span class="font-bold">Klarna</span> <nuxt-link to="/klarna" class="underline font-semibold underline-offset-2">En savoir plus</nuxt-link>
            </p>
          </div>
        </div>

        <!-- Reassurance -->
        <lazy-product-reassurance hydrate-on-visible />
      </aside>

      <div v-else class="md:mt-20">
        <u-skeleton class="h-6 w-50 md:w-100 mb-3" />
        <u-skeleton class="h-6 w-40 md:w-80 mb-3" />
        <u-skeleton class="h-6 w-40 md:w-80 mb-3" />
        <u-skeleton class="h-6 w-80 md:w-120 mb-3" />
        <u-skeleton class="h-60 w-100 md:w-80 my-5" />
        <u-skeleton class="h-40 w-100 md:w-80 my-10" />
      </div>
    </div>

    <!-- Recommendations -->
    <base-recommendations class="mt-10" />

    <!-- Modals -->
     <client-only>
       <teleport to="body">
         <lazy-product-images-super-zoom v-model:open="isOpen" hydrate-on-idle @close="deselect" />
       </teleport>
     </client-only>
  </section>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import { toBaseProduct } from '#shared/utils'

const items: BreadcrumbItem[] = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Sous-vêtements femmes',
    disabled: true
  }
]

const { id } = useRoute().params as { id: string }
const { data } = useAsyncData('product', async () => await $fetch<Product>(`/api/product/${id}`, { method: 'GET' }))
const product = computed(() => toBaseProduct(data))

/**
 * Zoom
 */

const { selectedImage, select, deselect, isOpen } = useImageSuperZoom()

/**
 * Likes
 */

const { add, getIcon } = useLikeComposable()

/**
 * Cart
 */

const { selectedSize, showSizeWarning, addToCart, selectSize, sizeIsSelected } = useCartComposable()
</script>
