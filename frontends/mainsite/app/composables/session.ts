import { SESSION_COOKIE_NAME } from '#shared/cart'

/**
 * A composable that provides a function to create a new user session.
 */
export function useSessionCreateComposable() {
  const sessionId = useCookie(SESSION_COOKIE_NAME)

  async function createSession() {
    return await $fetch('/api/session/new', {
      method: 'POST'
    })
  }

  if (import.meta.client && !sessionId.value) {
    callOnce('createSession', async () => {
      await createSession()
    }, {
      mode: 'render'
    })
  }
}

/**
 * A composable that provides reactive state and functions for managing user sessions.
 */
export const useSessionComposable = createGlobalState(() => {
  const sessionId = useCookie(SESSION_COOKIE_NAME)
  const hasSession = computed(() => isDefined(sessionId))
  const docRef = computedAsync(async () => await $fetch('/api/session', { method: 'GET' }), {} as SessionData)

  return {
    sessionId: readonly(sessionId),
    hasSession,
    docRef
  }
})
