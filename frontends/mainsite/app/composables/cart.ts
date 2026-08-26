export const useCartComposable = createGlobalState(<T extends MaybeRefOrGetter<BaseProduct | undefined>, S extends MaybeRefOrGetter<BaseSizeSet | null>>() => {
  const selectedSize = ref<BaseSizeSet | null>(null)
  const showSizeWarning = refAutoReset(false, 3000)

  async function addToCart(product: T, size?: S) {
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

  async function changeQuantity(product: T, size: S | undefined, direction: 'increase' | 'decrease') {
    const _product = toValue(product)

    if (_product) {
      return await $fetch('/api/cart/quantity', {
        method: 'PATCH',
        body: {
          direction: direction,
          size: toValue(size),
          productId: _product.id
        }
      })
    } else {
      return Promise.reject(new Error('Product is undefined'))
    }
  }
    
  async function reduceQuantity(product: T, size: S | undefined) {
    return await changeQuantity(product, size, 'decrease')
  }

  async function increaseQuantity(product: T) {
    return await changeQuantity(product, undefined, 'increase')
  }

  async function remove(_product: T, _size: S | undefined) {
    await $fetch('/api/cart/remove', {
      method: 'DELETE',
      body: {
        productId: toValue(_product)?.id,
        size: toValue(_size)
      }
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
    remove,
    selectSize,
    sizeIsSelected,
    reduceQuantity,
    increaseQuantity
  }
})
