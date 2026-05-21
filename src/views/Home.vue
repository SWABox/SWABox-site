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

// ✅ Worker 验证服务器 URL - 使用完整的 HTTPS URL
const VERIFY_SERVER_URL = 'https://turnstile-verify.liyunhan11111.workers.dev/verify'

// ✅ 网络诊断函数
async function checkNetwork() {
  const checks = {
    cloudflare: false,
    worker: false
  }

  try {
    await fetch('https://challenges.cloudflare.com/', {
      method: 'HEAD',
      mode: 'no-cors'
    })
    checks.cloudflare = true
    console.log('✓ Cloudflare 可达')
  } catch (e) {
    console.warn('✗ Cloudflare 连接失败:', e.message)
  }

  try {
    // ✅ 使用完整 URL 测试 Worker 服务
    await fetch(VERIFY_SERVER_URL, {
      method: 'OPTIONS',
      mode: 'cors'
    })
    checks.worker = true
    console.log('✓ Worker 服务可达')
  } catch (e) {
    console.warn('✗ Worker 服务连接失败:', e.message)
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
          retry: 'never',
          theme: 'light',

          callback: async (token) => {
            console.log('✓ Turnstile 验证成功，获得 token')

            if (!token) {
              error.value = '验证返回空令牌'
              loading.value = false
              isExecuting = false
              return
            }

            try {
              console.log('正在发送验证请求到:', VERIFY_SERVER_URL)

              // ✅ 发送验证请求 - 使用完整的 URL
              const controller = new AbortController()
              const timeoutId = setTimeout(() => controller.abort(), 15000)

              const res = await fetch(
                  VERIFY_SERVER_URL,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                      token,
                      timestamp: Date.now()
                    }),
                    signal: controller.signal,
                    mode: 'cors',
                    credentials: 'omit'
                  }
              )

              clearTimeout(timeoutId)

              console.log('服务器响应状态:', res.status)

              if (!res.ok) {
                throw new Error(`服务器错误: ${res.status} ${res.statusText}`)
              }

              const data = await res.json()
              console.log('服务器响应数据:', data)

              if (data.success) {
                passed.value = true
                loading.value = false
              } else {
                error.value = '验证失败，请重试'
                loading.value = false
              }
            } catch (e) {
              console.error('验证请求错误:', e)
              console.error('错误详情:', {
                name: e.name,
                message: e.message
              })

              if (e.name === 'AbortError') {
                error.value = '验证超时'
              } else if (e.message.includes('405')) {
                error.value = '服务器配置错误 (405)'
              } else if (e.message.includes('Failed to fetch')) {
                error.value = '网络连接失败'
              } else {
                error.value = '请求失败: ' + e.message
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
  console.log('验证服务器 URL:', VERIFY_SERVER_URL)

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
