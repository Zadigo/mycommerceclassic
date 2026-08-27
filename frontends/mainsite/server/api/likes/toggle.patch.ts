import { useFirebaseAdmin } from '#shared/server_firebase'
import { createErrorTemplate } from '#shared/utils'
import { SESSION_COOKIE_NAME, LIKE_COLLECTION_NAME } from '#shared/cart'
import { FieldValue } from 'firebase-admin/firestore'
import { getOrCreateLikeDocument } from '~~/server/utils/session'
  
export default defineEventHandler(async (event) => {
  try {
    const { likeCookieId } = await getOrCreateLikeDocument(event)

    const body = await readBody<{ productId: number | undefined }>(event)

    if (typeof body.productId === 'undefined') {
      const template = createErrorTemplate(new Error('Product ID is undefined'))
      throw createError(template)
    }

    const { db } = useFirebaseAdmin()
    const collectionRef = db.collection(LIKE_COLLECTION_NAME)

    const sessionId = getCookie(event, SESSION_COOKIE_NAME)

    if (sessionId) {
      const result = collectionRef.where('sessionId', '==', sessionId)
      const documentData = await result.get()

      if (documentData.empty) {
        await collectionRef.add({
          sessionId: sessionId,
          items: [body.productId],
        })
      } else {
        const docRef = documentData.docs[0]?.ref
        const items = (await docRef?.get())?.data()?.items || []

        if (items.includes(body.productId)) {
          await docRef?.update({
            items: FieldValue.arrayRemove(body.productId),
            updatedAt: new Date(),
          })
        } else {
          await docRef?.update({
            items: FieldValue.arrayUnion(body.productId),
            updatedAt: new Date(),
          })
        }
      }
    }

    return { likeCookieId }
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
