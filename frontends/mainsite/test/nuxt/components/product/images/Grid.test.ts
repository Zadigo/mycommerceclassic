import { describe, it, expect } from 'vitest'
import Grid from '~/components/product/images/Grid.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useLoadFixtures } from '#server/utils/testing/index'

describe('components/product/images/Grid.vue', { tags: ['frontend'] }, () => {
  it('should render the grid component without images', async () => {
    const component = await mountSuspended(Grid, {
      props: {
        images: []
      }
    })
    expect(component.exists()).toBe(true)
    
    const images = component.findAll('img')
    expect(images.length).toEqual(0)
  })

  it.only('should have alt attributes for images that are displayed', async () => {
    const { singleProduct } = useLoadFixtures()
    const product = singleProduct()
    
    const component = await mountSuspended(Grid, {
      props: {
        images: product.productImages
      }
    })

    const images = component.findAll('img')
    expect(images.length).toBeGreaterThan(0)
    
    images.forEach((img) => {
      expect(img.attributes('alt')).toBeDefined()
      expect(img.attributes('src')).toBeDefined()
    })
    
    const alts = images.map((img) => img.attributes('alt'))
    const altCount: Record<string, number> = {}
    alts.forEach((alt) => {
      if (alt) {
        if (altCount[alt]) {
          altCount[alt] += 1
        } else {
          altCount[alt] = 1
        }
      }
    })

    console.log(altCount, product.productImages)
    
    Object.entries(altCount).forEach(([_, count]) => {
      expect(count).toBe(1)
    })
  })
})
