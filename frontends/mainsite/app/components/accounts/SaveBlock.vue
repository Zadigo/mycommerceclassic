<template>
  <u-card>
    <template #title>
      <h3 class="font-bold">
        {{ title }}
      </h3>
    </template>

    <slot />

    <template #footer>
      <u-button variant="soft" color="info" class="ml-auto" @click="emit('btn-clicked')">
        Enregistrer les modifications
      </u-button>
    </template>
  </u-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

const emit = defineEmits<{
  'btn-clicked': []
}>()
</script>
