<template>
  <u-slideover v-model:open="openLoginModal" :dismissible="false">
    <template #title>
      <u-button v-if="showSignupBlock" variant="ghost" color="neutral" size="xl" @click="() => { toggleSignupBlock() }">
        <icon name="i-lucide:arrow-left" />
      </u-button>
    </template>

    <template #body>
      <div class="p-5 flex flex-col justify-center h-full">
        <p class="font-bold mb-10 text-center text-xl">
          Connecte-toi ou crée un compte
        </p>

        <div class="space-y-2 mb-10 transition-all ease-in-out duration-300">
          <u-button size="xl" variant="subtle" block>
            <icon name="fa7-brands:facebook" />
            Facebook
          </u-button>
  
          <u-button size="xl" variant="subtle" block>
            <icon name="fa7-brands:google" />
            Google
          </u-button>
        </div>
        
        <motion :preset="VueUseMotions.SlideRight">
          <lazy-base-blocks-signup v-if="showSignupBlock" hydrate-on-visible />
          <lazy-base-blocks-login v-else hydrate-on-visible />
        </motion>

        <p v-if="!showSignupBlock" class="text-sm mt-5">
          Pas encore de compte ? 
          <nuxt-link class="text-primary-900 cursor-pointer font-bold hover:underline" @click="() => { toggleSignupBlock() }">
            Crée un compte
          </nuxt-link>
        </p>
      </div>
    </template>
  </u-slideover>
</template>

<script setup lang="ts">
const openLoginModal = useState<boolean>('openLoginModal')

const showSignupBlock = ref(false)
const toggleSignupBlock = useToggle(showSignupBlock)
</script>
