<template>
  <section id="delivery-addresses">
    <u-card v-if="!hasAddresses">
      <accounts-empty-content :show-button="true" @btn-clicked="create">
         <template #title>
           Tu n'as encore aucune adresse de livraison
         </template>
 
         <template #description>
           Si tu ne trouves pas ton adresse, tu as peut-être passé commande sans être inscrit(e).
         </template>
 
         <template #button-text>
           Ajouter une adresse
         </template>
       </accounts-empty-content>
    </u-card>
    
    <div v-else class="space-y-5">
      <u-button icon="i-lucide-plus" variant="soft" color="info" @click="create">
        Ajouter une adresse
      </u-button>

      <u-card v-for="(address, idx) in currentAddresses" :key="idx" class="not-first:mt-5">
        <template #title>
          <u-button icon="i-lucide-trash-2" class="ml-auto" variant="soft" color="error" @click="remove(idx)" />
        </template>

        <form class="space-y-2" @submit.prevent>
          <div class="flex justify-start gap-2">
            <u-button :variant="address.gender === 'Woman' ? 'soft' : 'outline'" color="info" @click="address.gender = 'Woman'">
              Femme
            </u-button>

            <u-button :variant="address.gender === 'Man' ? 'soft' : 'outline'" color="info" @click="address.gender = 'Man'">
              Homme
            </u-button>
          </div>

          <div class="flex gap-2">
            <u-input v-model="address.firstName" class="w-full" autocomplete="family-name" placeholder="Nom" />
            <u-input v-model="address.lastName" class="w-full" autocomplete="given-name" placeholder="Prénom" />
          </div>
  
          <u-input v-model="address.address" class="w-full" autocomplete="street-address" placeholder="Adresse" />
          <base-telephone-input v-model="address.telephone" class="w-8/12" />
  
          <div class="flex gap-2">
            <u-input v-model="address.postalCode" class="w-full" autocomplete="postal-code" placeholder="Code postal" />
            <u-input-menu v-model="address.province" class="w-full" autocomplete="address-level1" placeholder="Province" />
            <u-input-menu v-model="address.city" class="w-full" autocomplete="address-level2" placeholder="Ville" />
          </div>
        </form>
      </u-card>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'accounts',
  title: 'Delivery Addresses',
})

/**
 * Composables
 */

const { currentAddresses, hasAddresses, create, remove } = useUserAddressesComposable()
</script>

