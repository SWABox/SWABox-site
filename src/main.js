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
    const currentDomain = window.location.hostname;
    console.warn(`Turnstile postMessage 错误 - 当前域名: ${currentDomain}`);
    console.warn('请检查 Cloudflare Turnstile 控制台中的域名配置');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.warn('未处理的 Promise 拒绝:', event.reason);
});

app.mount('#app');