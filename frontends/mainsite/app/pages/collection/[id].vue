<template>
  <section id="collection-page" class="px-5 relative">
    <!-- Header -->
    <header>
      <u-card class="ring-0">
        <div class="space-y-3">
          <u-breadcrumb :items="items">
            <template #separator>
              <span class="mx-2 text-muted" />
            </template>
          </u-breadcrumb>
  
          <div class="flex justify-between items-center">
            <h1 class="font-bold text-2xl">
              Sous-Vêtements
            </h1>
    
            <p class="font-light text-slate-300">
              986 articles
            </p>
          </div>
  
          <div class="flex gap-5 mt-2">
            <u-button v-for="i in 5" :key="i" to="/collection/some-collection" variant="link" color="neutral">
              Jupe
            </u-button>
          </div>
        </div>
      </u-card>
    </header>

    <!-- Products -->
    <section id="feed" class="grid grid-cols-12 w-full gap-1 my-5">
      <div class="col-span-12 md:col-span-4 xl:col-span-2">
        <lazy-products-filters-base hydrate-on-idle />
      </div>
      
      <div class="col-span-12 md:col-span-8 xl:col-span-10">
        <lazy-products-filters-selected :selection="strSelectedFilters" hydrate-on-idle @remove-filters="clearAll" @remove-filter="remove" />

        <motion :preset="VueUseMotions.SlideTop">
          <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-1">
            <product-card v-for="product in products" :key="product.id" :product="product" />
          </div>
        </motion>
      </div>
    </section>

    <!-- Pagination -->
    <section id="pagination" class="flex justify-center items-center gap-2 my-5">
      <u-button variant="subtle" color="neutral">
        <icon name="i-lucide-chevron-left" />
      </u-button>

      <u-button variant="subtle" color="neutral" @click="nextPage">
        <icon name="i-lucide-chevron-right" />
      </u-button>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

/**
 * Breadcrumb
 */

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

/**
 * Products
 */

const { data } = await useAsyncData('collection', () => $fetch('/api/collection/TEST-COLLECTION-ID'))

/**
 * Pagination
 */

const { paginatedData, nextPage } = usePaginationComposable(data)
const products = computed(() => toValue(paginatedData)?.data.collection?.products ?? [])

/**
 * Filters
 */

const { strSelectedFilters, remove, clearAll } = useProductFiltersProvider()
</script>
