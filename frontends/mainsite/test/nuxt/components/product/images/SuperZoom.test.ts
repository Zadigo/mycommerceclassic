import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import SuperZoom from '~/components/product/images/SuperZoom.vue'

describe('components/product/images/SuperZoom.vue', { tags: ['frontend'] }, () => {
  it.each(
    [
      [{ testCase: 'open is true', props: { open: true } }],
      [{ testCase: 'open is false', props: { open: false } }],
    ]
  )('should render the SuperZoom component', async ({ props }) => {
    const component = await mountSuspended(SuperZoom, { props })
    
    expect(component.exists()).toBe(true)

    const closeButtonEl = component.find('#cta-super-zoom-close')
    
    if (props.open) {
      expect(closeButtonEl.exists()).toBe(true)
      expect(closeButtonEl.isVisible()).toBe(true)
      expect(closeButtonEl.attributes('disabled')).toBeUndefined()

      const imageEls = component.findAll('img')
      
      imageEls.forEach((img) => {
        expect(img.attributes('src')).toBeDefined()
        expect(img.attributes('alt')).toBeDefined()
      })
    } else {
      expect(closeButtonEl.exists()).toBe(false)
    }
  })

  it('should emit close event when close button is clicked', async () => {
    const component = await mountSuspended(SuperZoom, {
      props: {
        open: true
      }
    })

    const closeButtonEl = component.find('#cta-super-zoom-close')
    await closeButtonEl.trigger('click')

    expect(component.emitted()).toHaveProperty('close')
  })
})
