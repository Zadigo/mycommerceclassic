const [ useUserProfileProvider, _useUserProfileStore] = createInjectionState(() => {
  const profile  = ref<UpdateProfileFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Woman',
    telephone: {
      countryCode: '',
      phone: '',
    }
  })

  const billingAddress = ref<AddressFormData>({
    firstName: '',
    lastName: '',
    email: '',
    telephone: {
      countryCode: '',
      phone: '',
    },
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
    isBusiness: false,
  })

  const isWoman = computed(() => profile.value.gender === 'Woman')

  function setGender(gender: UpdateProfileFormData['gender']) {
    profile.value.gender = gender
  }

  return {
    isWoman,
    profile,
    billingAddress,
    setGender,
  }
})

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

export function useUserNewPasswordComposable() {
  const passwords = ref({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  return {
    passwords,
  }
}

export function useNewEmailComposable() {
  const newEmail = ref({
    currentPassword: '',
    newEmail: '',
    confirmNewEmail: '',
  })
  
  return {
    newEmail,
  }
}

export function useUserOrdersComposable() {}

export function useUserAddressesComposable() {}
