<template>
  <div :class="[theme, 'w-full gap-4']">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { grid = 4, scrollable = false } = defineProps<{
  grid?: number,
  scrollable?: boolean
}>()

const theme = computed(() => {
  return [
    'grid',
    {
      [`grid-cols-${grid}`]: grid >= 3,
      'overflow-y-scroll h-190': scrollable,
    }
  ]
})
</script>
