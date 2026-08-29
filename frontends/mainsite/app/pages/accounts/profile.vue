<template>
  <section id="profile" class="space-y-2">
    {{ data }}
    <accounts-save-block title="Données personnelles" @btn-clicked="updateProfile">
      <form class="space-y-2" @submit.prevent>
        <div class="flex gap-2">
          <u-input class="w-full" placeholder="Nom" v-model="profile.lastName" />
          <u-input class="w-full" placeholder="Prénom" v-model="profile.firstName" />
        </div>

        <base-telephone-input v-model="profile.telephone" />

        <u-form-field class="mt-5" label="Date de naissance">
          <u-input-date class="w-full" v-model="profile.dateOfBirth" />
        </u-form-field>

        <div class="flex gap-2 mt-5">
          <u-button :variant="isWoman ? 'soft' : 'outline'" color="info" @click="setGender('Woman')">
            Femme
          </u-button>

          <u-button :variant="!isWoman ? 'soft' : 'outline'" color="info" @click="setGender('Man')">
            Homme
          </u-button>
        </div>
      </form>
    </accounts-save-block>

    <u-card>
      <template #title>
        <h3 class="font-bold">
          Compte et mot de passe
        </h3>
      </template>

      <div class="space-y-2">
        <div class="flex flex-col gap-y-2 md:flex-row md:gap-2">
          <u-button variant="soft" color="info" @click="openInputs('email')">
            pendenquejohn@gmail.com
            <icon name="i-lucide-pen" />
          </u-button>
  
          <u-button variant="soft" color="info" @click="openInputs('password')">
            Modifier le mot de passe
            <icon name="i-lucide-pen" />
          </u-button>
        </div>

        <div v-if="showUpdateInputs" class="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 md:p-10">
          <u-button class="ml-auto mb-5" variant="soft" @click="() => { toggleShowUpdateInputs(false) }">
            <icon name="i-lucide-x" />
          </u-button>
          
          <form class="space-y-2" @submit.prevent>
            <u-input v-model="newPasswords.currentPassword" type="password" icon="i-lucide-lock" autocomplete="current-password" placeholder="Mot de passe actuel" class="w-full"  />

            <div v-if="inputsToShow === 'email'" class="space-y-2">
              <u-input v-model="newEmail.newEmail" type="email" autocomplete="email" placeholder="Nouvel email" class="w-full"  />
              <u-input v-model="newEmail.confirmNewEmail" type="email" autocomplete="email" placeholder="Confirmer le nouvel email" class="w-full"  />
            </div>

            <div v-else-if="inputsToShow === 'password'" class="space-y-2">
              <u-input v-model="newPasswords.newPassword" type="password" autocomplete="new-password" placeholder="Nouveau mot de passe" class="w-full" />
              <u-input v-model="newPasswords.confirmNewPassword" type="password" autocomplete="new-password" placeholder="Confirmer le nouveau mot de passe" class="w-full" />
            </div>

            <u-button icon="i-lucide-save" type="submit" variant="soft" color="info" @click="save(inputsToShow)">
              Enregistrer
            </u-button>
          </form>
        </div>
      </div>
    </u-card>

    <accounts-save-block title="Facturation">
      <form class="space-y-2">
        <lazy-accounts-address-input-form v-model="billingAddress" :hydrate-after="800" />
      </form>
    </accounts-save-block>

    <u-card>
      <u-button variant="soft" color="error">
        <icon name="i-lucide-trash-2" />
        Supprimer le compte
      </u-button>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'accounts',
  title: 'Data',
})

const [showUpdateInputs, toggleShowUpdateInputs] = useToggle(false)

const inputsToShow = ref<'password' | 'email' | null>(null)

const openInputs = (name: 'password' | 'email') => {
  toggleShowUpdateInputs(true)
  inputsToShow.value = name
}

/**
 * Autocomplete
 */

const { data } = useNuxtData('autocomplete')

/**
 * Composables
 */

const { profile, billingAddress, isWoman, setGender, updateProfile } = useUserProfileProvider()

const { newPasswords, newEmail, save} = useSensitiveDataComposable()
</script>
