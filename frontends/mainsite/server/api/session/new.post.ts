import { SESSION_COLLECTION_NAME, SESSION_COOKIE_NAME } from '~~/shared/cart'
import { useFirebaseAdmin } from '#shared/server_firebase'
import { createErrorTemplate } from '#shared/errors'
import { SessionData } from '~~/shared/types/session'

type SessionResponse = {
  sessionId: string
}

export default defineEventHandler(async (event) => {
  try {
    const { docRef } = await getOrCreateSession(event)
    return { sessionId: docRef.id } as SessionResponse
  } catch (error) {
    console.error('Error creating session:', error)
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
