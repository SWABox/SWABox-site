<script setup>
import { ref, onMounted, nextTick } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import Features from '../components/Features.vue'
import TechStack from '../components/TechStack.vue'
import DownloadSection from '../components/DownloadSection.vue'
import SiteFooter from '../components/SiteFooter.vue'

// ✅ 添加 Turnstile 类型声明
/** @type {{ execute: (container: string, options: { sitekey: string; size: string }) => Promise<string> }} */
const turnstile = window.turnstile

const passed = ref(false)
let isExecuting = false // ✅ 防重入锁

onMounted(async () => {
  if (isExecuting) return
  isExecuting = true

  try {
    // ✅ 等待 DOM 完全就绪
    await nextTick()

    // ✅ 等待 Turnstile 脚本加载完成
    let attempts = 0
    while (!window.turnstile && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    if (!window.turnstile) {
      alert('Turnstile 脚本加载失败，请检查 CSP 设置')
      return
    }

    const container = document.querySelector('#turnstile-container')
    if (!container) {
      console.error('Turnstile 容器不存在')
      return
    }

    // ✅ 直接执行，无需 reset
    const token = await turnstile.execute(
        '#turnstile-container',
        {
          sitekey: '0x4AAAAAADTy6Tdom9xSIRzsdkr7qCFR1MQ', // 👈 替换为你的 Site Key
          size: 'invisible'
        }
    )

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
    alert('验证失败，请检查网络连接或 CSP 设置')
  } finally {
    isExecuting = false
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