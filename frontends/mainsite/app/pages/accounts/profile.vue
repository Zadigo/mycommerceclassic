<template>
  <section id="profile" class="space-y-2">
    <u-card>
      <template #title>
        <h3 class="font-bold">
          Données personnelles
        </h3>
      </template>
      
      <!-- Data -->
      <form class="space-y-2" @submit.prevent>
        <div class="flex gap-2">
          <u-input class="w-full" placeholder="Nom" v-model="newProfileData.lastName" />
          <u-input class="w-full" placeholder="Prénom" v-model="newProfileData.firstName" />
        </div>
        
        <base-telephone-input v-model="newProfileData.telephone" />

        <u-form-field class="mt-5" label="Date de naissance">
          <u-input-date class="w-full" v-model="newProfileData.birthDate" />
        </u-form-field>

        <div class="flex gap-2 mt-5">
          <u-button variant="soft" color="info">
            Femme
          </u-button>

          <u-button variant="soft" color="info">
            Homme
          </u-button>
        </div>
      </form>

      <template #footer>
        <u-button variant="soft" color="info" class="ml-auto">
          Enregistrer les modifications
        </u-button>
      </template>
    </u-card>

    <u-card>
      <template #title>
        <h3 class="font-bold">
          Compte et mot de passe
        </h3>
      </template>

      <div class="space-y-2">
        <div class="flex gap-2">
          <u-button variant="soft" color="info" @click="openInputs('email')">
            pendenquejohn@gmail.com
            <icon name="i-lucide-pen" />
          </u-button>
  
          <u-button variant="soft" color="info" @click="openInputs('password')">
            Modifier le mot de passe
            <icon name="i-lucide-pen" />
          </u-button>
        </div>

        <motion :preset="VueUseMotions.Fade">
          <div v-if="showUpdateInputs" class="bg-slate-50 rounded-xl p-10">
            <u-button class="ml-auto mb-5" variant="soft" @click="() => { toggleShowUpdateInputs(false) }">
              <icon name="i-lucide-x" />
            </u-button>
            
            <div class="space-y-2">
              <u-input type="password" icon="i-lucide-lock" autocomplete="current-password" placeholder="Mot de passe actuel" class="w-full"  />
  
              <div v-if="inputsToShow === 'email'" class="space-y-2">
                <u-input type="email" autocomplete="email" placeholder="Nouvel email" class="w-full"  />
                <u-input type="email" autocomplete="email" placeholder="Confirmer le nouvel email" class="w-full"  />
              </div>
  
              <div v-else-if="inputsToShow === 'password'" class="space-y-2">
                <u-input type="password" autocomplete="new-password" placeholder="Nouveau mot de passe" class="w-full" />
                <u-input type="password" autocomplete="new-password" placeholder="Confirmer le nouveau mot de passe" class="w-full" />
              </div>
            </div>
          </div>
        </motion>
      </div>
    </u-card>

    <u-card>
      <template #title>
        <h3 class="font-bold">
          Facturation et livraison
        </h3>
      </template>

      <form class="space-y-2">
        <div class="flex gap-2">
          <u-input class="w-full" autocomplete="family-name" placeholder="Nom" />
          <u-input class="w-full" autocomplete="given-name" placeholder="Prénom" />
        </div>

        <u-input class="w-full" autocomplete="street-address" placeholder="Adresse" />
        <base-telephone-input v-model="newProfileData.telephone" class="w-8/12" />

        <div class="flex gap-2">
          <u-input class="w-full" autocomplete="postal-code" placeholder="Code postal" />
          <u-input-menu class="w-full" autocomplete="address-level1" placeholder="Province" />
          <u-input-menu class="w-full" autocomplete="address-level2" placeholder="Ville" />
        </div>
        
        <u-input-menu class="w-full" autocomplete="country-name" placeholder="Pays" />
      </form>
    </u-card>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'accounts',
  title: 'Data',
})

const newProfileData = ref({
  firstName: '',
  lastName: '',
  telephone: {
    telephone: '',
    countryCode: '+33',
  },
  birthDate: '',
  gender: '',
})

const [showUpdateInputs, toggleShowUpdateInputs] = useToggle(false)

const inputsToShow = ref<'password' | 'email' | null>(null)

const openInputs = (name: 'password' | 'email') => {
  toggleShowUpdateInputs(true)
  inputsToShow.value = name
}
</script>
