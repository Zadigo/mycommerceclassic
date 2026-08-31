export type Size = {
  name: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | (string & {})
}

export type Material = {
  name: 'Coton' | 'Polyester' | 'Laine' | (string & {})
}

export type BaseProductFilter = {
  name: string
  values: Size[] | Material[]
}

export type ProductFilterskeys = 'sizes' | 'materials'

export type ProductFilters = GraphQlData<'productFilters', BaseProductFilter[]>

/**
 * @deprecated Fnd a better name
 */
export type ProductFiltersSelection = {
  sizes: Size['name'][]
  materials: Material['name'][]
}

export type ProductFiltersList = Size['name'][] | Material['name'][]
