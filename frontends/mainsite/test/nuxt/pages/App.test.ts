import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import App from '~/app.vue'

describe('App', () => {
  it('should be a valid test', async () => {
    const component = await mountSuspended(App)
    expect(component.html()).toContain('Collection')
  })
})
