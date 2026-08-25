export const useLikeComposable = createGlobalState(() => {
  const products = ref<BaseProduct[]>([])

  function add(product: BaseProduct | undefined) {
    if (!product) return
    const index = products.value.findIndex((p) => p.id === product.id)
    if (index === -1) {
      products.value.push(product)
    } else {
      products.value = products.value.filter((p) => p.id !== product.id)
    }
  }

  function getIcon(product: BaseProduct | undefined) {
    if (!product) return 'i-lucide-heart'
    const index = products.value.findIndex((p) => p.id === product.id)
    return index === -1 ? 'i-lucide-heart' : 'i-lucide-heart-plus'
  }

  return {
    products,
    add,
    getIcon
  }
})

export function useImageSuperZoom() {
  const selectedImage = ref<string | undefined>(undefined)
  const isOpen = computed(() => isDefined(selectedImage))
  
  function select(image: string) {
    selectedImage.value = image
  }

  function deselect() {
    selectedImage.value = undefined
  }

  return {
    isOpen,
    selectedImage,
    select,
    deselect
  }
}
