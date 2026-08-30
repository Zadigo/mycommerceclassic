import type { SimpleResponseBody } from '#shared/types/responses'

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
    // email: '',
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

  async function updateBillingAddress() {
    await $fetch(`/api/accounts/${1}/billing`, {
      method: 'PATCH',
      body: toValue(billingAddress)
    })
  }

  async function deleteAccount() {
    const data = await $fetch<SimpleResponseBody>(`/api/accounts/${1}/delete-account`, {
      method: 'DELETE',
    })

    if (data.status) {
      // Log the user and redirect to the homepage or login page
      const router = useRouter()
      useTimeout(1000, {
        callback: () => router.push('/')
      })
    }
  }

  return {
    isWoman,
    profile,
    billingAddress,
    deleteAccount,
    updateProfile,
    setGender,
    updateBillingAddress
  }
})

export { useUserProfileProvider }

/**
 * Composable for managing user profile state.
 */
export function useUserProfileStore() {
  const store = _useUserProfileStore()
  if (!store) {
    throw new Error('useUserProfileStore() is called without provider.')
  }
  return store
}

export function useUserBillingComposable() {
}

/**
 * Composable for handling sensitive data like passwords and emails.
 * Provides reactive state and methods for updating passwords and emails.
 */
export function useSensitiveDataComposable() {
  const currentPassword = ref<string>('')

  const newPasswords = ref<UpdatePasswordFormData>({
    newPassword: '',
    confirmNewPassword: '',
  })

  const newEmail = ref<UpdateEmailFormData>({
    newEmail: '',
    confirmNewEmail: '',
  })

  function reset() {
    currentPassword.value = ''
    newPasswords.value.newPassword = ''
    newPasswords.value.confirmNewPassword = ''
    newEmail.value.newEmail = ''
    newEmail.value.confirmNewEmail = ''
  }

  async function save(using: MaybeRefOrGetter<'password' | 'email' | null>) {
    const _using = toValue(using)

    if (_using === 'password') {
      await $fetch(`/api/accounts/${1}/passwords`, {
        method: 'PATCH',
        body: {
          currentPassword: toValue(currentPassword),
          data: toValue(newPasswords)
        }
      })
    } else if (_using === 'email') {
      await $fetch(`/api/accounts/${1}/emails`, {
        method: 'PATCH',
        body: {
          currentPassword: toValue(currentPassword),
          data: toValue(newEmail)
        }
      })
    } else {
      throw new Error('Invalid save type')
    }
  }
  
  async function saveEmails() {
    await save('email')
  }

  async function savePasswords() {
    await save('password')
  }

  return {
    currentPassword,
    newPasswords,
    newEmail,
    reset,
    save,
    saveEmails,
    savePasswords,
  }
}

export function useUserOrdersComposable() {}

/**
 * Composable for managing user addresses.
 */
export function useUserAddressesComposable(currentAddresses: Ref<GenderAddressFormData[] | undefined>) {
  const _currentAddresses = computed(() => toValue(currentAddresses) || [])
  const hasAddresses = computed(() => toValue(_currentAddresses).length > 0)

  function create() {
    if (!currentAddresses.value) return
    currentAddresses.value.push({
      firstName: '',
      lastName: '',
      // email: '',
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
    if (!currentAddresses.value) return
    currentAddresses.value.splice(index, 1)
  }

  return {
    hasAddresses,
    create,
    remove,
  }
}
