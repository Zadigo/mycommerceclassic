<template>
  <div class="grid grid-cols-2 gap-2 max-md:grid-cols-1">
    <motion-group :preset="VueUseMotions.FadeVisibleOnce">
      <nuxt-link v-for="i in 2" :key="i" to="/collection/some-collection" class="group block">
        <div class="h-150 w-full relative overflow-hidden">
          <nuxt-img src="/img1.webp" class="w-full h-full aspect-square object-cover group-hover:scale-110 group-hover:rotate-2 transition-all ease-in-out duration-300" />
  
          <div class="p-10 absolute bottom-0 left-0">
            <h2 class="font-bold text-3xl text-white">
              Some promo text here
            </h2>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </nuxt-link>
    </motion-group>
  </div>
</template>
