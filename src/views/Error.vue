<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const errorData = computed(() => {
  const code = route.params.code || '404';
  const errors = {
    '403': {
      title: '禁止访问',
      subtitle: '权限验证失败\n你没有访问此页面的权限',
      color: '#f97316'
    },
    '404': {
      title: '页面迷路了',
      subtitle: '你访问的地址不存在\n可能被色彩侵蚀了',
      color: '#0078d7'
    },
    '500': {
      title: '服务器出错了',
      subtitle: '服务器内部发生错误\n我们正在紧急修复中',
      color: '#dc2626'
    },
    '502': {
      title: '网关错误',
      subtitle: '服务器暂时无法响应\n请稍后再试',
      color: '#7c3aed'
    },
    '503': {
      title: '服务不可用',
      subtitle: '服务暂时不可用\n请稍后再试',
      color: '#f59e0b'
    }
  };
  return errors[code] || errors['404'];
});
</script>

<template>
  <div class="error-page">
    <div class="content">
      <div class="logo-link">
        <img src="/logo-nobg.png" alt="SWABox Logo" class="logo-img">
      </div>

      <div class="icon-wrapper">
        <svg class="error-icon" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="var(--green-primary)" stroke-width="4" opacity="0.1"/>
          <circle cx="50" cy="50" r="25" stroke="var(--green-primary)" stroke-width="4" opacity="0.2"/>
          <text x="50" y="60" text-anchor="middle" font-size="32" font-weight="900" fill="var(--text-dim)">?</text>
        </svg>
        <span class="status-code">{{ route.params.code || '404' }}</span>
      </div>

      <h1 class="title">{{ errorData.title }}</h1>
      <p class="subtitle">{{ errorData.subtitle }}</p>

      <div class="actions">
        <button class="btn btn-primary" @click="router.push('/')">返回首页</button>
        <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="btn btn-secondary">
          查看项目仓库
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  background: var(--bg-base);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  color: var(--text-primary);
}

.error-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 100% 80% at 20% 0%, rgba(34, 197, 94, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse 80% 60% at 80% 100%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
}

.error-page::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
  max-width: 800px;
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-link {
  display: inline-block;
  margin-bottom: 40px;
  cursor: pointer;
}

.logo-img {
  height: 56px;
  width: auto;
  opacity: 0.9;
  transition: opacity 0.3s;
}

.logo-img:hover {
  opacity: 1;
}

.icon-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 32px;
}

.error-icon {
  width: 100%;
  height: 100%;
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.status-code {
  position: absolute;
  bottom: -12px;
  right: -24px;
  font-size: 52px;
  font-weight: 900;
  color: rgba(34, 197, 94, 0.15);
  font-family: var(--font-mono);
}

.title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 18px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 17px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 48px;
  white-space: pre-line;
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--green-primary);
  color: #000;
}

.btn-primary:hover {
  background: var(--green-light);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--green-primary);
  color: var(--green-primary);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .title { font-size: 32px; }
  .subtitle { font-size: 15px; }
  .icon-wrapper { width: 140px; height: 140px; }
  .status-code { font-size: 42px; }
}

@media (max-width: 480px) {
  .actions { flex-direction: column; }
  .btn { width: 100%; }
}
</style>
