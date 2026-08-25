import { useFirebaseAdmin } from '#shared/server_firebase'
import { createErrorTemplate } from '#shared/utils'
import { SESSION_COOKIE_NAME, LIKE_COLLECTION_NAME } from '#shared/cart'
import { FieldValue } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  try {
    const sessionId = getCookie(event, SESSION_COOKIE_NAME)
    const body = await readBody<{ productId: number}>(event)

    const { db } = useFirebaseAdmin()
    const collectionRef = db.collection(LIKE_COLLECTION_NAME)
    
    if (typeof sessionId !== 'undefined') {
      const result = collectionRef.where('sessionId', '==', sessionId)
      
      if ((await result.get()).empty) {
        await collectionRef.add({
          sessionId: sessionId,
          items: [body.productId],
        })
      } else {
        const docRef = (await result.get()).docs[0]?.ref
        if (docRef) {
          await docRef.update({
            items: FieldValue.arrayUnion(body.productId),
          })
        } else {
          throw createError({
            statusCode: 404,
            statusMessage: 'Document not found',
          })
        }
      }
    } else {
      const template = createErrorTemplate(new Error('Session ID is undefined'))
      throw createError(template)
    }
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
