import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ID from '~/pages/[id].vue'
import { PRODUCT_NODE_FIXTURE } from '~~/test/__fixtures__/product'
import ProductVariants from '~/components/product/Variants.vue'

vi.mock('~/components/product/images/Grid.vue', () => {
  return {
    default: defineComponent({
      name: 'MockedGrid',
      template: '<div data-test-id="mocked-images-grid">Images Grid</div>'
    })
  }
})

vi.mock('~/components/product/images/SuperZoom.vue', () => {
  return {
    default: defineComponent({
      name: 'MockedSuperZoom',
      template: '<div data-test-id="mocked-super-zoom">Mocked Super Zoom Component</div>'
    })
  }
})

vi.mock('~/components/base/Recommendations.vue', () => {
  return {
    default: defineComponent({
      name: 'MockedRecommendations',
      template: '<div data-test-id="mocked-recommendations">Recommendations</div>'
    })
  }
})

const { mockedFetch, mockedUseCartComposable } = vi.hoisted(() => {
  const mockedFetch = vi.fn(() => {
    return {
      data: {
        data: {
          product: PRODUCT_NODE_FIXTURE.node
        }
      }
    }
  })

  const mockedUseCartComposable = vi.fn(() => {
    return {
      selectedSize: ref(null),
      showSizeWarning: ref(false),
      addToCart: vi.fn(),
      selectSize: vi.fn(),
      sizeIsSelected: vi.fn()
    }
  })

  return {
    mockedFetch,
    mockedUseCartComposable
  }
})

mockNuxtImport('useAsyncData', () => mockedFetch)
mockNuxtImport('$fetch', () => vi.fn())

vi.mock('~/composables/cart', async (original) => {
  const actual = await original<typeof import('~/composables/cart')>()
  return {
    ...actual,
    useCartComposable: mockedUseCartComposable
  }
})

describe('pages/[id].vue: No Products', { tags: ['frontend'] }, () => {
  let component: Awaited<ReturnType<typeof mountSuspended>>

  beforeEach(async () => {
    component = await mountSuspended(ID)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })
  
  it('should render the ID page component', async () => {
    mockedFetch.mockReturnValueOnce({
      data: {
        data: {
          // @ts-ignore Edge case: product is undefined
          product: undefined
        }
      }
    })
    // const component = await mountSuspended(ID)

    const variantsEl = component.findComponent(ProductVariants)
    expect(variantsEl.exists()).toBeFalsy()
  })
})

describe('pages/[id].vue', { tags: ['frontend'] }, () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should render the [id] page component', async () => {
    const component = await mountSuspended(ID)
    expect(component.exists()).toBe(true)

    const titleEl = component.find('h1')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.isVisible()).toBe(true)

    const priceEl = component.find('#product-price')
    expect(priceEl.exists()).toBe(true)
    expect(priceEl.isVisible()).toBe(true)
  })
  
  it.each(
    [
      [{ id: '[id="cta-content-add-to-cart"]' }],
      [{ id: '[id="cta-content-like"]' }],
      [{ id: '[id^="cta-content-size-selection"]'}]
    ]
  )('should have button with id: $id', async ({ id }) => {
    const component = await mountSuspended(ID)
    const button = component.find(`button${id}`)

    expect(button.exists()).toBe(true)
    expect(button.isVisible()).toBe(true)
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('should have product infos and reassurance', async () => {
    const component = await mountSuspended(ID)

    const reassurance = component.find('#reassurance')
    expect(reassurance.exists()).toBe(true)
    expect(reassurance.isVisible()).toBe(true)

    const titleEl = component.find('h1')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.isVisible()).toBe(true)

    const priceEl = component.find('p#product-price')
    expect(priceEl.exists()).toBeTruthy()
  })

  it('should be able to click on the action buttons: cart, like, sizes', async () => {
    const mockedLikeButton = vi.fn()
    const mockedCartButton = vi.fn()

    mockedUseCartComposable.mockImplementation(() => {
      return {
        selectedSize: ref(null),
        showSizeWarning: ref(false),
        addToCart: mockedCartButton,
        selectSize: vi.fn(),
        sizeIsSelected: mockedLikeButton
      }
    })

    const component = await mountSuspended(ID)
    const likeButtonEl = component.find('#cta-content-like')
    const cartButtonEl = component.find('#cta-content-add-to-cart')

    await likeButtonEl.trigger('click')
    await nextTick()
    
    expect(mockedLikeButton).toHaveBeenCalled()
    
    await cartButtonEl.trigger('click')
    await nextTick()
    
    expect(mockedCartButton).toHaveBeenCalled()
  })
})
