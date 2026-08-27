import { SESSION_COLLECTION_NAME, SESSION_COOKIE_NAME } from '~~/shared/cart'
import { useFirebaseAdmin } from '#shared/server_firebase'
import { createErrorTemplate } from '#shared/utils'
import { SessionData } from '~~/shared/types/session'

type SessionResponse = {
  sessionId: string
}

export default defineEventHandler(async (event) => {
  try {
    const { db } = useFirebaseAdmin()
    const collectionRef = db.collection(SESSION_COLLECTION_NAME)
    const sessionId = getCookie(event, SESSION_COOKIE_NAME)

    if (typeof sessionId === 'undefined') {
      const docRef = await collectionRef.add({
        createdAt: new Date()
      })

      const data: SessionData = {
        language: {
          choice: 'en',
          selected: true
        },
        recommendations: [],
        searchHistory: []
      }

      await docRef.set({
        ...data,
        createdAt: new Date()
      })

      setCookie(event, SESSION_COOKIE_NAME, docRef.id, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // Ensures the cookie belongs to the whole app scope
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        ...(process.env.NODE_ENV === 'production' ? { domain: '.mycommerceclassic.com' } : {})
      })

      return { sessionId: docRef.id } as SessionResponse
    } else {
      return { sessionId } as SessionResponse
    }
  } catch (error) {
    console.error('Error creating session:', error)
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
