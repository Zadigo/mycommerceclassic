import { describe, it, expect, vi, beforeEach } from 'vitest'
import { composableStore } from '../../vitest.setup'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useLoadFixtures } from '#server/utils/testing'

vi.mock('~/composables/session', async (original) => {
  const actual = await original<typeof import('~/composables/session')>()

  return {
    ...actual,
    useSessionComposable: composableStore.useSessionComposable
  }
})

vi.mock('vuefire', async (original) => {
  const actual = await original<typeof import('vuefire')>()
  return {
    ...actual,
    useCollection: vi.fn(() => ({ data: { value: [] } })),
  }
})

describe('composables/useLikeComposable', { tags: ['composables'] }, () => {
  let result: ReturnType<typeof useLikeComposable> = {} as unknown as ReturnType<typeof useLikeComposable>

  beforeEach(async () => {
    vi.clearAllMocks()

    const { useLikeComposable } = await vi.importActual<typeof import('~/composables/product')>('~/composables/product')
    
    await mountSuspended(
      defineComponent({
        template: `
        <div data-test-id="test-div">
          <span :id="result.getIcon()" />
        </div>
        `,
        setup() {
          result = useLikeComposable()
          return { result }
        }
      })
    )
  })

  it.todo('should return the values from docData' , async () => {
    expect(result.docData.value).toBeUndefined()
  })

  it('should return default properties', async () => {
    expect(result).toBeDefined()
    expect(result).toHaveProperty('docData')
    expect(result).toHaveProperty('products')
    expect(result.add).toBeInstanceOf(Function)
    expect(result.getIcon).toBeInstanceOf(Function)
  })

  describe('getIcon', () => {
    it.each(
      [
        [{ testCase: 'no product',  product: undefined, expected: 'i-lucide-heart' }],
        [{ testCase: 'product is defined', product: useLoadFixtures().singleProduct(), expected: 'i-lucide-heart' }]
      ]
    )('should return the correct icon when product is $testCase', ({ product, expected }) => {
      expect(result.getIcon(product)).toEqual(expected)
    })
  })
})

