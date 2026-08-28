import 'vue-router'

export { }

type BaseRouteLabel = 'Shipment' | 'Payment' | 'Cart' | 'Home'

declare module 'vue-router' {
  interface RouteMeta {
    title?: BaseRouteLabel
  }
}
