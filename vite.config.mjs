import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: process.env.VITE_APP_NAME,
        short_name: process.env.VITE_APP_NAME,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1c7ed6',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/svg'
          }
        ]
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  define: {
    __APP_NAME__: JSON.stringify(process.env.VITE_APP_NAME)
  },
});
