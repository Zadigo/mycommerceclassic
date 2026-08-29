<template>
  <u-modal v-model:open="isOpen">
    <template #body>
      <p class="font-bold text-2xl mb-5">
        Trouve ta commande
      </p>
  
      <p class="font-light mb-10">
        Saisis l'adresse e-mail et le numéro de téléphone que tu as utilisés pour passer ta commande. Nous t'enverrons un SMS avec le code d'accès à tes commandes.
      </p>
  
      <form @submit.prevent>
        <u-input type="email" class="w-full" placeholder="Adresse e-mail" />
        
        <div class="flex justify-start gap-2 my-3">
          <u-input-menu :items="['+33']" class="w-30" />
          <u-input type="tel" autocomplete="tel" class="w-full" placeholder="Numéro de téléphone" />
        </div>
  
        <u-button type="submit" variant="soft" size="xl" class="mt-5" block>
          Trouver ma commande
        </u-button>
      </form>
    </template>
  </u-modal>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()

const isOpen = useVModel(props, 'open', emit, {
  defaultValue: false,
})
</script>
