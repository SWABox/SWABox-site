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

onMounted(() => {
  const saved = localStorage.getItem('swabox_verified');
  if (saved) {
    try {
      const { ts, valid, signature } = JSON.parse(saved);
      if (!verifySignature({ ts, valid }, signature)) {
        console.warn('⚠️ 验证状态签名无效，可能被篡改');
        localStorage.removeItem('swabox_verified');
        return;
      }
      
      const isExpired = Date.now() - ts > 24 * 60 * 60 * 1000;
      if (valid && !isExpired) {
        isHumanVerified.value = true;
      } else {
        localStorage.removeItem('swabox_verified');
      }
    } catch (error) {
      console.error('验证状态解析失败:', error);
      localStorage.removeItem('swabox_verified');
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
      isHumanVerified.value = true;
      const verificationData = {
        valid: true,
        ts: Date.now(),
      };
      const signature = generateSignature(verificationData);
      verificationData.signature = signature;
      localStorage.setItem('swabox_verified', JSON.stringify(verificationData));
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