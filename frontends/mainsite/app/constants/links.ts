export type BaseLink = {
  name: string
  to: string
  icon?: string
}

export const ACCOUNT_LINKS: BaseLink[] = [
  {
    name: 'Mon profil',
    to: '/accounts',
    icon: 'i-lucide:user',
  },
  {
    name: 'Mes achats',
    to: '/accounts/orders',
    icon: 'i-lucide:shopping-cart',
  },
  {
    name: 'Mes retours',
    to: '/accounts/refunds',
    icon: 'i-lucide:corner-up-left',
  },
  {
    name: 'Mes addresses',
    to: '/accounts/delivery-addresses',
    icon: 'i-lucide:map-pin',
  },
  {
    name: 'Mes données',
    to: '/accounts/profile',
    icon: 'i-lucide:shield-check',
  }
]
