import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由配置
import './style.css';

// ✅ 引入 AOS 动画库
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

// 使用路由
app.use(router);

// 初始化 AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
});

app.mount('#app');