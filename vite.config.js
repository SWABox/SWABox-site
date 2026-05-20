import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  optimizeDeps: {
    include: ['marked']  // 显式包含 marked
  },
  build: {
    rollupOptions: {
      external: []  // 确保 marked 不被排除
    }
  }
})

