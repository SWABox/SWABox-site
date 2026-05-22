<template>
  <div class="challenge-page">
    <div class="custom-ui">
      <div class="card">
        <!-- 自定义标题区域 -->
        <div class="header">
          <div class="icon">🛡️</div>
          <h1>SWABox 安全验证</h1>
          <p class="subtitle">我们正在确认访问者身份</p>
        </div>

        <div class="body">
          <p class="description">
            为了保护网站免受自动化工具干扰，请完成下方的人机验证。
          </p>

          <!-- Turnstile 小部件将在这里渲染 -->
          <div ref="widgetContainer" class="widget-area">
            <div v-if="!isLoaded" class="loading">
              <div class="spinner"></div>
              <p>正在加载安全组件...</p>
            </div>
          </div>

          <!-- 自定义页脚与操作 -->
          <div class="footer">
            <p class="note">
              验证由 Cloudflare 提供保护。这通常只需几秒钟。
            </p>
            <button
                @click="handleRefresh"
                :disabled="isRefreshing"
                class="btn-refresh"
            >
              {{ isRefreshing ? '刷新中...' : '🔄 刷新验证' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from 'vue';

const emit = defineEmits(['verified', 'error']);

// 🎯 从环境变量读取 sitekey
const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 20px;
}

.custom-ui {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card {
  background: #1e293b;
  border-radius: 18px;
  padding: 40px 35px;
  width: 400px;
  max-width: 90vw;
  text-align: center;
  color: #e2e8f0;
}

.header {
  margin-bottom: 30px;
}
.header .icon {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.9;
}
.header h1 {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8fafc;
}
.header .subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 0.95rem;
}

.body {
  margin-bottom: 20px;
}
.description {
  color: #cbd5e1;
  margin-bottom: 25px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.widget-area {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 20px 0;
  padding: 15px;
  position: relative;
}
.loading {
  padding: 20px;
  color: #94a3b8;
}
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

.footer {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.note {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 15px;
}
.btn-refresh {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}
.btn-refresh:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}
.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
