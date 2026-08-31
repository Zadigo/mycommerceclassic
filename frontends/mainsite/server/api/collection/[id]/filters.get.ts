import type { ProductFilters } from '~~/shared/types/filters'

/**
 * Returns a list of product filters for a given collection. This only returns
 * the active filters (aka those based on the actual products in the collection) as
 * opposed to the full list of filters.
 */
export default defineEventHandler(async (_event) => {
  return {
    data: {
      productFilters: [
        {
          name: 'Size',
          values: [
            {
              name: 'XL'
            },
            {
              name: 'M'
            },
            {
              name: 'XXL'
            }
          ]
        },
        {
          name: 'Material',
          values: [
            {
              name: 'Coton'
            },
            {
              name: 'Polyester'
            },
            {
              name: 'Laine'
            }
          ]
        }
      ]
    }
  } as ProductFilters
})
