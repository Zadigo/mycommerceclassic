import { describe, it, expect } from 'vitest'
import { useImageSuperZoom } from '~/composables/product'

describe('composables/useImageSuperZoom', { tags: ['composables'] }, () => {
  it('should initialize with no selected image and closed state', () => {
    const { isOpen, selectedImage } = useImageSuperZoom()
    expect(isOpen.value).toBe(false)
    expect(selectedImage.value).toBeUndefined()
  })

  it('should select an image and open the zoom', () => {
    const { isOpen, selectedImage, select } = useImageSuperZoom()
    select('image1.jpg')
    expect(isOpen.value).toBe(true)
    expect(selectedImage.value).toBe('image1.jpg')
  })

  it('should deselect an image and close the zoom', () => {
    const { isOpen, selectedImage, select, deselect } = useImageSuperZoom()
    select('image1.jpg')
    deselect()
    expect(isOpen.value).toBe(false)
    expect(selectedImage.value).toBeUndefined()
  })
})
