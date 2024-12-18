// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      htmlAttrs: {
        lang: 'id',
      },
    }
  },

  build: {
    transpile: ['@vuepic/vue-datepicker']
  },

  dayjs: {
    locales: ['id'],
    plugins: ['timezone'],
    defaultLocale: 'id',
  },

  devtools: { enabled: true },

  echarts: {
    renderer: 'svg',
    charts: ['LineChart'],
    components: ['DatasetComponent', 'GridComponent', 'ToolboxComponent', 'TooltipComponent'],
  },

  icon: {
    clientBundle: {
      // scan all components in the project and include icons
      scan: true,

      // guard for uncompressed bundle size, will fail the build if exceeds
      sizeLimitKb: 256,
    },
  },

  nitro: {
    imports: {
      dirs: [
        './server/database/schemas',
      ]
    }
  },

  modules: [
    'dayjs-nuxt',
    'nuxt-echarts',
    '@nuxtjs/supabase',
    '@nuxt/ui',
  ],

  runtimeConfig: {
    databaseUrl: '',
    public: {
      siteUrl: '',
    },
  },

  supabase: {
    redirect: false,
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  compatibilityDate: '2024-07-22'
})
