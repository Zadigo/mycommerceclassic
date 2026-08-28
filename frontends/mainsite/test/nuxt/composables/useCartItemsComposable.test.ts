import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import { useCartItemsComposable } from '~/composables/cart'

const mockStore = vi.hoisted(() => {
  const useCookieMock = vi.fn(() => ref<string | undefined>(undefined))
  const docMock = vi.fn(() => false)
  return {
    docMock,
    useCookieMock
  }
})

vi.mock('vuefire', async (original) => {
  const actual = await original<typeof import('vuefire')>()

  return {
    ...actual,
    useFirestore: vi.fn(),
    useDocument: vi.fn()
  }
})

vi.mock('firebase/firestore', async (original) => {
  const actual = await original<typeof import('firebase/firestore')>()

  return {
    ...actual,
    doc: mockStore.docMock
  }
})

mockNuxtImport('useCookie', () => mockStore.useCookieMock)

describe('composables/useCartItemsComposable', { tags: ['composables'] }, () => {
  it('should return the default properties', () => {
    const result = useCartItemsComposable()
    expect(result.docRef).toBeDefined()
    expect(result.items).toBeDefined()
  })

  it.each(
    [
      [{ environment: 'client', cookie: undefined }, true],
      [{ environment: 'client', cookie: '1234' }, true],
    ]
  )('test with different cookie types set as $cookie', ({ environment, cookie }, value) => {
    mockStore.useCookieMock.mockReturnValue(ref(cookie))
    mockStore.docMock.mockReturnValue(true)

    const result = useCartItemsComposable()

    if (cookie) {
      expect(result.docRef.value).toBeTruthy()
    } else {
      expect(result.docRef.value).toBeFalsy()
    }
  })
})

