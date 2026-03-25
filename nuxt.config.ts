// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  ssr: false,

  app: {
    head: {
      title: 'Mod-Vite',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  css: ['~/assets/style/main.css'],

  modules: ['@pinia/nuxt'],

  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/ui', pathPrefix: false },
  ],

  imports: {
    dirs: ['composables', 'stores'],
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      routes: ['/']
    }
  },
})
