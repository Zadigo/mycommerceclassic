<template>
  <div class="flex justify-start gap-2">
    <u-input-menu v-model="telephone.countryCode" :items="['+33']" class="w-30" />
    <u-input v-model="telephone.telephone" type="tel" autocomplete="tel" class="w-full" placeholder="Numéro de téléphone" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    telephone: string,
    countryCode: string,
  }
}>()

type Telephone = {
  telephone: string,
  countryCode: string,
}

const emit = defineEmits<{
  'update:modelValue': [Telephone]
}>()

const telephone = ref<Telephone>({
  telephone: '',
  countryCode: '+33',
})

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: true,
})
</script>
