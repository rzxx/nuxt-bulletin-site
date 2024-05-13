// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-mongoose", "@vueuse/nuxt"],
  nitro: {
    storage: {
      fs: {
        driver: 'fs',
        base: './public'
      }
    },
    imports: {
      dirs: ['./server/models']
    }
  }
})
