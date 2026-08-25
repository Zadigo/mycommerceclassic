import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import ID from '~/pages/[id].vue'

vi.mock('~/components/product/images/Grid.vue', () => {
  return {
    default: defineComponent({
      name: 'MockedGrid',
      template: '<div data-test-id="mocked-grid">Mocked Grid Component</div>'
    })
  }
})

vi.mock('~/components/product/images/SuperZoom.vue', () => {
  return {
    default: defineComponent({
      name: 'MockedSuperZoom',
      template: '<div data-test-id="mocked-super-zoom">Mocked Super Zoom Component</div>'
    })
  }
})

describe('ID Page', () => {
  it('should render the ID page component', async () => {
    const component = await mountSuspended(ID)

    expect(component.exists()).toBe(true)

    const sizesBlock = component.find('#cta-content-sizes')
    expect(sizesBlock.exists()).toBe(true)
  })

  const actionButtons = [
    '#cta-content-add-to-cart',
    '#cta-content-like'
  ]

  actionButtons.forEach((buttonId) => {
    it(`should have button ${buttonId}`, async () => {
      const component = await mountSuspended(ID)
      const button = component.find(buttonId)

      expect(button.exists()).toBe(true)
      expect(button.isVisible()).toBe(true)
      expect(button.attributes('disabled')).toBeUndefined()
    })
  })
})
