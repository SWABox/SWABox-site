<template>
  <div class="challenge-page">
    <!-- 背景光晕效果 -->
    <div class="orb orb1" />
    <div class="orb orb2" />
    
    <!-- 开发跳过按钮 - 仅开发环境显示 -->
    <button 
      v-if="isDevelopment"
      @click="handleSkip"
      class="dev-skip-btn"
    >
      <span class="dev-badge">开发模式</span>
      <span>⏭️ 跳过验证</span>
    </button>

    <div class="custom-ui">
      <div class="card">
        <!-- 自定义标题区域 -->
        <div class="header">
          <div class="shield-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" 
                    fill="url(#shield-gradient)" 
                    opacity="0.2"/>
              <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" 
                    stroke="url(#shield-gradient)" 
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M9 12L11 14L15 10" 
                    stroke="url(#shield-gradient)" 
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
              <defs>
                <linearGradient id="shield-gradient" x1="3" y1="2" x2="21" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#6366f1"/>
                  <stop offset="1" stop-color="#22d3ee"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1>安全验证</h1>
          <p class="subtitle">正在确认访问者身份</p>
        </div>

        <div class="body">
          <div class="description-box">
            <div class="security-icon">🔒</div>
            <p class="description">
              为保护网站免受自动化工具干扰，请完成下方人机验证
            </p>
          </div>

          <!-- Turnstile 小部件将在这里渲染 -->
          <div ref="widgetContainer" class="widget-area">
            <div v-if="!isLoaded" class="loading">
              <div class="spinner-ring"></div>
              <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>正在加载安全组件<span class="dots-animation">...</span></p>
            </div>
          </div>

          <!-- 自定义页脚与操作 -->
          <div class="footer">
            <p class="note">
              <span class="note-icon">🛡️</span>
              验证由 Cloudflare Turnstile 提供保护
            </p>
            <button
                @click="handleRefresh"
                :disabled="isRefreshing"
                class="btn-refresh"
            >
              <span v-if="isRefreshing" class="btn-spinner"></span>
              {{ isRefreshing ? '刷新中...' : '🔄 刷新验证' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['verified', 'error']);

// 🎯 从环境变量读取 sitekey
const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

// 🔧 开发模式检测
const isDevelopment = import.meta.env.DEV;

// 状态
const isLoaded = ref(false);
const isRefreshing = ref(false);
const widgetContainer = ref(null);
let widgetId = null;

// 渲染 Turnstile 小部件
function renderWidget() {
  // 检查环境变量是否已配置
  if (!sitekey) {
    console.error('❌ Turnstile Site Key 未配置。请设置 VITE_TURNSTILE_SITE_KEY 环境变量。');
    emit('error', '验证系统配置错误');
    return;
  }

  // 确保 Turnstile 库已加载
  if (!window.turnstile) {
    console.error('Turnstile 库未加载。');
    emit('error', '安全组件加载失败');
    return;
  }

  if (!widgetContainer.value) {
    return;
  }

  try {
    widgetId = window.turnstile.render(widgetContainer.value, {
      sitekey: sitekey,
      theme: 'auto',
      size: 'normal',
      callback: (token) => {
        emit('verified', token);
      },
      'error-callback': (errorCode) => {
        emit('error', `验证错误 (代码: ${errorCode})`);
      },
    });

    isLoaded.value = true;
  } catch (error) {
    console.error('渲染 Turnstile 小部件时出错:', error);
    emit('error', '验证组件初始化失败');
  }
}

// 手动刷新验证
function handleRefresh() {
  if (isRefreshing.value || !widgetId) return;
  isRefreshing.value = true;
  if (window.turnstile && window.turnstile.reset) {
    window.turnstile.reset(widgetId);
  }
  setTimeout(() => { isRefreshing.value = false; }, 800);
}

// ⏭️ 开发跳过功能
function handleSkip() {
  console.log('⏭️ 开发模式：跳过人机验证');
  // 生成一个假的 token 用于开发
  const fakeToken = 'dev-mode-fake-token-' + Date.now();
  emit('verified', fakeToken);
}

// 生命周期
onMounted(() => {
  // 等待 DOM 和脚本就绪
  const checkAndRender = () => {
    if (window.turnstile) {
      renderWidget();
    } else {
      setTimeout(checkAndRender, 100);
    }
  };
  setTimeout(checkAndRender, 200);
});

onUnmounted(() => {
  // 清理
  if (widgetId && window.turnstile && window.turnstile.remove) {
    window.turnstile.remove(widgetId);
  }
});
</script>

<style scoped>
.challenge-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #050508 0%, #080810 50%, #0a0a15 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 背景光晕 */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
  pointer-events: none;
  animation: pulse 8s ease-in-out infinite;
}
.orb1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%);
  top: -200px;
  left: -150px;
  animation-delay: 0s;
}
.orb2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%);
  bottom: -150px;
  right: -100px;
  animation-delay: -4s;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

