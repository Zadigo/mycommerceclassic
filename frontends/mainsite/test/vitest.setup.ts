import { vi } from 'vitest'

const composableStore = vi.hoisted(() => {
  const useSessionComposable = vi.fn(() => ({ sessionId: { value: 'test-session-id' } }))
  return {
    useSessionComposable
  }
})

export { composableStore }
