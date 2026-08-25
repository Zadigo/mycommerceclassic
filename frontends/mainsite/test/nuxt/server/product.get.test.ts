import { describe, it, expect, vi } from 'vitest'
import { H3Event } from 'h3'

vi.stubGlobal('defineEventHandler', (handler: any) => handler)

describe('route: /api/product/[id]/index', () => {
  it('should return a given product', async () => {
    const handler = await import('~~/server/api/product/[id]/index.get.ts')

    const mockEvent = {} as H3Event
    const result = await handler.default(mockEvent)
    
    expect(result).toHaveProperty('data.product')
  })
})
