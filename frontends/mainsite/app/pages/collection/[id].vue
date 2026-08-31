<template>
  <section id="collection-page" class="px-1 md:px-5 relative">
    <!-- Header -->
    <header>
      <u-card class="ring-0">
        <div class="space-y-3">
          <u-breadcrumb :items="breadcrumbItems" color="neutral" separator-icon="i-lucide-chevron-right">
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
    <section id="feed" class="grid grid-cols-12 w-full gap-1 my-5 relative">
      <aside class="col-span-12 md:col-span-4 xl:col-span-2">
        <lazy-products-filters-base class="sticky top-25 left-0" hydrate-on-idle />
      </aside>
      
      <div class="col-span-12 md:col-span-8 xl:col-span-10">
        <lazy-products-filters-selected :selection="strSelectedFilters" hydrate-on-idle @remove-filters="clearAll" @remove-filter="remove" />

        <motion :preset="VueUseMotions.SlideTop">
          <div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-1">
            <product-card v-for="product in data?.data.collection.products || []" :key="product.id" :product="product" />
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
 * Products
 */

const { data } = await useAsyncData('productCollection', () => $fetch<CollectionProducts>('/api/collection/TEST-COLLECTION-ID'))
  
/**
 * Filters
 * @todo Ensure it works with pagination
 */

const { products, response, strSelectedFilters, remove, clearAll } = useProductFiltersProvider()

/**
 * Pagination
 * @todo Ensure pagination is correctly handled
 */

const { paginatedResponse, nextPage } = usePaginationComposable(response)
// const products = computed(() => toValue(paginatedData)?.data.collection?.products ?? [])

/**
 * Breadcrumb
 */

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: toValue(data)?.data.collection.name || 'Not defined',
    disabled: true
  }
])
</script>
