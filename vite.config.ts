import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // embed assets (i.e. images) in code
    // in practice our images are ~10kb or less
    assetsInlineLimit: 65536
  },
  plugins: [svelte()],
  clearScreen: false
})
