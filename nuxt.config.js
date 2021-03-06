export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Giphy',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/custom.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "~/plugins/date-filter",
        "~/plugins/byte-filter"
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/dotenv'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios', ['nuxt-fontawesome', {
            component: 'fa',
            imports: [
                //import whole set
                {
                    set: '@fortawesome/free-solid-svg-icons',
                    icons: ['fas']
                },
                {
                    set: '@fortawesome/free-brands-svg-icons',
                    icons: ['fab']
                },
                {
                    set: '@fortawesome/free-regular-svg-icons',
                    icons: ['far']
                },
            ]
        }]
    ],

    axios: {
        // proxy: true
    },

    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            compact: true,
        },
    },
}