<template>
  <form class="space-y-2" @submit.prevent>
    <u-input type="email" class="w-full" autocomplete="email" placeholder="Email" />
    <u-input type="password" class="w-full" autocomplete="new-password" placeholder="Mot de passe" />
    <u-input type="password" class="w-full" autocomplete="new-password" placeholder="Confirmez le mot de passe" />
    <div class="flex justify-start gap-2">
      <u-input-menu :items="['+33']"  class="w-30" />
      <u-input type="tel" autocomplete="tel" class="w-full" placeholder="Numéro de téléphone" />
    </div>

    <p class="font-light my-5 text-sm">Nous t'enverrons un SMS pour confirmer ton numéro et l'associer à ton compte</p>

    <div class="space-y-5">
      <u-checkbox label="Conserver la session" />
      <u-checkbox label="Je veux recevoir les nouveautés et des communications commerciales personnalisées de BERSHKA par e-mail ou d’autres moyens." />
      <u-checkbox label="J’ai lu et j'accepte les Conditions générales et je comprends les informations sur le traitement de mes données personnelles expliquées dans la Politique de confidentialité" />
    </div>

    <u-button type="submit" class="mt-10" size="xl" block>
      S'inscrire
    </u-button>
  </form>
</template>
