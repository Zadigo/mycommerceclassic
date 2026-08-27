/**
 * Creates a standardized cart item object based on the provided product and size.
 * @param product - A reactive reference or getter for the product, which can be of type BaseProduct, ProductNode, Product, or undefined.
 * @param size - A reactive reference or getter for the size of the product, which is of type BaseSizeSet or null or undefined.
 */
export function createCartItem<T extends CartItem>(product: MaybeRefOrGetter<BaseProduct | ProductNode | Product | undefined>, size: MaybeRefOrGetter<BaseSizeSet | null | undefined>): T {
  const _product = toValue(product)
  const _size = toValue(size)

  if (!_size) {
    throw new Error('Size must be provided to create a cart item.')
  }

  const template: CartItem = {
    size: _size,
    quantity: 1,
    total: 0,
    product: {
      id: '',
      name: '',
      price: 0,
      salePrice: 0,
      unitPrice: 0,
      mainImage: {
        active: false,
        createdOn: '',
        id: '',
        isMainImage: false,
        name: '',
        original: '',
        thumbnail: '',
        variant: ''
      }
    }
  }

  if (_product && 'data' in _product && _product.data.product) {
    template.product.id = _product.data.product.id
    template.product.name = _product.data.product.name
    template.product.price = _product.data.product.price
    template.product.salePrice = _product.data.product.salePrice
    template.product.unitPrice = _product.data.product.unitPrice
    template.product.mainImage = _product.data.product.mainImage
  } else if (_product && 'id' in _product) {
    template.product.id = _product.id
    template.product.name = _product.name
    template.product.price = _product.price
    template.product.salePrice = _product.salePrice
    template.product.unitPrice = _product.unitPrice
    template.product.mainImage = _product.mainImage
  } else if (_product && 'node' in _product) {
    template.product.id = _product.node.id
    template.product.name = _product.node.name
    template.product.price = _product.node.price
    template.product.salePrice = _product.node.salePrice
    template.product.unitPrice = _product.node.unitPrice
    template.product.mainImage = _product.node.mainImage
  } else {
    throw new Error('Invalid product type provided to createCartItem function.')
  }

  return template as T
}
