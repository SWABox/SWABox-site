<script setup>
import { ref, onMounted, nextTick } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import Features from '../components/Features.vue'
import TechStack from '../components/TechStack.vue'
import DownloadSection from '../components/DownloadSection.vue'
import SiteFooter from '../components/SiteFooter.vue'

const passed = ref(false)
let isRunning = false

onMounted(async () => {
  if (isRunning) return
  isRunning = true

  try {
    // ✅ 等待 DOM 完全渲染
    await nextTick()

    if (!window.turnstile) {
      alert('Turnstile 未加载，请刷新页面')
      return
    }

    const container = document.querySelector('#turnstile-container')
    if (!container) {
      console.error('Turnstile 容器不存在')
      return
    }

    // ✅ 直接执行，无需 reset（无感模式）
    const token = await window.turnstile.execute(
        '#turnstile-container',
        {
          sitekey: '0x4AAAAAADTy6Tdom9xSIRzsdkr7qCFR1MQ', // 👈 替换为你的 Site Key
          size: 'invisible'
        }
    )

    // ✅ 发送给 Workers
    const res = await fetch(
        'https://turnstile-verify.liyunhan11111.workers.dev/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        }
    )

    const data = await res.json()
    passed.value = !!data.success

  } catch (e) {
    console.error('Turnstile 错误:', e)
    alert('验证失败，请关闭浏览器扩展后重试')
  } finally {
    isRunning = false
  }
})
</script>

<template>
  <div v-if="passed">
    <NavBar />
    <main>
      <HeroSection />
      <Features />
      <TechStack />
      <DownloadSection />
    </main>
    <SiteFooter />
  </div>

  <div v-else class="gate">
    <!-- ✅ 确保容器存在 -->
    <div id="turnstile-container" style="display: none;"></div>
    <div class="spinner"></div>
    <p>安全检测中...</p>
  </div>
</template>

<style scoped>
.gate {
  height: 100vh;
  background: var(--bg-dark, #1a1a2e);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.2);
  border-left-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>