<template>
  <section id="success">
    <u-container class="my-20">
      <div class="max-w-5xl mx-auto">
        <u-card id="page-success">
          <div class="flex flex-col items-center justify-center">
            <p class="font-bold text-3xl">
              Merci pour votre commande!
            </p>
      
            <p class="mt-5">
              Votre commande a été passée avec succès. Vous recevrez un e-mail de confirmation sous peu.
            </p>
      
            <div class="flex justify-start gap-2 mt-10">
              <u-button :id="createElementId('link', 'content', 'success', 'back')" to="/" variant="solid" color="primary" size="xl">
                Retour à l'accueil
              </u-button>
            </div>
          </div>
        </u-card>
      </div>
    </u-container>

    <!-- Recommendations -->
    <async-recommendations />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Success',
  layout: 'blank'
})

const AsyncRecommendations = defineAsyncComponent(async () => await import('~/components/base/Recommendations.vue'))
</script>
