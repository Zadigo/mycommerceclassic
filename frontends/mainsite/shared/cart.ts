import type { MaybeRefOrGetter } from "vue"
import { toBaseProduct } from "./utils"

/**
 * Name of the collection in Firestore that stores the session data.
 * This collection is used to store the session information associated with a specific user session.
 * Each document in this collection represents a session and contains relevant session data.
 * The session ID is used as a reference to associate session data with a specific user session.
 * The collection name is defined as a constant to ensure consistency across the application.
 * It is recommended to use a unique and descriptive name for the collection to avoid conflicts with other collections.
 * In this case, the collection name is set to 'test_sessions' for testing purposes.
 * In a production environment, it is advisable to use a more appropriate name that reflects the purpose of the collection.
 */
export const SESSION_COLLECTION_NAME = 'test_sessions'

/**
 * Name of the cookie used to store the session ID.
 * This cookie is used to associate the session data with a specific user session.
 * The cookie name is defined as a constant to ensure consistency across the application.
 * It is recommended to use a unique and descriptive name for the cookie to avoid conflicts with other cookies.
 * In this case, the cookie name is set to 'sessionId' for testing purposes.
 * In a production environment, it is advisable to use a more appropriate name that reflects the purpose of the cookie.
 */
export const SESSION_COOKIE_NAME = 'sessionId'

/**
 * Name of the cookie used to store the cart session ID.
 * This cookie is used to associate the cart items with a specific user session.
 * The cookie name is defined as a constant to ensure consistency across the application.
 * It is recommended to use a unique and descriptive name for the cookie to avoid conflicts with other cookies.
 * In this case, the cookie name is set to 'cart_session_id' for testing purposes.
 * In a production environment, it is advisable to use a more appropriate name that reflects the purpose of the cookie.
 * @deprecated
 */
export const CART_COOKIE_NAME = 'cart_session_id'

/**
 * Name of the collection in Firestore that stores the cart data.
 * This collection is used to store the cart items associated with a specific session.
 * Each document in this collection represents a session and contains an array of cart items.
 * The session ID is used as a reference to associate cart items with a specific user session.
 * The collection name is defined as a constant to ensure consistency across the application.
 * It is recommended to use a unique and descriptive name for the collection to avoid conflicts with other collections.
 * In this case, the collection name is set to 'test_cart' for testing purposes.
 * In a production environment, it is advisable to use a more appropriate name that reflects the purpose of the collection.
 * @deprecated
 */
export const CART_COLLECTION_NAME = 'test_cart'

/**
 * Name of the collection in Firestore that stores the likes data.
 * This collection is used to store the likes associated with a specific session.
 * Each document in this collection represents a session and contains an array of liked items.
 * The session ID is used as a reference to associate likes with a specific user session.
 * The collection name is defined as a constant to ensure consistency across the application.
 * It is recommended to use a unique and descriptive name for the collection to avoid conflicts with other collections.
 * In this case, the collection name is set to 'test_likes' for testing purposes.
 * In a production environment, it is advisable to use a more appropriate name that reflects the purpose of the collection.
 */
export const LIKE_COLLECTION_NAME = 'test_likes'

export const LIKE_COOKIE_NAME = 'likeSessionId'

/**
 * A utility function to filter cart items based on product ID and size name.
 * This function is useful for retrieving specific items from a user's cart.
 * @param items The array of cart items to filter.
 * @param productId The ID of the product to filter by.
 * @param sizeName The size object to filter by.
 */
export function filterCartItems(items: CartItem[], productId: string, sizeName: BaseSizeSet['name']): CartItem[] {
  return items.filter(item => item.product.id === productId && item.size.name === sizeName)
}

/**
 * Finds a specific cart item based on product ID and optional size name.
 * This function returns the first matching item or undefined if no match is found.
 * @param items The array of cart items to search through.
 * @param productId The ID of the product to find.
 * @param sizeName The name of the size to find. It should be one of the values from BaseSizeSet['name'].
 */
export function findCartItem(items: CartItem[], productId: string, sizeName: BaseSizeSet['name']): CartItem | undefined {
  return items.find(item => item.product.id === productId && item.size.name === sizeName)
}

/**
 * A utility function that returns a filter function for cart items based on a specific item.
 * This can be used in `map` or `filter` operations to find items that match the product ID and size name of the provided item.
 * @param itemToFind The cart item to use as a reference for filtering.
 */
export function filterCartItemsFunc(itemToFind: CartItem) {
  return (item: CartItem) => {
    return item.product.id === itemToFind.product.id && item.size.name === itemToFind.size.name
  }
}

/**
 * A helper function to extract the product ID from a product object, which can be a Product, ProductNode, or BaseProduct.
 * This function handles different structures of product objects and returns the appropriate product ID.
 * @param product - The product object from which to extract the ID. It can be a Product, ProductNode, or BaseProduct.
 * @returns The product ID as a string, or undefined if the ID cannot be determined.
 */
export function getProductId(product: MaybeRefOrGetter<Product | ProductNode | BaseProduct | undefined>) {
  const result = toBaseProduct(product)
  return result?.id
}
