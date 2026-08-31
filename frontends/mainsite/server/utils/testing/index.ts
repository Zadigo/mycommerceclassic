import { faker } from '@faker-js/faker'
import { computed, ref, toValue } from 'vue'
import jsonFixtures from '../../../public/products.json'
import { filterFunc } from '#shared/products'
import type { H3Event } from 'h3'
import { getRouterParam } from 'h3'
 
/**
 * Utility functions for loading and manipulating product fixtures for testing purposes.
 */
export function useLoadFixtures() {
  const fixtures = computed(() => jsonFixtures)

  function getProduct(event: H3Event) {
    const id = getRouterParam(event, 'id')
    
    if (!id) return undefined
    return fixtures.value.find((product) => product.id.toString() === id)
  }

  function raw() {
    return toValue(fixtures)
  }

  function singleProduct() {
    return raw().at(0) as BaseProduct
  }
  
  function search(event: H3Event, qeryParam: string = 'q') {
    return fixtures.value.filter(filterFunc(getRouterParam(event, qeryParam)))
  }

  function toNodes(values: BaseProduct[]): ProductNode[] {
    return values.map((product) => ({
      node: product
    }))
  }

  function toPaginated(values: BaseProduct[]) {
    return {
      edges: toNodes(values),
    }
  }

  return {
    /**
     * Returns the computed array of product fixtures loaded from the JSON file. 
     * This can be used to access the entire set of products for testing or 
     * demonstration purposes.
     */
    fixtures,
    /**
     * Retrieves a specific product from the loaded 
     * fixtures based on the 'id' parameter in the event.
     */
    getProduct,
    /**
     * Returns the first product from the loaded fixtures, 
     * which can be useful for testing or demonstration purposes.
     */
    singleProduct,
    /**
     * Returns the raw array of loaded fixtures without any filtering or transformation.
     */
    raw,
    /**
     * Filters the loaded fixtures based on a search query extracted from the event's parameters.
     * @param event - The H3Event from which to extract the search query.
     */
    search,
    /**
     * Converts an array of products into a structure that mimics the Relay pagination format.
     */
    toNodes,
    /**
     * Simulates the graphene pagination structure by 
     * converting an array of products into a paginated format which
     * relies on Relay specifications.
     */
    toPaginated
  }
}

/**
 * Utility function for loading a collection fixture for testing purposes.
 */
export function useLoadCollectionFixture() {
  /**
   * Returns a reactive reference to a collection fixture, 
   * which includes a randomly generated name and the loaded
   *  product fixtures.
   */
  const result = ref<CollectionProducts>({
    data: {
      collection: {
        name: faker.word.words({ count: { min: 2, max: 5 } }),
        products: toValue(useLoadFixtures().fixtures)
      }
    }
  })

  return result
}
