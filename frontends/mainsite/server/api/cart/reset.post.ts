import { useFirebaseAdmin } from '#shared/server_firebase'
import { COOKIE_NAME, CART_COLLECTION_NAME } from '#shared/cart'
import { createErrorTemplate } from '~~/shared/utils'

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, COOKIE_NAME)
  if (!cookie) {
    return
  }

  try {
    const { db } = useFirebaseAdmin()
    const docRef = db.collection(CART_COLLECTION_NAME).doc(cookie)

    const docSnapshot = await docRef.get()

    if (docSnapshot.exists) {
      await docRef.update({
        items: []
      })
    }

    await docRef.update({
      items: []
    })

    return docRef.id
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
