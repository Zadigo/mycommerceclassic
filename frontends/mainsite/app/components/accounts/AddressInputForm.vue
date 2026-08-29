<template>
  <form class="space-y-2">
    <div class="flex gap-2">
      <u-input v-model="model.lastName" class="w-full" autocomplete="family-name" placeholder="Nom" />
      <u-input v-model="model.firstName" class="w-full" autocomplete="given-name" placeholder="Prénom" />
    </div>

    <u-input v-model="model.address"  class="w-full" autocomplete="street-address" placeholder="Adresse" />
    <base-telephone-input v-model="model.telephone" class="w-full md:w-8/12" />

    <div class="flex gap-2">
      <u-input v-model="model.postalCode" class="w-full" autocomplete="postal-code" placeholder="Code postal" />
      <u-input-menu v-model="model.province" class="w-full" autocomplete="address-level1" placeholder="Province" />
      <u-input-menu v-model="model.city" class="w-full" autocomplete="address-level2" placeholder="Ville" />
    </div>

    <u-input-menu v-model="model.country" class="w-full" autocomplete="country-name" placeholder="Pays" />

    <u-checkbox v-model="model.isBusiness" label="Entreprise" />
    <div v-if="model.isBusiness" class="p-10 space-y-2 bg-slate-50 rounded-xl">
      <u-input v-model="model.businessName" class="w-full" autocomplete="organization" placeholder="Nom de l'entreprise" />
      <u-input v-model="model.vatNumber" class="w-full" autocomplete="vat" placeholder="Numéro de TVA" />
      <u-input v-model="model.siretNumber" class="w-full" autocomplete="siret" placeholder="SIRET" />
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: AddressFormData
}>()

const emit = defineEmits<{
  'update:modelValue': [AddressFormData]
}>()

const model = useVModel(props, 'modelValue', emit)
</script>
