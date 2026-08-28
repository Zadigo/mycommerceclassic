import { doc } from "firebase/firestore"
import { useDocument, useFirestore } from "vuefire"
import { SESSION_COOKIE_NAME, SESSION_COLLECTION_NAME, getProductId } from '#shared/cart'

export function useCartItemsComposable() {
  const store = useFirestore()
  const cookieId = useCookie(SESSION_COOKIE_NAME)

  const activeDocumentId = ref<string | null | undefined>(undefined)

  if (import.meta.client) {
    const cookie = useCookie(SESSION_COOKIE_NAME)
    syncRef(activeDocumentId, cookie, { direction: 'rtl' })
  }

  const docRef = computed(() => {
    if (!isDefined(cookieId)) return undefined
    return doc(store, SESSION_COLLECTION_NAME, toValue(cookieId))
  })

  const firebaseCartDoc = useDocument<SessionData>(docRef)
  const items = computed(() => firebaseCartDoc.value?.cart.items || [])

  return {
    docRef,
    items
  }
}

/**
 * A composable that provides a set of functions and reactive state for managing a shopping cart.
 * It allows adding products to the cart, changing quantities, removing items, and selecting sizes.
 * The composable maintains the state of the last product added to the cart and whether a size warning should be shown.
 * 
 * @template P - The type of the product, which extends BaseProduct or can be undefined.
 * @template T - A reactive reference or getter for the product type P.
 * @template S - A reactive reference or getter for the size type BaseSizeSet or null.
 */
export const useCartComposable = createGlobalState(<P extends Product | undefined, T extends MaybeRefOrGetter<P>, S extends MaybeRefOrGetter<BaseSizeSet | null>>() => {
  const toast = useToast()

  const selectedSize = ref<BaseSizeSet | null>(null)
  const showSizeWarning = refAutoReset(false, 3000)

  const lastProduct = ref<Product | undefined>(undefined)

  async function addToCart(product: T, size?: S, callback?: (product: Product) => void) {

    const _product = toValue(product)
    const _size = toValue(size) || toValue(selectedSize)

    if (!_product) {
      console.error('Product is undefined')
      return
    }

    if (!_size) {
      showSizeWarning.value = true
      return
    }

    const cartItem = createCartItem(_product, _size)

    await $fetch('/api/cart/add', {
      method: 'PATCH',
      body: cartItem,
      credentials: 'include', // Ensure cookies are sent with the request
      onRequestError({ error }) {
        toast.add({
          title: 'Error adding to cart',
          description: error.message || 'An error occurred while adding the product to the cart.',
          duration: 5000,
          color: 'error',
        })
      }
    })

    lastProduct.value = _product
    selectedSize.value = null

    callback?.(_product)
  }

  async function changeQuantity(product: T, size: S | undefined, direction: 'increase' | 'decrease') {
    const productId = getProductId(product)

    if (productId) {
      return await $fetch('/api/cart/quantity', {
        method: 'PATCH',
        body: {
          direction: direction,
          size: toValue(size),
          cartItem: createCartItem(product, size)
        }
      })
    } else {
      return Promise.reject(new Error('Product is undefined'))
    }
  }
    
  async function reduceQuantity(product: T, size: S | undefined) {
    return await changeQuantity(product, size, 'decrease')
  }

  async function increaseQuantity(product: T, size: S | undefined) {
    return await changeQuantity(product, size, 'increase')
  }

  async function remove(product: T, size: S | undefined) {
    const productId = getProductId(product)

    await $fetch('/api/cart/remove', {
      method: 'DELETE',
      body: {
        id: productId,
        size: toValue(size)
      }
    })
  }

  function selectSize(size: BaseSizeSet) {
    selectedSize.value = size
  }

  function sizeIsSelected(size: BaseSizeSet): boolean {
    return selectedSize.value?.name === size.name
  }

  return {
    /**
     * The last product that was added to the cart. This can be used to 
     * show a confirmation message or perform other actions after 
     * adding a product.
     * @default null
     */
    lastProduct,
    showSizeWarning,
    selectedSize,
    addToCart,
    remove,
    selectSize,
    sizeIsSelected,
    reduceQuantity,
    increaseQuantity
  }
})

/**
 * A composable that provides a notification mechanism for when a product is added to the cart.
 * @param product - A reactive reference to the product that was added to the cart.
 * @param timeout - The duration (in milliseconds) for which the notification should be displayed. Default is 3000ms.
 */
export function useLastProductComposable(product: Ref<BaseProduct | Product | ProductNode | undefined>, timeout: number = 5000) {
  const modalState = refAutoReset(false, timeout)
  const toggleNotification = useToggle(modalState)

  watch(product, (newProduct) => {
    if (newProduct) {
      toggleNotification(true)
    }
  })

  return {
    modalState,
    toggleNotification
  }
}
