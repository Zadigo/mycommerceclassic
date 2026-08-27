import { describe, it, expect, vi } from 'vitest'
import { useLastProductComposable } from '~/composables/cart'
import { PRODUCT_DATA_FIXTURE } from '~~/test/__fixtures__/product'

describe('useLastProductComposable', () => {
  it('should return the default properties', async () => {
    const result = useLastProductComposable(ref(PRODUCT_DATA_FIXTURE))
    expect(result.notifyUser.value).toBe(false)
    expect(result.toggleNotification).toBeInstanceOf(Function)
  })  
})

