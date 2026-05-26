<template>
  <!-- 验证网关页面 -->
  <div v-if="!isHumanVerified" class="gateway-page">
    <!-- 自定义验证界面组件 -->
    <TurnstileChallenge
        @verified="handleTurnstileSuccess"
        @error="handleTurnstileError"
    />
  </div>

  <!-- 验证通过后的主站内容 -->
  <div v-else class="main-site">
    <!-- 首次访问弹窗 -->
    <TermsConsent />

    <NavBar />
    <main>
      <HeroSection />
      <Features />
      <TechStack />
      <DownloadSection />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TurnstileChallenge from '../components/TurnstileChallenge.vue';
// 引入您原有的布局组件
import NavBar from '../components/NavBar.vue';
import HeroSection from '../components/HeroSection.vue';
import Features from '../components/Features.vue';
import TechStack from '../components/TechStack.vue';
import DownloadSection from '../components/DownloadSection.vue';
import SiteFooter from '../components/SiteFooter.vue';
import TermsConsent from '../components/TermsConsent.vue';

const router = useRouter();
const route = useRoute();


// 验证状态
const isHumanVerified = ref(false);

// 组件挂载时检查本地存储的验证状态
onMounted(() => {
  const saved = localStorage.getItem('swabox_verified');
  if (saved) {
    const { ts, valid } = JSON.parse(saved);
    // 检查验证是否在24小时内
    const isExpired = Date.now() - ts > 24 * 60 * 60 * 1000;
    if (valid && !isExpired) {
      isHumanVerified.value = true;
    } else {
      localStorage.removeItem('swabox_verified'); // 清除过期记录



    }
  }
});

// 处理验证成功
async function handleTurnstileSuccess(token) {
  console.log('🔄 接收到 Turnstile Token，正在验证...');

  try {
    // 关键：调用部署在 Pages 项目本身中的 Function
    const response = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ 验证成功！');
      // 1. 更新状态
      isHumanVerified.value = true;
      // 2. 存储验证状态（24小时有效）
      localStorage.setItem('swabox_verified', JSON.stringify({
        valid: true,
        ts: Date.now(),
      }));
      // 3. 如果URL中有重定向参数，则跳转
      const redirect = route.query.redirect;
      if (redirect && typeof redirect === 'string') {
        router.push(redirect);
      }
    } else {
      console.error('❌ 验证失败:', result);
      alert(`验证失败: ${result.message || '请重试'}`);

    }
  } catch (networkError) {
    console.error('网络请求失败:', networkError);
    alert('验证服务暂时不可用，请检查网络。');
  }
}

// 处理验证错误
function handleTurnstileError(errorMsg) {
  console.warn('验证过程出错:', errorMsg);
  // 可以在这里显示更友好的错误提示
}
</script>

<style scoped>
.gateway-page,
.main-site {
  min-height: 100vh;
}
</style>