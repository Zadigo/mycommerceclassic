import { toBaseProduct } from './utils'

/**
 * Filters products based on a search query.
 * @param query 
 */
export function filterFunc(query: string | undefined) {
  return (product: BaseProduct | ProductNode | Product) => {
    const item = toBaseProduct(product)
    
    if (!item) return false
    if (!query) return true

    return (
        item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        item.color.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        item.category.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        item.id === query
    )
  }
}
