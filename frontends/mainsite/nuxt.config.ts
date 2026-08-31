// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxt/a11y',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@vueuse/motion',
    'nuxt-vuefire',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/cart/**': { ssr: false },
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      {
        name: 'Zain'
      },
      {
        name: 'Nunito'
      }
    ]
  },

  imports: {
    dirs: [
      '~/constants'
    ]
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
    firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID,
    firebaseClientEmail: process.env.NUXT_FIREBASE_CLIENT_EMAIL,
    firebasePrivateKey: process.env.NUXT_FIREBASE_PRIVATE_KEY,
    public: {
      
    }
  },

  vuefire: {
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NUXT_FIREBASE_DATABASE_URL,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      appId: process.env.NUXT_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID
    }
  },

  image: {
    domains: [],
    provider: 'ipx'
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    langDir: './locales',
    defaultLocale: 'fr',
    vueI18n: './i18n.config.ts',
    customRoutes: 'config',
    experimental: { localeDetector: './local_detector.ts' },
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'fr',
      redirectOn: 'root'
    },
    pages: {},
    locales: [
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr-FR.ts',
        dir: 'ltr',
        name: 'French'
      },
      {
        code: 'en',
        language: 'en-US',
        files: ['en.ts', 'en-US.ts'],
        dir: 'ltr',
        name: 'English'
      }
    ]
  },
})
