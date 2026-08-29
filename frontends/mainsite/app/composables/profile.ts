const [ useUserProfileProvider, _useUserProfileStore] = createInjectionState(() => {})

export { useUserProfileProvider }

export function useUserProfileStore() {
  const store = _useUserProfileStore()
  if (!store) {
    throw new Error('useUserProfileStore() is called without provider.')
  }
  return store
}

export function useUserBillingComposable() {
}

export function useUserNewPasswordComposable() {}

export function useNewEmailComposable() {}

export function useUserOrdersComposable() {}

export function useUserAddressesComposable() {}
