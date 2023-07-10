import sitemapRequests from "./plugins/sitemapRequests";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "zhbl.by",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { "http-equiv": "imagetoolbar", content: "no" },
      { name: "yandex-verification", content: "823b06907b245fa7" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@plugins/v-mask.js", "~/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/sitemap",
    [
      "@nuxtjs/yandex-metrika",
      {
        id: "54863989",
        webvisor: true,
        accurateTrackBounce: true,
        clickmap: true,
        trackLinks: true,
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-131929000-1",
      },
    ],
    [
      "@nuxtjs/google-gtag",
      {
        id: "G-DW4TWTGZ7P",
      },
    ],
  ],

  sitemap: {
    hostname: "https://zhbl.by",
    routes: sitemapRequests,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://api.zhbl.by/api",
    https: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {},
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
