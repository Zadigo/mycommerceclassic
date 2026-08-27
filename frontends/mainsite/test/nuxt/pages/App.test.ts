import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'
import Footer from '~/components/base/Footer.vue'
import Navbar from '~/components/base/Navbar.vue'

vi.mock('~/composables/session', async (original) => {
  const actual = await original<typeof import('~/composables/session')>()
  return {
    ...actual,
    useSessionCreateComposable: vi.fn()
  }
})

mockNuxtImport('useRouter', (original: typeof import('vue-router').useRouter) => vi.fn(original))

describe('App', () => {
  it('should render the base app poperly', async () => {
    const component = await mountSuspended(App)
    expect(component.exists()).toBe(true)
    
    expect(component.findComponent(Navbar).exists()).toBe(true)
    expect(component.findComponent(Footer).exists()).toBe(true) 
  })
})