/* 开发跳过按钮 */
.dev-skip-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(239,68,68,0.9), rgba(249,115,22,0.9));
  border: 2px solid rgba(255,255,255,0.2);
  padding: 12px 20px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 8px 32px rgba(239,68,68,0.4);
  animation: devPulse 2s ease-in-out infinite;
}
@keyframes devPulse {
  0%, 100% { box-shadow: 0 8px 32px rgba(239,68,68,0.4); }
  50% { box-shadow: 0 12px 48px rgba(239,68,68,0.6); }
}
.dev-skip-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 16px 48px rgba(239,68,68,0.5);
}
.dev-badge {
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.dev-skip-btn span:last-child {
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
}

.custom-ui {
  background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  backdrop-filter: blur(30px) saturate(1.8);
  -webkit-backdrop-filter: blur(30px) saturate(1.8);
  border-radius: 28px;
  padding: 3px;
  border: 1px solid rgba(99,102,241,0.2);
  box-shadow: 
    0 25px 80px rgba(0,0,0,0.5),
    0 0 60px rgba(99,102,241,0.1);
  animation: cardAppear 0.6s cubic-bezier(.22,1,.36,1);
}
@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card {
  background: linear-gradient(180deg, rgba(15,15,25,0.98), rgba(10,10,18,1));
  border-radius: 25px;
  padding: 48px 42px;
  width: 460px;
  max-width: 90vw;
  text-align: center;
  color: #e2e8f0;
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent));
  background-size: 200% 100%;
  animation: gradientBorder 3s ease infinite;
}
@keyframes gradientBorder {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.header {
  margin-bottom: 36px;
}
.shield-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  animation: shieldFloat 3s ease-in-out infinite;
}
.shield-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 8px 24px rgba(99,102,241,0.4));
}
@keyframes shieldFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
}
.header .subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 1.05rem;
  font-weight: 500;
}

.body {
  margin-bottom: 24px;
}
.description-box {
  background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(34,211,238,0.04));
  border: 1px solid rgba(99,102,241,0.15);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.description-box::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 60%);
  animation: rotate 10s linear infinite;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.security-icon {
  font-size: 2rem;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 12px rgba(99,102,241,0.3));
}
.description {
  color: #cbd5e1;
  margin: 0;
  line-height: 1.7;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.widget-area {
  min-height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(30,41,59,0.6), rgba(15,23,42,0.8));
  border-radius: 16px;
  border: 1px solid rgba(99,102,241,0.15);
  margin: 24px 0;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.widget-area::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(90deg, transparent, rgba(99,102,241,0.05), transparent),
    linear-gradient(0deg, transparent, rgba(99,102,241,0.05), transparent);
  background-size: 200% 100%, 100% 200%;
  animation: shimmer 2s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0, 0 -200%; }
  100% { background-position: 200% 0, 0 200%; }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  position: relative;
  z-index: 1;
}
.spinner-ring {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(99,102,241,0.1);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 30px rgba(99,102,241,0.3);
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.loading-dots {
  display: flex;
  gap: 6px;
}
.loading-dots span {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}
.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
  background: var(--accent2);
}
.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
  background: var(--accent-light);
}
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
.loading p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
}
.dots-animation {
  animation: dots 1.5s ease-in-out infinite;
}
@keyframes dots {
  0%, 20% { content: '.'; opacity: 0; }
  40% { content: '..'; opacity: 0.5; }
  60% { content: '...'; opacity: 1; }
  80%, 100% { content: '.'; opacity: 0; }
}

.footer {
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.note {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.note-icon {
  font-size: 1rem;
}
.btn-refresh {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-light));
  background-size: 200% 200%;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
  box-shadow: 
    0 8px 30px rgba(99,102,241,0.35),
    inset 0 1px 0 rgba(255,255,255,0.2);
  width: 100%;
  animation: gradientMove 4s ease infinite;
}
@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.btn-refresh:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 12px 40px rgba(99,102,241,0.5),
    inset 0 1px 0 rgba(255,255,255,0.3);
}
.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 520px) {
  .card {
    padding: 36px 28px;
  }
  .header h1 {
    font-size: 1.8rem;
  }
  .shield-icon {
    width: 64px;
    height: 64px;
  }
  .dev-skip-btn {
    top: 12px;
    right: 12px;
    padding: 10px 16px;
  }
}
</style>
