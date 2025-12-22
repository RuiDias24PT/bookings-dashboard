import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [
    tailwindcss(),
    vue(),
  ],
  
})