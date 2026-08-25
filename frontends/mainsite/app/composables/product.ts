import { collection } from 'firebase/firestore'
import { LIKE_COLLECTION_NAME } from '#shared/cart'
import type { LikeSessionData } from '#shared/types/likes'
import { useFirestore, useCollection } from 'vuefire'

export const useLikeComposable = createGlobalState(() => {
  const { sessionId } = useSessionComposable()
  
  const firestore = useFirestore()
  const collectionRef = useCollection<LikeSessionData>(collection(firestore, LIKE_COLLECTION_NAME))
  const docData = computed(() => {
    if (!isDefined(sessionId)) return undefined
    return collectionRef.data.value.find((item) => item.sessionId === sessionId.value)
  })
  
  async function add(product: BaseProduct | undefined) {
    await $fetch('/api/likes/toggle', { method: 'PATCH', body: { productId: product?.id } })
  }

  const products = computed(() => docData.value?.items || [])

  function getIcon(product: BaseProduct | undefined) {
    if (!product) return 'i-lucide-heart'
    const index = products.value.findIndex((strId) => strId === product.id)
    return index === -1 ? 'i-lucide-heart' : 'i-lucide-heart-plus'
  }

  return {
    docData,
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
