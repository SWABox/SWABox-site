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
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TurnstileChallenge from '../components/TurnstileChallenge.vue';
import NavBar from '../components/NavBar.vue';
import HeroSection from '../components/HeroSection.vue';
import Features from '../components/Features.vue';
import TechStack from '../components/TechStack.vue';
import DownloadSection from '../components/DownloadSection.vue';
import SiteFooter from '../components/SiteFooter.vue';
import TermsConsent from '../components/TermsConsent.vue';

const router = useRouter();
const route = useRoute();
const showToast = inject('showToast');

const isHumanVerified = ref(false);

onMounted(() => {
  const saved = localStorage.getItem('swabox_verified');
  if (saved) {
    try {
      const { ts, valid } = JSON.parse(saved);
      const isExpired = Date.now() - ts > 24 * 60 * 60 * 1000;
      if (valid && !isExpired) {
        isHumanVerified.value = true;
      } else {
        localStorage.removeItem('swabox_verified');
      }
    } catch {
      localStorage.removeItem('swabox_verified');
    }
  }
});

async function handleTurnstileSuccess(token) {
  console.log('🔄 接收到 Turnstile Token，正在验证...');

  try {
    const response = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ 验证成功！');
      isHumanVerified.value = true;
      localStorage.setItem('swabox_verified', JSON.stringify({
        valid: true,
        ts: Date.now(),
      }));
      const redirect = route.query.redirect;
      if (redirect && typeof redirect === 'string') {
        router.push(redirect);
      }
    } else {
      console.error('❌ 验证失败:', result);
      const errorMsg = result.message || '请重试';
      showToast(`验证失败: ${errorMsg}`, 'error');
    }
  } catch (networkError) {
    console.error('网络请求失败:', networkError);
    showToast('验证服务暂时不可用，请检查网络。', 'error');
  }
}

function handleTurnstileError(errorMsg) {
  console.warn('验证过程出错:', errorMsg);
  showToast(`验证过程出错: ${errorMsg}`, 'error');
}
</script>

<style scoped>
.gateway-page,
.main-site {
  min-height: 100vh;
}
</style>