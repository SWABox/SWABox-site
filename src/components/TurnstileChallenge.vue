<template>
  <div class="challenge-page">
    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-header">
          <div class="shield-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" fill="rgba(34, 197, 94, 0.15)" stroke="var(--green-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="var(--green-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1>安全验证</h1>
          <p class="subtitle">正在确认您的访问</p>
        </div>

        <div class="challenge-body">
          <div class="info-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            <p>请完成下方的人机验证以继续访问</p>
          </div>

          <div ref="widgetContainer" class="widget-area">
            <div v-if="!isLoaded" class="loading-state">
              <div class="spinner"></div>
              <p>加载中<span class="dots">...</span></p>
            </div>
          </div>

          <div class="action-area">
            <p class="provider-note">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              由 Cloudflare Turnstile 提供保护
            </p>
            <button @click="handleRefresh" :disabled="isRefreshing" class="refresh-btn">
              <div v-if="isRefreshing" class="btn-spinner"></div>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
              </svg>
              {{ isRefreshing ? '刷新中' : '刷新验证' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['verified', 'error'])

const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY

const isLoaded = ref(false)
const isRefreshing = ref(false)
const widgetContainer = ref(null)
let widgetId = null

function checkDomainConfiguration() {
  console.log('=== Turnstile 域名诊断 ===')
  console.log('当前域名:', window.location.hostname)
  console.log('完整 URL:', window.location.href)
  console.log('Site Key:', sitekey)
  
  const commonDomains = ['swabox.cc.cd', 'localhost', '127.0.0.1']
  const isKnownDomain = commonDomains.some(domain => window.location.hostname.includes(domain))
  
  if (!isKnownDomain) {
    console.warn('⚠️ 检测到新域名，请确保在 Cloudflare Turnstile 控制台中添加此域名')
    console.warn('📋 需要添加的域名:', window.location.hostname)
  } else {
    console.log('✅ 域名在已知列表中')
  }
  
  return isKnownDomain
}

function renderWidget() {
  if (!sitekey) {
    console.error('Turnstile Site Key 未配置')
    emit('error', '验证系统配置错误')
    return
  }

  if (!window.turnstile) {
    console.error('Turnstile 库未加载')
    emit('error', '安全组件加载失败')
    return
  }

  if (!widgetContainer.value) {
    return
  }

  try {
    const currentDomain = window.location.hostname
    console.log('当前域名:', currentDomain)
    
    widgetId = window.turnstile.render(widgetContainer.value, {
      sitekey: sitekey,
      theme: 'dark',
      size: 'normal',
      callback: (token) => {
        console.log('Turnstile 验证成功')
        emit('verified', token)
      },
      'error-callback': (errorCode) => {
        console.error('Turnstile 验证错误:', errorCode)
        emit('error', `验证错误 (代码: ${errorCode})`)
      },
      'expired-callback': () => {
        console.warn('Turnstile 验证已过期')
        emit('error', '验证已过期，请重新验证')
      },
      'timeout-callback': () => {
        console.warn('Turnstile 验证超时')
        emit('error', '验证超时，请重试')
      },
    })

    isLoaded.value = true
  } catch (error) {
    console.error('渲染 Turnstile 小部件时出错:', error)
    emit('error', '验证组件初始化失败')
  }
}

function handleRefresh() {
  if (isRefreshing.value || !widgetId) return
  isRefreshing.value = true
  if (window.turnstile && window.turnstile.reset) {
    window.turnstile.reset(widgetId)
  }
  setTimeout(() => { isRefreshing.value = false }, 800)
}

onMounted(() => {
  checkDomainConfiguration()
  
  const checkAndRender = () => {
    if (window.turnstile) {
      renderWidget()
    } else {
      setTimeout(checkAndRender, 100)
    }
  }
  
  if (window.turnstile) {
    renderWidget()
  } else {
    setTimeout(checkAndRender, 200)
  }
})

onUnmounted(() => {
  if (widgetId && window.turnstile && window.turnstile.remove) {
    try {
      window.turnstile.remove(widgetId)
    } catch (error) {
      console.warn('清理 Turnstile 小部件时出错:', error)
    }
  }
})
</script>

<style scoped>
.challenge-page {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
  padding: 20px;
  position: relative;
}

.challenge-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(ellipse 100% 80% at 20% 0%, rgba(34, 197, 94, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse 80% 60% at 80% 100%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
}

.challenge-page::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.challenge-container {
  width: 100%;
  max-width: 420px;
}

.challenge-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
}

.challenge-header {
  text-align: center;
  margin-bottom: 32px;
}

.shield-icon {
  width: 64px;
  height: 64px;
  margin: -8px auto 16px;
}

.shield-icon svg {
  width: 100%;
  height: 100%;
}

.challenge-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
}

.info-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--bg-hover);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-bottom: 24px;
}

.info-box svg {
  color: var(--green-primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.info-box p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.widget-area {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 16px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-subtle);
  border-top-color: var(--green-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-family: var(--font-mono);
}

.dots::after {
  content: '';
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}

.action-area {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.provider-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.provider-note svg {
  flex-shrink: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
  padding: 10px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  flex-shrink: 0;
}

.refresh-btn:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--green-primary);
  color: var(--green-primary);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-subtle);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 480px) {
  .challenge-card {
    padding: 28px 20px;
  }

  .action-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>