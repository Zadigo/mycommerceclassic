export function useGenderComposable(currentGender: Ref<UpdateProfileFormData['gender']>) {
  const isWoman = computed(() => currentGender.value === 'Woman')

  function setGender(gender: UpdateProfileFormData['gender']) {
    currentGender.value = gender
  }

  return {
    isWoman,
    setGender,
  }
}

const [useUserProfileProvider, _useUserProfileStore] = createInjectionState(() => {
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

  async function updateProfile() {
    await $fetch(`/api/accounts/${1}`, {
      method: 'PATCH',
      body: toValue(profile)
    })
  }

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
    updateProfile,
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

export function useUserAddressesComposable() {
  const currentAddresses = ref<GenderAddressFormData[]>([])
  const hasAddresses = computed(() => currentAddresses.value.length > 0)

  function create() {
    currentAddresses.value.push({
      firstName: '',
      lastName: '',
      email: '',
      gender: 'Woman',
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
  }
  
  function remove(index: number) {
    currentAddresses.value.splice(index, 1)
  }

  return {
    currentAddresses,
    hasAddresses,
    create,
    remove,
  }
}
