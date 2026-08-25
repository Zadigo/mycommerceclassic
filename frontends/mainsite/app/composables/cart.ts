export const useCartComposable = createGlobalState(() => {
  async function addToCart(size: BaseSizeSet, product: Product | undefined) {
    if (!isDefined(product)) {
      console.error('Product is undefined')
      return
    }

    const cartItem: CartItem = {
      product: product.data.product,
      size: {
        name: 'S',
        active: true,
        availability: true,
        metric: 'cm',
        variantPrice: product.data.product.price
      },
      quantity: 1,
      total: product.data.product.price
    }

    await $fetch('/api/cart/add', {
      method: 'PATCH',
      body: cartItem
    })
  }

  const selectedSize = ref<BaseSizeSet | null>(null)

  function selectSize(size: BaseSizeSet) {
    selectedSize.value = size
  }

  function sizeIsSelected(size: BaseSizeSet): boolean {
    return selectedSize.value?.name === size.name
  }

  return {
    selectedSize,
    addToCart,
    selectSize,
    sizeIsSelected
  }
})
