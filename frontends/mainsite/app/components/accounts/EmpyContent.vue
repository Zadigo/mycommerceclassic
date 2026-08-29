<template>
  <div class="text-center p-10">
    <h3 class="font-bold text-3xl">
      <slot name="title" />
    </h3>

    <p class="font-light">
      <slot name="description" />
    </p>

    <slot name="cta-button">
      <u-button v-if="showButton" class="mt-5" variant="soft" size="xl" @click="$emit('btn-clicked')">
        <slot name="button-text" />
      </u-button>
    </slot>
  </div>
</template>

<script lang="ts" setup>
const { showButton = false } = defineProps<{
  showButton?: boolean
}>()

defineEmits<{
  'btn-clicked': []
}>()
</script>
