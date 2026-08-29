<template>
  <section id="accounts">
    <lazy-base-navbar hydrate-on-idle />

    <div class="grid grid-cols-12 gap-4 h-screen max-w-5xl mx-auto my-20">
      <aside class="col-span-3">
        <u-card>
          <ul class="space-y-2">
            <li v-for="i in 4" :key="i" class="p-3 bg-slate-50 hover:bg-slate-100 transition-all ease-in-out duration-300 rounded-lg">
              <nuxt-link to="/accounts" class="flex justify-start items-center gap-4">
                <icon name="i-lucide:user" />
                Home
              </nuxt-link>
            </li>
          </ul>
        </u-card>
      </aside>

      <main class="col-span-9">
        <slot />
      </main>
    </div>

    <lazy-base-footer hydrate-on-visible />
  </section>
</template>

<script setup lang="ts">
const links = [
  {
    name: 'Account',
    to: '/accounts',
  },
  {
    
  }
]
</script>

<style scoped>
.router-link-exact-active {
  font-weight: var(--font-weight-bold);
}
</style>
