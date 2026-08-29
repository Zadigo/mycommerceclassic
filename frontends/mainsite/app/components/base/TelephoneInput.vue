<template>
  <div class="flex justify-start gap-2">
    <u-input-menu v-model="model.countryCode" :items="['+33']" class="w-30" />
    <u-input v-model="model.phone" type="tel" autocomplete="tel" class="w-full" placeholder="Numéro de téléphone" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: AddressFormData['telephone']
}>()

const emit = defineEmits<{
  'update:modelValue': [AddressFormData['telephone']]
}>()

const model = useVModel(props, 'modelValue', emit, {
  passive: true,
})
</script>
