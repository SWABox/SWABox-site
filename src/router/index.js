import { createRouter, createWebHistory } from 'vue-router'
// 你的组件都在 components 里，直接引入
import NotFound from '../components/NotFound.vue' // 404 组件

const router = createRouter({
    history: createWebHistory('/swabox-site/'), // 对应你的 GitHub Pages 路径
    routes: [
        { path: '/', component: Home },
        { path: '/:pathMatch(.*)*', component: NotFound } // 404 兜底
    ]
})

export default router
