export function useGlobalModalsComposable() {
  const openLoginModal = useState<boolean>('openLoginModal')
  const toggleLoginModal = useToggle(openLoginModal)

  return {
    openLoginModal,
    toggleLoginModal
  }
}
