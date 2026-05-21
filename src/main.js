import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// ✅ 引入 AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

// ✅ 初始化 AOS
AOS.init({
    duration: 800,   // 动画时长
    once: true,      // 只触发一次
    offset: 100      // 距离视口多少像素时触发
})

app.mount('#app')