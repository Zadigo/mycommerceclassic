export type ShipmentOptions = 'Standard' | 'Express' | 'Chronopost' | 'Colissimo' | 'Mondial Relay' | 'UPS' | 'DHL' | 'FedEx'

export type ShipmentResponse = {
  name: ShipmentOptions
  price: number
  description: string
}
