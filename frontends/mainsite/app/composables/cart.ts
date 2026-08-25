export const useCartComposable = createGlobalState(() => {
  const selectedSize = ref<BaseSizeSet | null>(null)
  const showSizeWarning = refAutoReset(false, 3000)

  async function addToCart(product: MaybeRefOrGetter<Product | undefined>, size?: MaybeRefOrGetter<BaseSizeSet | null>) {
    const _product = toValue(product)
    const _size = toValue(size) || toValue(selectedSize)

    if (!_product) {
      console.error('Product is undefined')
      return
    }

    if (!_size) {
      showSizeWarning.value = true
      return
    }

    const cartItem: CartItem = {
      product: _product.data.product,
      size: _size,
      quantity: 1,
      total: 0
    }

    selectedSize.value = null

    await $fetch('/api/cart/add', {
      method: 'PATCH',
      body: cartItem
    })
  }

  function selectSize(size: BaseSizeSet) {
    selectedSize.value = size
  }

  function sizeIsSelected(size: BaseSizeSet): boolean {
    return selectedSize.value?.name === size.name
  }

  return {
    showSizeWarning,
    selectedSize,
    addToCart,
    selectSize,
    sizeIsSelected
  }
})
