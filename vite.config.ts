import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/camping/',
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // Disable service worker in dev mode
      },
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Kids Camping Pack List',
        short_name: 'Camp Pack',
        description: 'A small app to help kids pack for camping trips.',
        start_url: '/camping/',
        scope: '/camping/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1f2937',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
})
