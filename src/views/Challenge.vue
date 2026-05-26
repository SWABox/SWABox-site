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


async function handleTurnstileSuccess(token) {
  console.log('🔄 接收到验证 Token，正在验证...');

  // 开发环境：直接验证通过
  if (import.meta.env.DEV) {
    console.log('✅ 开发环境验证成功！');
    localStorage.setItem('swabox_verified', JSON.stringify({
      valid: true,
      ts: Date.now(),
    }));
    router.push('/');
  } else {
    try {
      const response = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ 验证成功！');
        localStorage.setItem('swabox_verified', JSON.stringify({
          valid: true,
          ts: Date.now(),
        }));
        router.push('/');
      } else {
        alert(`验证失败: ${result.message || '请重试'}`);

      }
    } catch (networkError) {
      console.error('网络请求失败:', networkError);
      alert('验证服务暂时不可用，请检查网络。');
    }
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