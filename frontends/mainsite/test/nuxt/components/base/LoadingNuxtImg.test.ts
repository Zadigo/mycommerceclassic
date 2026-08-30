import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LoadingNuxtImg from '~/components/base/LoadingNuxtImg.vue'
import { useLoadFixtures } from '~~/server/utils/testing'
import { USkeleton } from '#components'

describe('components/base/LoadingNuxtImg.vue', { tags: ['frontend'] }, () => {
  const { singleProduct } = useLoadFixtures()

  it.each(
    [
      [{ testCase: 'image is undefined', image: undefined }],
      [{ testCase: 'image is null', image: null }],
      [{ testCase: 'image is defined', image: singleProduct().mainImage } ],
      [{ testCase: 'empty string', image: { ...singleProduct().mainImage, original: '' } }],
    ]
  )('should mount the component with $testCase', async ({ image }) => {
    const component = await mountSuspended(LoadingNuxtImg, {
      props: {
        // @ts-ignore unit testing
        image
       }
    })
    expect(component.exists()).toBe(true)
    
    if (!image || !image.original) {
      expect(component.findComponent(USkeleton).exists()).toBe(true)
    }
    
    if (image && image.original) {
      const imgEl = component.find('img')
      expect(imgEl.exists()).toBe(true)
      expect(imgEl.attributes('src')).toBeDefined()
    }
  })
  
  it('should update the image url once it is loaded', async () => {
    const emptyImage = { ...singleProduct().mainImage, original: '' }
    const loadedImage = singleProduct().mainImage

    const component = await mountSuspended(LoadingNuxtImg, {
      props: {
        // @ts-ignore unit testing
        image: emptyImage
      }
    })

    expect(component.findComponent(USkeleton).exists()).toBe(true)

    await component.setProps({ image: loadedImage })

    const imgEl = component.find('img')
    expect(imgEl.exists()).toBe(true)
    expect(imgEl.attributes('src')).toBeDefined()
  })
})

