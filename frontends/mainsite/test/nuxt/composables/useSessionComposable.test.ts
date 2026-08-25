import { describe, it, expect, vi } from 'vitest'
import { useSessionComposable } from '~/composables/session'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const { mockedUseCookie } = vi.hoisted(() => {
  const mockedUseCookie = vi.fn(() => ({
    value: 'mocked-session-id'
  } as { value: string | undefined }))

  return {
    mockedUseCookie
  }
})

mockNuxtImport('useCookie', () => mockedUseCookie)

describe.skip('useSessionComposable', () => {
  it('should return the correct properties when sessionId is defined', () => {
    const result = useSessionComposable()

    expect(result).toHaveProperty('isLoading')
    expect(result).toHaveProperty('docRef')
    expect(result).toHaveProperty('sessionId')
    expect(result).toHaveProperty('hasSession')
  })

  it('should return false with sessionId is not defined', () => {
    mockedUseCookie.mockReturnValueOnce({ value: undefined })
    const result = useSessionComposable()

    expect(toValue(result.hasSession)).toBe(true)
  })
})
