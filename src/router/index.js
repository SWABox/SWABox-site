import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Privacy from '../views/Privacy.vue';
import Terms from '../views/Terms.vue';
import Challenge from '../views/Challenge.vue';
import Error from '../views/Error.vue';

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: Challenge,
  },
  {
    path: '/error/:code',
    name: 'Error',
    component: Error,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404'
  }
];

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 历史模式
  history: createWebHistory('/'), // 如果你的网站部署在子路径，例如 '/my-app/'，则需要调整此处
  routes,
  // 配置滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如前进/后退按钮），则滚动到该位置
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否则滚动到页面顶部
      return { top: 0, left: 0, behavior: 'smooth' };
    }
  },
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (import.meta.env.DEV) {
    if (import.meta.env.VITE_ENABLE_SECURITY === 'true') {
      console.log('🔒 开发环境：安全验证已强制启用');
    } else {
      console.warn('⚠️ 开发模式：安全验证已禁用');
      next();
      return;
    }
  }

  if (to.name === 'Error' || to.name === 'Challenge') {
    next();
    return;
  }

  // 1. 检查目标路由是否需要验证
  // 默认所有路由都需要验证（除了 Error 和 Challenge 页面）
  const requiresAuth = true;

  // 2. 检查本地验证状态
  const savedVerification = localStorage.getItem('swabox_verified');
  let isVerified = false;

  function generateSignature(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  function verifySignature(data, signature) {
    return generateSignature(data) === signature;
  }

  if (savedVerification) {
    try {
      const { ts, valid, signature } = JSON.parse(savedVerification);
      if (!verifySignature({ ts, valid }, signature)) {
        console.warn('⚠️ 验证状态签名无效，可能被篡改');
        localStorage.removeItem('swabox_verified');
      } else {
        const isExpired = Date.now() - ts > 24 * 60 * 60 * 1000;
        if (valid && !isExpired) {
          isVerified = true;
        } else {
          localStorage.removeItem('swabox_verified');
        }
      }
    } catch (error) {
      console.error('验证状态解析失败:', error);
      localStorage.removeItem('swabox_verified');
    }
  }

  // 3. 逻辑判断
  if (requiresAuth && !isVerified) {
    // 如果需要验证但未验证，重定向到验证页面
    // 可以将目标路径存入 query，验证后跳转
    next({ path: '/challenge', query: { redirect: to.fullPath } });
  } else {
    // 放行
    next();
  }
});

export default router;