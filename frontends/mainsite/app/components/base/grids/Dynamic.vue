<template>
  <div :class="[theme, 'w-full gap-1']">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const { 
  grid = 4, 
  scrollable = false, 
  containerHeight = 'h-190'
} = defineProps<{
  grid?: number,
  scrollable?: boolean,
  containerHeight?: string
}>()

/**
 * Breakpoints
 */

const breakpoint = useBreakpoints(breakpointsTailwind)
const isMobile = computed(() => breakpoint.smaller('md'))

const _scrollable = computed(() => isMobile.value && scrollable)

const theme = computed(() => {
  return [
    'grid', 
    {
      'grid-cols-1': grid === 1,
      'grid-cols-2': grid === 2,
      'grid-cols-3': grid === 3,
      'grid-cols-4': grid === 4,
      'grid-cols-5': grid === 5,
      [`overflow-y-scroll ${containerHeight}`]: _scrollable.value
    }
  ]
})
</script>
