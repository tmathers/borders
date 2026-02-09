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
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          // you could also use env vars here
          navigateFallback: '/',
        }
      }),
    ],
  
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // <-- important
      }
    },
    base: '/',  // important for GH Pages
  }
})
