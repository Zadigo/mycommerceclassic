<template>
  <section id="hero-video" class="relative w-full h-[100vh]">
    <video autoplay muted loop playsinline  class="w-full h-[100vh] object-cover">
      <source src="/vid1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div id="lead" class="absolute top-0 w-full h-full flex flex-col items-center justify-center text-center text-white">
      <h1 class="text-8xl font-bold dark:text-primary-50">
        La mode à petit prix
      </h1>

      <div class="flex justify-around items-center text-2xl gap-4 mt-4">
        <nuxt-link to="/collection/some-collection" class="px-10 py-3 rounded-lg bg-amber-100/50 inset-shadow-2xs cursor-pointer hover:bg-amber-100/70 transition-all duration-300">
          Nos collections
        </nuxt-link>

        <nuxt-link to="/collection/another-collection" class="px-10 py-3 rounded-lg bg-amber-100/50 inset-shadow-2xs cursor-pointer hover:bg-amber-100/70 transition-all duration-300">
          Nos collections
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
