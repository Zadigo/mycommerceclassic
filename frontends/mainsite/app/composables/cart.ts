export const useCartComposable = createGlobalState(<P extends BaseProduct | undefined, T extends MaybeRefOrGetter<P>, S extends MaybeRefOrGetter<BaseSizeSet | null>>() => {
  const selectedSize = ref<BaseSizeSet | null>(null)
  const showSizeWarning = refAutoReset(false, 3000)

  const lastProduct = ref<BaseProduct | undefined>(undefined)

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
      product: {
        id: _product.id,
        name: _product.name,
        price: _product.price,
        salePrice: _product.salePrice,
        unitPrice: _product.unitPrice,
        mainImage: _product.mainImage
      },
      size: _size,
      quantity: 1,
      total: 0
    }

    await $fetch('/api/cart/add', {
      method: 'PATCH',
      body: cartItem
    })

    lastProduct.value = _product
    selectedSize.value = null
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
    /**
     * The last product that was added to the cart. This can be used to 
     * show a confirmation message or perform other actions after 
     * adding a product.
     * @default null
     */
    lastProduct,
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
