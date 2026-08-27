import { describe, it, vi } from 'vitest'
import { H3Event } from 'h3'

const serverMocks = vi.hoisted(() => {
  const mockedGetCookie = vi.fn()
  return {
    mockedGetCookie
  }
})

vi.stubGlobal('defineEventHandler', (handler: any) => handler)
vi.stubGlobal('getCookie', () => serverMocks.mockedGetCookie)

vi.mock('#shared/server_firebase', async (original) => {
  const actual = await original<typeof import('~~/shared/server_firebase')>()
  return {
    ...actual,
    useFirebaseAdmin: vi.fn(() => {
      return {
        db: {
          collection: vi.fn(() => {
            return {
              doc: vi.fn(() => {
                return {
                  get: vi.fn(() => {
                    return Promise.resolve({
                      exists: true,
                      data: () => ({ cartId: 'test-cart-id' })
                    })
                  }),
                  exists: false,
                }
              })
            }
          })
        }
      }
    })
  }
})

describe.todo('route: /api/cart/index', () => {
  it('should return the cart', async () => {
    const handler = await import('~~/server/api/cart/index.get.ts')

    const mockEvent = {} as H3Event
    const result = await handler.default(mockEvent)
  })
})
