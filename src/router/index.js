import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Docs from '../views/Docs.vue'

const router = createRouter({
    history: createWebHistory('/'), // Cloudflare Pages 根路径
    routes: [
        // 首页
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        // 文档页
        {
            path: '/docs',
            name: 'Docs',
            component: Docs
        },
        // 👇 关键：重定向到 Public 下的静态 HTML 错误页
        {
            path: '/403',
            redirect: '/403.html'
        },
        {
            path: '/404',
            redirect: '/404.html'
        },
        {
            path: '/500',
            redirect: '/500.html'
        },
        {
            path: '/502',
            redirect: '/502.html'
        },
        {
            path: '/503',
            redirect: '/503.html'
        },
        {
            path: '/privacy',
            redirect: '/privacy.html'
        },
        // 404 兜底
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404.html'
        }
    ]
})

export default router