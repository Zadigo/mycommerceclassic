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
      method: 'POST',
      body: cartItem
    })
  }

  return {
    addToCart
  }
})
