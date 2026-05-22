import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

// 定义路由
const routes = [
{
path: '/',
name: 'Home',
component: Home,
},
// 你可以在此添加其他路由，例如：
// {
//   path: '/docs',
//   name: 'Docs',
//   component: () => import('../views/Docs.vue'), // 懒加载
//   meta: { requiresAuth: true } // 标记此路由需要验证
// },
];

// 创建路由实例
const router = createRouter({
// 使用 HTML5 历史模式
history: createWebHistory('/'), // 如果你的网站部署在子路径，例如 '/my-app/'，则需要调整此处
routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
// 1. 检查目标路由是否需要验证
// 如果所有路由都需要验证，可以跳过 meta 检查，或者给特定路由加 meta
const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

// 2. 检查本地验证状态
const savedVerification = localStorage.getItem('swabox_turnstile_verified');
let isVerified = false;

if (savedVerification) {
const { timestamp, valid } = JSON.parse(savedVerification);
const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24小时过期
isVerified = valid && !isExpired;
}

// 3. 逻辑判断
if (requiresAuth && !isVerified) {
// 如果需要验证但未验证，重定向到首页（会触发验证流程）
// 可以将目标路径存入 query，验证后跳转
next({ path: '/', query: { redirect: to.fullPath } });
} else {
// 放行
next();
}
});

export default router;
