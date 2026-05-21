<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import Features from '../components/Features.vue'
import TechStack from '../components/TechStack.vue'
import DownloadSection from '../components/DownloadSection.vue'
import SiteFooter from '../components/SiteFooter.vue'

const passed = ref(false)
const loading = ref(true)
const error = ref(null)
const retryCount = ref(0)
let isExecuting = false
let turnstileWidgetId = null

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAADTy6YTSxcziFVXR'
const MAX_RETRIES = 3

// ✅ 网络诊断函数
async function checkNetwork() {
  const checks = {
    cloudflare: false,
    worker: false
  }

  try {
    await fetch('https://challenges.cloudflare.com/', {
      method: 'HEAD',
      mode: 'no-cors',
      timeout: 3000
    })
    checks.cloudflare = true
  } catch (e) {
    console.warn('Cloudflare 连接失败:', e.message)
  }

  try {
    await fetch('https://swabox-workers.cc.cd/', {
      method: 'HEAD',
      mode: 'no-cors',
      timeout: 3000
    })
    checks.worker = true
  } catch (e) {
    console.warn('Worker 服务连接失败:', e.message)
  }

  return checks
}

// ✅ 初始化 Turnstile
async function initTurnstile() {
  if (isExecuting) return
  isExecuting = true
  loading.value = true
  error.value = null

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
      throw new Error('Turnstile 脚本加载超时')
    }

    const container = document.querySelector('#turnstile-container')
    if (!container) {
      throw new Error('验证容器不存在')
    }

    // ✅ 清理旧的 widget
    if (turnstileWidgetId) {
      window.turnstile.remove(turnstileWidgetId)
    }

    // ✅ 渲染新的 widget
    turnstileWidgetId = window.turnstile.render(
        '#turnstile-container',
        {
          sitekey: SITE_KEY,
          size: 'invisible',
          action: 'login',
          retry: 'never', // ✅ 禁用自动重试，使用手动重试
          theme: 'light',

          callback: async (token) => {
            console.log('✓ Turnstile 验证成功')

            if (!token) {
              error.value = '验证返回空令牌'
              loading.value = false
              isExecuting = false
              return
            }

            try {
              // ✅ 发送验证请求
              const controller = new AbortController()
              const timeoutId = setTimeout(() => controller.abort(), 15000)

              const res = await fetch(
                  'https://swabox-workers.cc.cd/',
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                    signal: controller.signal
                  }
              )

              clearTimeout(timeoutId)

              if (!res.ok) {
                throw new Error(`服务器错误: ${res.status}`)
              }

              const data = await res.json()

              if (data.success) {
                passed.value = true
                loading.value = false
              } else {
                error.value = '验证失败，请重试'
                loading.value = false
              }
            } catch (e) {
              console.error('验证请求错误:', e)
              if (e.name === 'AbortError') {
                error.value = '验证超时'
              } else {
                error.value = '网络请求失败'
              }
              loading.value = false
            } finally {
              isExecuting = false
            }
          },

          'error-callback': (errorCode) => {
            console.error('✗ Turnstile 错误:', errorCode)

            switch(errorCode) {
              case 300010:
                error.value = '网络连接失败'
                break
              case 400020:
                error.value = 'Site Key 配置错误'
                break
              case 400030:
                error.value = '验证超时'
                break
              case 500010:
                error.value = '服务暂时不可用'
                break
              default:
                error.value = `验证错误 (${errorCode})`
            }

            loading.value = false
            isExecuting = false
          },

          'timeout-callback': () => {
            error.value = '验证超时'
            loading.value = false
            isExecuting = false
          }
        }
    )

    console.log('✓ Turnstile widget 已渲染')

  } catch (e) {
    console.error('✗ 初始化失败:', e)
    error.value = e.message
    loading.value = false
    isExecuting = false
  }
}

// ✅ 手动重试
async function handleRetry() {
  if (retryCount.value >= MAX_RETRIES) {
    alert(`已达到最大重试次数 (${MAX_RETRIES})，请稍后再试`)
    return
  }

  retryCount.value++
  console.log(`重试第 ${retryCount.value} 次...`)

  // ✅ 先检查网络
  const networkStatus = await checkNetwork()
  console.log('网络状态:', networkStatus)

  if (!networkStatus.cloudflare) {
    error.value = '无法连接到 Cloudflare，请检查网络'
    return
  }

  await initTurnstile()
}

onMounted(async () => {
  console.log('开始初始化验证...')

  // ✅ 先检查网络
  const networkStatus = await checkNetwork()
  console.log('网络诊断结果:', networkStatus)

  await initTurnstile()
})

onUnmounted(() => {
  if (turnstileWidgetId && window.turnstile) {
    window.turnstile.remove(turnstileWidgetId)
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
    <div id="turnstile-container" class="turnstile-hidden"></div>

    <!-- 加载中 -->
    <div v-if="loading" class="status-box">
      <div class="spinner"></div>
      <p>安全检测中...</p>
      <p class="hint">请稍候，正在连接验证服务</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="status-box error">
      <div class="error-icon">⚠️</div>
      <h3>{{ error }}</h3>
      <p class="error-detail">已重试 {{ retryCount }} / {{ MAX_RETRIES }} 次</p>

      <button
          v-if="retryCount < MAX_RETRIES"
          @click="handleRetry"
          class="retry-btn"
      >
        重新尝试 ({{ retryCount }}/{{ MAX_RETRIES }})
      </button>

      <p v-else class="max-retry-hint">
        已达到最大重试次数<br>
        请检查网络连接或稍后再试
      </p>

      <div class="troubleshoot">
        <p>💡 排查建议：</p>
        <ul>
          <li>检查网络连接是否正常</li>
          <li>关闭 VPN 或代理后重试</li>
          <li>尝试刷新页面</li>
          <li>切换其他网络（如手机热点）</li>
        </ul>
      </div>
    </div>
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
  padding: 20px;
}

.status-box {
  text-align: center;
  max-width: 500px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255,255,255,0.1);
  border-left-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hint {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
}

/* 错误状态 */
.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 32px;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error h3 {
  color: #fca5a5;
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.error-detail {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin: 12px 0;
}

.retry-btn {
  margin-top: 16px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.retry-btn:active {
  transform: translateY(0);
}

.max-retry-hint {
  color: #fca5a5;
  margin-top: 16px;
  line-height: 1.6;
}

.troubleshoot {
  margin-top: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: left;
}

.troubleshoot p {
  margin: 0 0 8px;
  font-weight: 600;
  color: #fbbf24;
}

.troubleshoot ul {
  margin: 0;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  line-height: 1.8;
}

.turnstile-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
