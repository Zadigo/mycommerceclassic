<template>
  <section id="accounts">
    <lazy-base-navbar hydrate-on-idle />

    <div class="grid grid-cols-1 grid-rows-2 md:grid-cols-12 md:grid-rows-1 md:gap-10 md:h-screen md:max-w-5xl md:mx-auto md:my-10">
      <aside class="md:col-span-3 px-5 md:px-0">
        <ul class="space-y-2">
          <li v-for="link in ACCOUNT_LINKS" :key="link.name" class="bg-slate-50 has-[.router-link-exact-active]:bg-slate-200 hover:bg-slate-100 transition-all ease-in-out duration-300 rounded-lg">
            <nuxt-link :to="link.to" class="flex justify-start items-center gap-4 p-3">
              <icon v-if="link.icon" :name="link.icon" />
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <main class="md:col-span-9 px-5 md:px-0">
        <slot />
      </main>
    </div>

    <lazy-base-footer hydrate-on-visible />
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.router-link-exact-active {
  font-weight: var(--font-weight-bold);
}
</style>
