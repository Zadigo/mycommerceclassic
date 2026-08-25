import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import SuperZoom from '~/components/product/images/SuperZoom.vue'

describe('SuperZoom Component', () => {
  it('should render the SuperZoom component', async () => {
    const component = await mountSuspended(SuperZoom, {
      props: {
        image: '/img1.webp'
      }
    })

    expect(component.exists()).toBe(true)

    const closeButtonEl = component.find('#cta-super-zoom-close')
    expect(closeButtonEl.exists()).toBe(true)
    expect(closeButtonEl.isVisible()).toBe(true)
    expect(closeButtonEl.attributes('disabled')).toBeUndefined()
  })

  it('should emit close event when close button is clicked', async () => {
    const component = await mountSuspended(SuperZoom, {
      props: {
        image: '/img1.webp'
      }
    })

    const closeButtonEl = component.find('#cta-super-zoom-close')
    await closeButtonEl.trigger('click')

    expect(component.emitted()).toHaveProperty('close')
  })
})
