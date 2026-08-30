import type { GraphQlData, RelayEdge } from './graphql'
import type { BaseProduct } from './product'

type _PartialBaseCollection = {
  category: string
  subCategory: string
  description: string
  slug: string
  illustration: Nullable<string>
}

export type BaseCollection = Partial<_PartialBaseCollection> & {
  name: string
}

export type BaseCollectionProducts = BaseCollection & { products: BaseProduct[] }

export type Collection = GraphQlData<'collection', BaseCollection>

export type AllCollections = GraphQlData<'allCollections', BaseCollection[]>

export type CollectionProducts = GraphQlData<'collection', BaseCollectionProducts>

export type SearchCollection = GraphQlData<'searchCollection', RelayEdge<BaseCollection>>

export type CollectionRecommendations = GraphQlData<'collectionRecommendations', BaseCollection & { products: BaseProduct[] }>
