import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  base: '/ai-beauty-store/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // 使用esbuild作为构建后端
  build: {
    target: 'es2015',
    assetsInlineLimit: 4000,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'chart.js', 'gsap', 'swiper']
        }
      }
    }
  }
})
