import 'vue-router'

export { }

type BaseRouteLabel = 'Shipment' | 'Payment' | 'Cart'

declare module 'vue-router' {
  interface RouteMeta {
    title?: BaseRouteLabel
  }
}
