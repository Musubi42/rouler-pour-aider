// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      strapiBaseUrl: "",
      strapiToken: "",
      strapiGalleriePutLike: "",
    },
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  mail: {
    message: {
      to: 'roulerpouraider60@gmail.com',
    },
    smtp: {
        host: "",
        port: ,
        auth: {
          user: '',
          pass: '',
        },
      },
  },
  // toast: {
  //     position: 'top-center',
  //     duration: 5000,
  //     keepOnHover: true,
  // },
  plugins: [
    '/plugins/clarity-plugin.js',
    // '/plugins/vue3-toastify.js',
    '/plugins/google-analytics.client.js'
  ],
  modules: [
    "nuxt-svgo",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "nuxt-mail",
    "nuxt-swiper",
    // '@unlighthouse/nuxt',
    "@pinia/nuxt",
    "@pinia/nuxt",
    'nuxt3-leaflet'
  ],
  // image: {
  //   // Use 'static' for Nuxt 3 as the local provider
  //   // This tells Nuxt to use the static images from the `public` directory
  //   provider: 'static', // 'static' is used for local in Nuxt 3
  //   // Other image module configuration...
  // },
  // target: "static",
  static: {
    prefix: false
  },
  ssr: false,
  nitro: {
    prerender: {
      routes: [
        'public/hopital-necker-visite/fresque.webp',
        'public/hopital-necker-visite/fauteuil-lit.webp',
        'public/hopital-necker-visite/tablette.webp',
        // etc.
      ]
    }
  },
  image: {
    // provider options
    provider: 'vercel', // you can use 'ipx', 'cloudinary', 'imgix', 'static', etc.
    // preset options
    presets: {
      cover: {
        modifiers: {
          format: 'webp',
          fit: 'cover',
          width: 500,
          height: 300,
        },
      },
    },
    // static images dir for 'static' provider
    staticFilename: '[publicPath]/images/[name]-[hash][ext]',
  },
  unlighthouse: {
    scanner: {
      site: 'http://localhost:3000',
      device: 'desktop',
    },
  },
  i18n: {
    vueI18n: "./i18n.config.js", // if you are using custom path, default
  },
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  // router: {
  //   middleware: 'maintenance'
  // },
  components: true,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});