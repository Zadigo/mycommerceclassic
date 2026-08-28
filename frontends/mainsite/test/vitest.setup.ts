import { vi } from 'vitest'
import { PRODUCT_NODE_FIXTURE } from './__fixtures__/product'
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack/types'

const composableStore = vi.hoisted(() => {
  const useSessionComposable = vi.fn(() => ({ sessionId: { value: 'test-session-id' } }))
  return {
    useSessionComposable
  }
})

const fetchStore = vi.hoisted(() => {
  const mockedFetchNodeProducts = vi.fn(async (_url: NitroFetchRequest, _options: NitroFetchOptions<any>) => {
    return PRODUCT_NODE_FIXTURE
  })

  return {
    mockedFetchNodeProducts
  }
})

export { composableStore, fetchStore }
