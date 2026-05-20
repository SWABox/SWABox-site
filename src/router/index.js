import { createRouter, createWebHistory } from 'vue-router'
import DocsView from '../views/DocsView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/docs/:category?/:page?',
        name: 'Docs',
        component: DocsView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router