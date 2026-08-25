import type { ProductFilters } from '#shared/types/filters'

export const PRODUCT_FILTERS_FIXTURE: ProductFilters = {
  data: {
    productFilters: [
      {
        name: 'Taille',
        values: [
          {
            name: 'S',
          },
          {
            name: 'M',
          },
          {
            name: 'L',
          }
        ]
      },
      {
        name: 'Material',
        values: [
          {
            name: 'Cotton',
          },
          {
            name: 'Polyester',
          },
          {
            name: 'Wool',
          }
        ]
      }
    ]
  }
}
