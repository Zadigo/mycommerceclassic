<template>
  <u-card class="mb-5">
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
          <u-input-number v-model="quantity" placeholder="Quantité" />
          <u-button @click="() => { remove(item.product, item.size) }">
            <icon name="i-lucide-trash" />
          </u-button>
        </div>
      </div>
    </div>
  </u-card>
</template>

<script setup lang="ts">
const { item } = defineProps<{
  item: CartItem
}>()

const { remove, increaseQuantity, reduceQuantity } = useCartComposable()

const quantity = ref(item.quantity)

watch(quantity, async (newQuantity, oldQuantity) => {
  if (newQuantity > oldQuantity) {
    await increaseQuantity(item.product, item.size)
  } else if (newQuantity < oldQuantity) {
    await reduceQuantity(item.product, item.size)
  }

  if (newQuantity === 0) {
    await remove(item.product, item.size)
  }
})
</script>
