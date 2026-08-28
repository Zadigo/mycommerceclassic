<template>
  <div :class="[theme, 'w-full gap-1']">
    <slot :theme="{ themeMaxColSpan }" />
  </div>
</template>

<script setup lang="ts">
const { grid = 4, scrollable = false, containerHeight = 'h-190' } = defineProps<{
  grid?: number,
  scrollable?: boolean
  containerHeight?: string
}>()

const theme = computed(() => {
  return [
    'grid',
    {
      [`grid-cols-${grid}`]: grid >= 3,
      'overflow-y-scroll': scrollable,
      [containerHeight]: scrollable,
    }
  ]
})

const themeMaxColSpan = computed(() => {
  return `col-span-${grid}`
})
</script>
