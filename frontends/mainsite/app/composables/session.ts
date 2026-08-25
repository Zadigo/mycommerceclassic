import { SESSION_COOKIE_NAME, SESSION_COLLECTION_NAME } from '#shared/cart'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

export const useSessionComposable = createGlobalState(() => {
  const sessionId = useCookie(SESSION_COOKIE_NAME)
  const hasSession = computed(() => isDefined(sessionId.value))

  if (isDefined(sessionId)) {
    const firestore = useFirestore()
    console.log(useFirestore)
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
