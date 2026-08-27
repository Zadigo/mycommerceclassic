import { useFirebaseAdmin } from '#shared/server_firebase'
import { CartSessionData } from '#shared/types/cart'
import { CART_COOKIE_NAME, CART_COLLECTION_NAME, SESSION_COOKIE_NAME } from '#shared/cart'
import { createErrorTemplate } from '~~/shared/utils'

type CartSessionResponse = {
  cartSessionId: string
}

export default defineEventHandler(async (event) => {
  const rawCookies = getHeader(event, 'cookie')
  console.log('👉 Raw cookies received by server:', rawCookies)

  const sessionId = getCookie(event, SESSION_COOKIE_NAME)
  console.log('👉 Session ID received by server:', sessionId)

  if (!sessionId) {
    const template = createErrorTemplate(new Error('Session ID is missing'))
    throw createError(template)
  }

  const cartSessionId = getCookie(event, CART_COOKIE_NAME)
  
  if (cartSessionId) {
    return { cartSessionId } as CartSessionResponse
  }

  try {
    const { db } = useFirebaseAdmin()
    const docRef = db.collection(CART_COLLECTION_NAME).doc()
    
    const sessionData: CartSessionData = {
      sessionId,
      items: [],
      total: 0,
      numberOfItems: 0,
      paymentIntent: null,
      authenticated: false,
      viewCount: 0,
      status: 'active'
    }
    
    await docRef.create({
      ...sessionData,
      createdAt: new Date().toISOString()
    })
  
    setCookie(event, CART_COOKIE_NAME, docRef.id, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/', // Ensures the cookie belongs to the whole app scope
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      ...(process.env.NODE_ENV === 'production' ? { domain: '.mycommerceclassic.com' } : {})
    })
    
    return {
      cartSessionId: docRef.id
    }
  } catch (error) {
    const template = createErrorTemplate(error)
    throw createError(template)
  }
})
