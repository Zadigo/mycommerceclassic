<template>
  <section id="delivery-addresses">
    <motion :preset="VueUseMotions.Fade">
      <u-card v-if="showNewAddressBlock">
        <accounts-empty-content :show-button="true" @btn-clicked="toggleNewAddressBlock">
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
  
      <u-card v-else>
        <template #title>
          <u-button class="ml-auto" variant="soft" color="info" @click="() => { toggleNewAddressBlock(false) }">
            <icon name="i-lucide-x" />
          </u-button>
        </template>

        <form class="space-y-2" @submit.prevent>
          <div class="flex justify-start gap-2">
            <u-button variant="soft" color="info">
              Femme
            </u-button>

            <u-button variant="soft" color="info">
              Homme
            </u-button>
          </div>

          <div class="flex gap-2">
            <u-input class="w-full" autocomplete="family-name" placeholder="Nom" />
            <u-input class="w-full" autocomplete="given-name" placeholder="Prénom" />
          </div>
  
          <u-input class="w-full" autocomplete="street-address" placeholder="Adresse" />
          <!-- <base-telephone-input v-model="newProfileData.telephone" class="w-8/12" /> -->
  
          <div class="flex gap-2">
            <u-input class="w-full" autocomplete="postal-code" placeholder="Code postal" />
            <u-input-menu class="w-full" autocomplete="address-level1" placeholder="Province" />
            <u-input-menu class="w-full" autocomplete="address-level2" placeholder="Ville" />
          </div>
        </form>
      </u-card>
    </motion>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'accounts',
  title: 'Delivery Addresses',
})

const [showNewAddressBlock, toggleNewAddressBlock] = useToggle(true)

/**
 * Composables
 */

useUserAddressesComposable()

</script>

