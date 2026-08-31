import { describe, it, expect, vi } from 'vitest'
import { useLoadFixtures } from '#server/utils/testing'
import type { H3Event } from 'h3'

const routerStore = vi.hoisted(() => {
  const routerParam = vi.fn((event: H3Event, param: string | undefined) => {
    if (param === 'id') return '1'
    if (param === 'q') return 'jupe'
    return undefined
  })

  return {
    routerParam
  }
})

vi.mock('h3', async (original) => {
  const actual = await original<typeof import('h3')>()

  return {
    ...actual,
    getRouterParam: routerStore.routerParam
  }
})

describe('server/utils/useLoadFixtures', { tags: ['composables', 'server'] }, () => {
  it('should return default values', () => {
    const result = useLoadFixtures()
    expect(result).toHaveProperty('fixtures')
    expect(result).toHaveProperty('getProduct')
    expect(result).toHaveProperty('raw')
    expect(result).toHaveProperty('singleProduct')
    expect(result).toHaveProperty('search')
    expect(result).toHaveProperty('toNodes')
    expect(result).toHaveProperty('toPaginated')
    expect(result.fixtures.value).toBeInstanceOf(Array)
    expect(result.fixtures.value.length).toBeGreaterThan(0)
  })

  it.each(
    [
      [{ testCase: 'with valid id', id: '1', expected: true }],
      [{ testCase: 'with invalid id', id: '99999', expected: false }],
      [{ testCase: 'with undefined id', id: undefined, expected: false }]
    ]
  )('should return a product by id $testCase', ({ id, expected }) => {
    const result = useLoadFixtures()
    const value = result.getProduct({} as H3Event)
    if (expected) {
      expect(value).toBeDefined()
    } else {
      routerStore.routerParam.mockImplementationOnce((_event: H3Event, _param: string | undefined) => {
        if (_param === 'id') return id
        return undefined
      })
      const value = result.getProduct({} as H3Event)
      expect(value).toBeUndefined()
    }
  })

  it('should return the raw fixtures', () => {
    const result = useLoadFixtures()
    const value = result.raw()

    expect(value).toBeInstanceOf(Array)
    expect(value.length).toBeGreaterThan(0)
  })

  it('should return the first product', () => {
    const result = useLoadFixtures()
    const value = result.singleProduct()
    expect(value).toBeDefined()
  })

  it.each(
    [
      [{ testCase: 'with valid query', query: 'jupe', expected: true }],
      [{ testCase: 'with invalid query', query: 'facebook', expected: false }],
    ]
  )('should return list of products with $testCase', ({ query, expected }) => {
    routerStore.routerParam.mockImplementationOnce((_event: H3Event, _param: string | undefined) => {
      if (_param === 'q') return query
      return undefined
    })

    const result = useLoadFixtures()
    const value = result.search({} as H3Event, 'q')

    if (expected) {
      expect(value.length).toBeGreaterThan(0)
    } else {
      expect(value.length).toBe(0)
    }
  })
})

