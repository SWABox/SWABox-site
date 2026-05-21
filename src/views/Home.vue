<script setup>
import { ref, onMounted } from 'vue'  // ✅ 拼写修正
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import Features from '../components/Features.vue'
import TechStack from '../components/TechStack.vue'
import DownloadSection from '../components/DownloadSection.vue'
import SiteFooter from '../components/SiteFooter.vue'

const passed = ref(false)

onMounted(async () => {
  try {
    // ✅ 等待 Turnstile 加载
    if (!window.turnstile) {
      alert('Turnstile 未加载，请刷新页面')
      return
    }

    // ✅ 正确调用：传入容器 + 参数
    const token = await window.turnstile.execute(
        '#turnstile-container', // 容器 ID
        {
          sitekey: '0x4AAAAAADTy6Tdom9xSIRzsdkr7qCFR1MQ',
          size: 'invisible' // 无感模式
        }
    )

    // ✅ 发给 Workers
    const res = await fetch(
        'https://turnstile-verify.liyunhan11111.workers.dev/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        }
    )

    const data = await res.json()

    if (data.success) {
      passed.value = true
    } else {
      alert('安全验证失败，请刷新页面')
    }
  } catch (e) {
    console.error(e)
    alert('验证服务超时，请稍后再试')
  }
})
</script>

<template>
  <!-- ✅ 验证通过才显示主站 -->
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

  <!-- ✅ 验证中遮罩 -->
  <div v-else class="gate">
    <!-- ✅ 必须有这个容器 -->
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