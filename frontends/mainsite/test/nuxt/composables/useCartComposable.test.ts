import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import { PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'

mockNuxtImport('$fetch', () => vi.fn())

describe('composables/useCartComposable', { tags: ['composables'] }, () => {
  it('should initialize with no selected size and no warning', () => {
    const { selectedSize, showSizeWarning } = useCartComposable()
    expect(selectedSize.value).toBeNull()
    expect(showSizeWarning.value).toBe(false)
  })

  it('should select a size', () => {
    const { selectedSize, selectSize, sizeIsSelected } = useCartComposable()
    const size = PRODUCT_NODE_FIXTURE.node.sizeSet?.[0] as BaseSizeSet

    selectSize(size)
    expect(selectedSize.value).toEqual(size)
    expect(sizeIsSelected(size)).toBe(true)
  })

  it('should show size warning when adding to cart without selecting a size', async () => {
    const { addToCart, showSizeWarning } = useCartComposable()
    await addToCart(ref({ data: { product: PRODUCT_NODE_FIXTURE.node }}))
    expect(showSizeWarning.value).toBe(false)
  })

  it('should show warning when no size is selected', () => {
    const { selectedSize, addToCart, showSizeWarning } = useCartComposable()

    selectedSize.value = null
    addToCart(ref({ data: { product: PRODUCT_NODE_FIXTURE.node }}))
    expect(showSizeWarning.value).toBe(true)
  })
})
