import { describe, it, expect, vi } from 'vitest'
import { PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'

describe('shared/utils/toBaseProduct', () => {
  it.each(
    [
      [{ testCase: 'node', product: PRODUCT_NODE_FIXTURE }],
      [{ testCase: 'data', product: { data: { product: PRODUCT_NODE_FIXTURE.node } } }],
      [{ testCase: 'base product', product: PRODUCT_NODE_FIXTURE.node }],
      [{ testCase: 'undefined', product: undefined }],
      [{ testCase: 'reactive product', product: ref(PRODUCT_NODE_FIXTURE) }]
    ]
  )('should return the plain base product object from product $testCase', async ({ product }) => {
    const { toBaseProduct } = await vi.importActual<typeof import('#shared/utils')>('#shared/utils')
    const result = toBaseProduct(product)
    
    if (!product) {
      expect(result).toBeUndefined()
    } else {
      expect(result).toBeDefined()
      expect(result).toEqual(PRODUCT_NODE_FIXTURE.node)
    }
  })

  it('should throw an error for invalid product type', async () => {
    const { toBaseProduct } = await vi.importActual<typeof import('#shared/utils')>('#shared/utils')
    const invalidProduct = { invalid: 'product' } as unknown as BaseProduct

    expect(() => toBaseProduct(invalidProduct)).toThrow('Invalid product type')
  })

  it('should return multiple base products from an array of products', async () => {
    const { multipleToBaseProducts } = await vi.importActual<typeof import('#shared/utils')>('#shared/utils')

    const products = [
      PRODUCT_NODE_FIXTURE, 
      { data: { product: PRODUCT_NODE_FIXTURE.node } }, 
      PRODUCT_NODE_FIXTURE.node
    ]
    
    const result = multipleToBaseProducts(products)

    expect(result).toHaveLength(3)
    expect(result[0]).toEqual(PRODUCT_NODE_FIXTURE.node)
    expect(result[1]).toEqual(PRODUCT_NODE_FIXTURE.node)
    expect(result[2]).toEqual(PRODUCT_NODE_FIXTURE.node)
  })
})

describe('shared/utils/selectKeysFromProduct', () => {
  it.each(
    [
      [{ testCase: 'with empty values', product: undefined }],
      [{ testCase: 'node', product: PRODUCT_NODE_FIXTURE }],
      [{ testCase: 'data', product: { data: { product: PRODUCT_NODE_FIXTURE.node } } }],
      [{ testCase: 'base product', product: PRODUCT_NODE_FIXTURE.node }]
    ]
  )('should select keys from any product type like $testCase', async ({ product}) => {
    const { selectKeysFromProduct } = await vi.importActual<typeof import('#shared/utils')>('#shared/utils')
    const result = selectKeysFromProduct(product, ['id'])
    if (!product) {
      expect(result).toEqual({})
    } else {
      expect(result).toHaveProperty('id')
    }
  })  
})

