import { describe, it, expect, vi } from 'vitest'
import { usePaginationComposable } from '~/composables/products'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useLoadCollectionFixture, useLoadSearchCollectionFixture } from '#server/utils/testing'

const mockStore = vi.hoisted(() => {
  const mockedFetch = vi.fn()
  return {
    mockedFetch
  }
})

mockNuxtImport('$fetch', () => mockStore.mockedFetch)

describe('composables/usePaginationComposable', { tags: ['composables'] }, () => {
  it.each(
    [
      [{ testCase: 'with undefined', value: undefined }],
      [{ testCase: 'with collection', value: useLoadCollectionFixture().value }],
    ]
  )('should return default values $testCase', async ({ value }) => {
    const result = usePaginationComposable(value)

    expect(result).toHaveProperty('products')
    expect(result).toHaveProperty('paginationInfo')
    expect(result).toHaveProperty('paginatedResponse')
    expect(result).toHaveProperty('nextPage')
    expect(result.nextPage).toBeInstanceOf(Function)
  })

  it.each(
    [
      [{ testCase: 'with undefined', value: undefined }],
      [{ testCase: 'with collection', value: useLoadCollectionFixture().value }],
      [{ testCase: 'with search collection', value: useLoadSearchCollectionFixture().value }],
      [{ testCase: 'with empty initial', value: [] as unknown as any }],
    ]
  )('should return correct pagination info with $testCase', async ({ testCase, value }) => {
    const template = {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null
    }

    const result = usePaginationComposable(value)
    if (value === undefined) {
      expect(result.paginationInfo.value).toEqual(template)
    }
    
    if (testCase === 'with collection') {
      expect(result.paginationInfo.value).toEqual(template)
    }
  })

  describe.only('$fetch', () => {
    it.each(
      [
        [{ testCase: 'with undefined', value: undefined }],
        [{ testCase: 'with collection', value: useLoadCollectionFixture().value }],
        [{ testCase: 'with search collection', value: useLoadSearchCollectionFixture().value }]
      ]
    )('should return base products with fetch returning $testCase', async ({ testCase, value }) => {
      mockStore.mockedFetch.mockResolvedValueOnce(value)

      const { products } = usePaginationComposable(value)
      const result = toValue(products)

      if (testCase === 'with undefined') {
        expect(result).toBeInstanceOf(Array)
      }
    })
  })
}) 
