import { toValue, type MaybeRefOrGetter } from 'vue'
import type { Undefineable } from './types/utils'
import type { MaybeRefOrGetterProducts } from './types/product'

/**
 * Returns the underlying base product from a given product item, which can be a BaseProduct, Product, or ProductNode.
 * @param item The product item to convert to a base product.
 */
export function toBaseProduct(item: Undefineable<MaybeRefOrGetterProducts>): BaseProduct | undefined {
  const _item = toValue(item)

  if (!_item) return undefined

  if ('node' in _item) {
    return _item.node
  } else if ('data' in _item) {
    return _item.data.product
  } else if ('id' in _item) {
    return _item
  } else {
    throw new Error('Invalid product type')
  }
}

/**
 * Converts an array of product items (BaseProduct, Product, or ProductNode) into an array of BaseProducts.
 * @param items The array of product items to convert.
 */
export function multipleToBaseProducts(items: Undefineable<MaybeRefOrGetterProducts[]>) {
  if (!items) return []
  const _items = toValue(items)
  return _items.map(toBaseProduct).filter((product): product is BaseProduct => product !== undefined)
}

/**
 * Creates a new object containing only the specified keys from a given BaseProduct object.
 * @param product The BaseProduct object from which to select keys.
 * @param keys An array of keys to select from the BaseProduct object.
 */
export function selectKeysFromProduct<K extends keyof BaseProduct>(product: MaybeRefOrGetter<BaseProduct | Product | ProductNode | undefined>, keys: K[]): Pick<BaseProduct, K> {
  const _product = toBaseProduct(product)

  if (!_product) {
    return {} as Pick<BaseProduct, K>
  }

  const selected: Partial<Pick<BaseProduct, K>> = {}

  for (const key of keys) {
    if (key in _product) {
      const result = _product[key] as BaseProduct[typeof key]
      selected[key] = result
    }
  }
  return selected as Pick<BaseProduct, K>
}
