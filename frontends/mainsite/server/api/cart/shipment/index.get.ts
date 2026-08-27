import type { ShipmentResponse } from '#shared/types/shipment'

/**
 * Use this endpoint to return the shipment options available for the current cart.
 */
export default defineCachedEventHandler(async () => {
  const response: ShipmentResponse[] = [
    {
      name: 'Standard',
      price: 5,
      description: 'standard: 3-5 jours ouvrés'
    },
    {
      name: 'Express',
      price: 10,
      description: 'livraison: 1-2 jours ouvrés'
    }
  ]

  return response
}, {
  getKey: () => {
    return 'shipment-options'
  }
})
