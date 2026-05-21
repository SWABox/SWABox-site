import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// ✅ AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)

AOS.init({
    duration: 800,
    once: true,
    offset: 100
})

app.mount('#app')