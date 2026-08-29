export default defineNuxtPlugin({
  name: 'authentication',
  parallel: true,
  async setup() {
    if (import.meta.client) {
      const route = useRoute()
  
      if (route.path.startsWith('/accounts')) {
        console.error('This route should be protected!')
      }
  
      const protectedEndpoints = ['payment', 'shipment', 'success']
  
      if (route.path.startsWith('/cart') && protectedEndpoints.some(endpoint => route.path.includes(endpoint))) {
        console.error('This cart route should be protected!')
      }
    }
  }
})
  