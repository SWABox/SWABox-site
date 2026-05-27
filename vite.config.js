import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        bypass: (req, res, options) => {
        if (req.url.includes('/api/verify-turnstile') && req.method === 'POST') {
          if (process.env.VITE_ENABLE_SECURITY === 'true') {
            console.log('开发模式：强制安全验证，不模拟');
            return false;
          }
          console.log('开发模式：模拟验证成功');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, message: '开发模式模拟成功' }));
          return true;
        }
      },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});