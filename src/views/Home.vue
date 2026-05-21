<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import Features from '../components/Features.vue'
import TechStack from '../components/TechStack.vue'
import DownloadSection from '../components/DownloadSection.vue'
import SiteFooter from '../components/SiteFooter.vue'

const passed = ref(false)
let isExecuting = false
let turnstileWidgetId = null

onMounted(async () => {
  if (isExecuting) return
  isExecuting = true

  try {
    await nextTick()

    // ✅ 等待 Turnstile 脚本加载
    let attempts = 0
    const maxAttempts = 100
    while (!window.turnstile && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }

    if (!window.turnstile) {
      console.error('Turnstile 脚本加载超时（10秒）')
      alert('安全验证服务加载失败，请检查网络连接后刷新页面')
      isExecuting = false
      return
    }

    const container = document.querySelector('#turnstile-container')
    if (!container) {
      console.error('Turnstile 容器不存在')
      alert('验证容器初始化失败，请刷新页面')
      isExecuting = false
      return
    }

    // ✅ 使用 render() + callback 模式，避免重复执行问题
    turnstileWidgetId = window.turnstile.render(
        '#turnstile-container',
        {
          sitekey: '0x4AAAAAADTy6YTSxcziFVXR',
          size: 'invisible',
          action: 'login',

          // ✅ 成功回调
          callback: async (token) => {
            console.log('Turnstile 验证成功，获得 token')

            if (!token) {
              console.error('Turnstile 返回空 token')
              alert('验证失败，请刷新页面重试')
              isExecuting = false
              return
            }

            try {
              // ✅ 发送 token 到服务器验证
              const res = await fetch(
                  'swabox-workers.cc.cd',
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                  }
              )

              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
              }

              const data = await res.json()

              if (data.success) {
                passed.value = true
              } else {
                console.error('Turnstile 验证失败:', data)
                alert('安全验证失败，请刷新页面重试')
              }
            } catch (e) {
              console.error('验证请求错误:', e)
              if (e.message.includes('NetworkError') || e.message.includes('fetch')) {
                alert('网络连接失败，请检查网络后重试')
              } else {
                alert('验证过程出错：' + e.message)
              }
            } finally {
              isExecuting = false
            }
          },

          // ✅ 错误回调
          'error-callback': (errorCode) => {
            console.error('Turnstile 错误代码:', errorCode)
            alert('安全验证出错（错误码：' + errorCode + '），请刷新页面')
            isExecuting = false
          },

          // ✅ 超时回调
          'timeout-callback': () => {
            console.warn('Turnstile 验证超时')
            alert('验证超时，请刷新页面重试')
            isExecuting = false
          }
        }
    )

    console.log('Turnstile widget 已渲染，ID:', turnstileWidgetId)

  } catch (e) {
    console.error('Turnstile 初始化错误:', e)
    alert('验证初始化失败：' + e.message)
    isExecuting = false
  }
})

// ✅ 组件卸载时清理
onUnmounted(() => {
  if (turnstileWidgetId && window.turnstile) {
    window.turnstile.remove(turnstileWidgetId)
    console.log('Turnstile widget 已清理')
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
    <!-- ✅ Turnstile 容器保持可见但透明 -->
    <div id="turnstile-container" class="turnstile-hidden"></div>
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
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ✅ 隐藏 Turnstile 但保持渲染 */
.turnstile-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
