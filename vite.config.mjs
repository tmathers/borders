import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig(({ mode }) => {
  
  // load env variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      VitePWA({
        manifest: {
          name: env.VITE_APP_NAME,
          short_name: env.VITE_APP_NAME,
          start_url: '/borders',
          display: 'fullscreen',
          background_color: '#242424',
          theme_color: '#1c7ed6ff',
          icons: [
            {
              src: './favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
            },
          ]
        },
        workbox: {
          navigateFallback: '/',
        }
      }),
    ],
  
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // <-- important
      }
    },
    base: '/borders',  // important for GH Pages
  }
})
