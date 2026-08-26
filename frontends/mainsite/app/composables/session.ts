import { SESSION_COOKIE_NAME, SESSION_COLLECTION_NAME } from '#shared/cart'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

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

  tryOnMounted(async () => {
    if (!sessionId.value) {
      callOnce('createSession', async () => {
        await createSession()
      }, {
        mode: 'render'
      })
    }
  })
}

/**
 * A composable that provides reactive state and functions for managing user sessions.
 */
export const useSessionComposable = createGlobalState(() => {
  const sessionId = useCookie(SESSION_COOKIE_NAME)
  const hasSession = computed(() => isDefined(sessionId))

  if (isDefined(sessionId)) {
    const firestore = useFirestore()
    const _docRef = useDocument(doc(firestore, SESSION_COLLECTION_NAME, sessionId.value))
    const docRef = computed(() => _docRef.value)
    const isLoading = computed(() => _docRef.pending.value)

    return {
      isLoading,
      docRef,
      sessionId: readonly(sessionId),
      hasSession
    }
  } else {
    return {
      isLoading: ref(true),
      docRef: ref(null),
      sessionId: readonly(sessionId),
      hasSession
    }
  }
})
