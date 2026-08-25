<template>
  <section id="product" class="px-5 relative">
    <div class="grid grid-cols-12 gap-8">
      <!-- Images -->
      <lazy-product-images-grid hydrate-on-idle @zoom="select" />

      <aside v-if="product" class="col-span-4 py-15">
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

          <div class="group grid grid-cols-8 gap-2">
            <nuxt-link v-for="i in 6" :key="i" to="/">
              <nuxt-img src="/img1.webp" class="w-full group-hover:ring-2 group-hover:ring-primary transition-transform duration-200" />
            </nuxt-link>
          </div>
        </div>

        <div id="size" class="py-5">
          <p class="font-light">
            Taille
          </p>

          <!-- Size -->
          <div :id="createElementId('cta', 'content', 'sizes')">
            <div id="cta-sizes" class="flex gap-2">
              <u-button v-for="i in 4" :key="i" size="xl">
                XS
              </u-button>
            </div>

            <u-button variant="link" icon="i-lucide-ruler" class="mt-5">
              Guide des tailles
            </u-button>
          </div>

          <!-- Actions -->
          <div id="cart-actions">
            <div id="actions" class="flex gap-2">
              <u-button :id="createElementId('cta', 'content', 'add-to-cart')" variant="solid" color="primary" class="w-full mt-5" @click="addToCart({ active: true, availability: true, metric: 'clothe', name: 'S', variantPrice: 10 }, data)">
                Ajouter au panier
              </u-button>
  
              <u-button :id="createElementId('cta', 'content', 'like')" @click="add(product)">
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
      <div v-else>
        <u-skeleton class="h-6 w-1/2 mb-3" />
        <u-skeleton class="h-6 w-1/4 mb-3" />
      </div>
    </div>

    <!-- Modals -->
    <lazy-product-images-super-zoom v-if="isOpen" hydrate-on-idle @close="deselect" />
  </section>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

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

const { data } = useAsyncData('product', async () => await $fetch('/api/product/1', { method: 'GET' }))
const product = computed(() => toValue(data)?.data.product)

const { selectedImage, select, deselect, isOpen } = useImageSuperZoom()
const { add, getIcon } = useLikeComposable()
const { addToCart } = useCartComposable()
</script>
