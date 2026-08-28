<template>
  <div v-if="isOpen" class="w-full h-full absolute top-0 left-0 overflow-scroll z-50">
    <div class="relative">
      <u-button :id="createElementId('cta', 'super-zoom', 'close')" variant="solid" color="neutral" icon="i-lucide-x" class="fixed top-5 right-5 z-50" @click="$emit('close')" />
      <nuxt-img ref="imageEl" src="/img2.webp" alt="Some alt" class="w-full cursor-grab" />

      <div class="flex gap-2 fixed bottom-0 left-1/2 -translate-x-1/2 p-5">
        <nuxt-img src="/img2.webp" alt="Some alt" class="w-20 cursor-pointer" width="100" />
        <nuxt-img src="/img2.webp" alt="Some alt" class="w-20 cursor-pointer" width="100" />
        <nuxt-img src="/img2.webp" alt="Some alt" class="w-20 cursor-pointer" width="100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  'open': boolean
}>()
  
const emit = defineEmits<{
  'close': [],
  'update:modelValue': [boolean]
}>()

const isOpen = useVModel(props, 'open', emit, {
  defaultValue: false
})

if (import.meta.client) {
  const body = document.querySelector('body') as HTMLBodyElement
  const lockScroll = useScrollLock(body)
  
  watch(isOpen, (newValue) => {
    if (newValue) {
      lockScroll.value = true
    } else {
      lockScroll.value = false
    }
  })
}

const imageEl = useTemplateRef<HTMLImageElement>('imageEl')
const { pressed } = useMousePressed({ touch: false, target: imageEl })
</script>
