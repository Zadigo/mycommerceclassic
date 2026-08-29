<template>
  <section id="accounts">
    <lazy-base-navbar hydrate-on-idle />

    <div class="grid grid-cols-12 gap-10 h-screen max-w-5xl mx-auto my-20">
      <aside class="col-span-3">
        <h3 class="font-bold text-xl uppercase mb-8">
          Bonjour, Julie
        </h3>

        <ul class="space-y-2">
          <li v-for="link in links" :key="link.name" class="p-3 bg-slate-50 hover:bg-slate-100 transition-all ease-in-out duration-300 rounded-lg">
            <nuxt-link :to="link.to" class="flex justify-start items-center gap-4">
              <icon name="i-lucide:user" />
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
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
    name: 'Mon profil',
    to: '/accounts',
  },
  {
    name: 'Mes achats',
    to: '/accounts/orders',
  },
  {
    name: 'Mes retours',
    to: '/accounts/refunds',
  },
  {
    name: 'Mes données',
    to: '/accounts/profile',
  }
]
</script>

<style scoped>
.router-link-exact-active {
  font-weight: var(--font-weight-bold);
}
</style>
