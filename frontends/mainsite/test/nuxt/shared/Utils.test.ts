import { describe, it, expect, vi } from 'vitest'
import { filterCartItems, findCartItem, filterCartItemsFunc, getProductId } from '#shared/cart'
import { CART_ITEMS } from '~~/test/__fixtures__/cart'
import { PRODUCT_DATA_FIXTURE, PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'

describe('shared/utils/filterCartItems', () => {
  it.each(
    [
      [{ testCase: 'with empty values',  values: [], productId: '', expected: [], size: '' }],
      [{ testCase: 'with cart items', values: CART_ITEMS, productId: '1', expected: CART_ITEMS, size: 'S' }],
      [{ testCase: 'wrong size and product ID', values: CART_ITEMS, productId: '999', expected: [], size: '' }],
      [{ testCase: 'wrong product ID correct size', values: CART_ITEMS, productId: '999', expected: [], size: 'M' }]
    ]
  )('should filter with values $testCase', ({ values, productId, expected, size}) => {
    const result = filterCartItems(values, productId, size)
    expect(result).toEqual(expected)
  })
})

describe('shared/utils/findCartItem', () => {
  it.each(
    [
      [{ testCase: 'with empty values',  values: [], productId: '', expected: undefined, size: '' }],
      [{ testCase: 'with cart items', values: CART_ITEMS, productId: '1', expected: CART_ITEMS[0], size: 'S' }],
      [{ testCase: 'wrong size and product ID', values: CART_ITEMS, productId: '999', expected: undefined, size: '' }],
      [{ testCase: 'wrong product ID correct size', values: CART_ITEMS, productId: '999', expected: undefined, size: 'M' }]
    ]
  )('should find with values $testCase', ({ values, productId, expected, size}) => {
    const result = findCartItem(values, productId, size as BaseSizeSet['name'])
    expect(result).toEqual(expected)
  })
})

describe('shared/utils/filterCartItemsFunc', () => {
  it.each(
    [
      [{ testCase: 'no values',  values: [], productToFind: CART_ITEMS[0] as CartItem, expected: 0 }],
      [{ testCase: 'with values',  values: CART_ITEMS, productToFind: CART_ITEMS[0] as CartItem, expected: 1 }]
    ]
  )('should filter with values $testCase', ({ values, productToFind, expected }) => {
    const result = values.filter(filterCartItemsFunc(productToFind))
    expect(result.length).toEqual(expected)
  })
})

describe('shared/utils/getProductId', () => {
  it.each(
    [
      [{ testCase: 'product undefined',  product: undefined }],
      [{ testCase: 'product node', product: PRODUCT_NODE_FIXTURE }],
      [{ testCase: 'product data',  product: { data: { product: PRODUCT_DATA_FIXTURE } } }],
      [{ testCase: 'simple product',  product: PRODUCT_DATA_FIXTURE }]
    ]
  )('should filter with values $testCase', ({ product }) => {
    const result = getProductId(product)

    if (!product) {
      expect(result).toBeUndefined()
    } else {
      expect(result).toBeDefined()
    }
  })
})
