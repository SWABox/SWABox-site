<template>
  <div class="gateway-page">
    <TurnstileChallenge
        @verified="handleTurnstileSuccess"
        @error="handleTurnstileError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TurnstileChallenge from '../components/TurnstileChallenge.vue';

const router = useRouter();

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

async function handleTurnstileSuccess(token) {
  console.log('🔄 接收到验证 Token，正在验证...');

  const saved = localStorage.getItem('swabox_verified');
  if (saved) {
    try {
      const { ts, valid, signature } = JSON.parse(saved);
      if (verifySignature({ ts, valid }, signature)) {
        const isExpired = Date.now() - ts > 24 * 60 * 60 * 1000;
        if (valid && !isExpired) {
          console.log('✅ 验证状态仍然有效（24小时内），无需重新验证');
          router.push('/');
          return;
        }
      }
    } catch (error) {
      console.error('验证状态检查失败:', error);
    }
  }

  if (import.meta.env.DEV) {
    if (import.meta.env.VITE_ENABLE_SECURITY === 'true') {
      console.log('🔒 开发环境强制安全验证模式');
    } else {
      console.warn('⚠️ 开发环境：跳过服务器验证');
      const verificationData = {
        valid: true,
        ts: Date.now(),
      };
      verificationData.signature = generateSignature(verificationData);
      localStorage.setItem('swabox_verified', JSON.stringify(verificationData));
      router.push('/');
      return;
    }
  }

  try {
    const response = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ 验证成功！');
      const verificationData = {
        valid: true,
        ts: Date.now(),
      };
      const signature = generateSignature(verificationData);
      verificationData.signature = signature;
      localStorage.setItem('swabox_verified', JSON.stringify(verificationData));
      router.push('/');
    } else {
      alert(`验证失败: ${result.message || '请重试'}`);
    }
  } catch (networkError) {
    console.error('网络请求失败:', networkError);
    alert('验证服务暂时不可用，请检查网络。');
  }
}

function handleTurnstileError(errorMsg) {
  console.warn('验证过程出错:', errorMsg);

}
</script>

<style scoped>
.gateway-page {
  min-height: 100vh;
}
</style>