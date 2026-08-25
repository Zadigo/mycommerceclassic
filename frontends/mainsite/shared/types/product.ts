import type { GraphQlData, RelayEdge, RelayNode } from "./graphql"

export type BaseProduct = {
  id: string
  reference: string
  name: string
  price: number
  salePrice: number | null
  unitPrice: number | null
  mainImage: string | null
}

export type ProductNode = RelayNode<BaseProduct>

export type AllProducts = GraphQlData<'allProducts', RelayEdge<BaseProduct>>

export type Product = GraphQlData<'product', BaseProduct>

export type SearchProducts = GraphQlData<'searchProducts', RelayEdge<BaseProduct>>

export type ProductsByCategory = GraphQlData<'productsByCategory', RelayEdge<BaseProduct>>
