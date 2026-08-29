<template>
  <form class="space-y-2" @submit.prevent>
    <u-input type="email" class="w-full" placeholder="Email" />
    <u-input type="password" class="w-full" placeholder="Mot de passe" />
    <u-button type="submit" size="xl" block>
      Se connecter
    </u-button>
  </form>
</template>
