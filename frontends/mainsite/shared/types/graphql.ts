/**
 * Type for GraphQL pagination info using Relay-style pagination
 */
export interface GraphQlPaginationInfo {
  pageInfo: Partial<{
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  }>
}

/**
 * Type for Relay Node structure
 * @example
 * ```ts
 * const relayNode: RelayNode<Video> = { node: Video }
 * ```
 */
export type RelayNode<N> = {
  node: N
}

/**
 * Type for Relay Edge structure which gets included
 * when the items are paginated using Relay-style pagination
 * @example
 * ```ts
 * const relayEdge: RelayEdge<Video> = {
 *   edges: [{ node: Video }],
 *   pageInfo: { hasNextPage: true }
 * }
 * ```
 */
export type RelayEdge<E> = { edges: Array<RelayNode<E>> } & Partial<GraphQlPaginationInfo>

/**
 * General type for GraphQL data response, which can be used for 
 * single data, array of data, or Relay-style paginated data.
 * @example
 * ```ts
 * // With relay nodes
 * const response = $fetch<GraphQlData<'allvideos', RelayEdge<Video>>>(...)
 * 
 * // With single data
 * const response = $fetch<GraphQlData<'videoDetails', VideoDetails>>(...)
 * 
 * // With array of data
 * const response = $fetch<GraphQlData<'searchvideos', Video[]>>(...)
 * ```
 */
export interface GraphQlData<K extends string, R> {
  data: {
    [key in K]: R
  }
}
