import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

app.use(router);

AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

app.config.errorHandler = (err, vm, info) => {
  console.error('Vue 错误:', err, info);
};

window.addEventListener('error', (event) => {
  if (event.message.includes('postMessage') && event.message.includes('challenges.cloudflare.com')) {
    event.preventDefault();
    console.warn('Turnstile postMessage 错误已忽略（开发环境常见）');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn('未处理的 Promise 拒绝:', event.reason);
});

app.mount('#app');