<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const particles = ref([]);
const initParticles = () => {
  particles.value = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5
  }));
};

onMounted(initParticles);

const errorData = computed(() => {
  const code = route.params.code || '404';
  const errors = {
    '403': {
      title: '禁止访问',
      subtitle: '权限验证失败\n你没有访问此页面的权限',
      color: '#f97316',
      icon: 'mdi:shield-lock-outline'
    },
    '404': {
      title: '页面迷路了',
      subtitle: '你访问的地址不存在\n可能被色彩侵蚀了',
      color: '#0078d7',
      icon: 'mdi:map-marker-question-outline'
    },
    '500': {
      title: '服务器出错了',
      subtitle: '服务器内部发生错误\n我们正在紧急修复中',
      color: '#dc2626',
      icon: 'mdi:server-network-off'
    },
    '502': {
      title: '网关错误',
      subtitle: '服务器暂时无法响应\n请稍后再试',
      color: '#7c3aed',
      icon: 'mdi:server-network'
    },
    '503': {
      title: '服务不可用',
      subtitle: '服务暂时不可用\n请稍后再试',
      color: '#f59e0b',
      icon: 'mdi:cloud-off-outline'
    }
  };
  return errors[code] || errors['404'];
});
</script>

<template>
  <div class="error-page">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
    
    <div class="particles">
      <div 
        v-for="p in particles" 
        :key="p.id" 
        class="particle"
        :style="{
          '--size': p.size + 'px',
          '--x': p.x + '%',
          '--y': p.y + '%',
          '--duration': p.duration + 's',
          '--delay': p.delay + 's'
        }"
      ></div>
    </div>

    <div class="content">
      <div class="logo-link" @click="router.push('/')">
        <img src="/logo-nobg.png" alt="SWABox Logo" class="logo-img">
      </div>

      <div class="icon-wrapper">
        <div class="icon-ring icon-ring-outer" :style="{ borderColor: errorData.color }"></div>
        <div class="icon-ring icon-ring-middle" :style="{ borderColor: errorData.color }"></div>
        <div class="icon-inner" :style="{ background: `linear-gradient(135deg, ${errorData.color}15, ${errorData.color}30)` }">
          <span class="iconify error-icon" :data-icon="errorData.icon" :data-inline="false" :style="{ color: errorData.color }"></span>
        </div>
        <span class="status-code">{{ route.params.code || '404' }}</span>
      </div>

      <h1 class="title">{{ errorData.title }}</h1>
      <p class="subtitle">{{ errorData.subtitle }}</p>

      <div class="actions">
        <button class="btn btn-primary" @click="router.push('/')">
          <span class="iconify" data-icon="mdi:home-outline" data-inline="false"></span>
          返回首页
        </button>
        <a href="https://github.com/liyunhan177/SWABox" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <span class="iconify" data-icon="mdi:github" data-inline="false"></span>
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

.gradient-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  z-index: 0;
  animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
  top: -100px;
  left: -100px;
}

.orb-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(0, 120, 215, 0.25) 0%, transparent 70%);
  bottom: -80px;
  right: -80px;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(30px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  75% {
    transform: translate(-30px, -20px) scale(1.02);
  }
}

.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  left: var(--x);
  top: var(--y);
  background: var(--green-primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: particleFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(30px, -40px) scale(1.5);
    opacity: 0.5;
  }
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
  max-width: 800px;
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-link {
  display: inline-block;
  margin-bottom: 48px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
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
  width: 200px;
  height: 200px;
  margin: 0 auto 40px;
}

.icon-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  opacity: 0.2;
}

.icon-ring-outer {
  inset: 0;
  animation: ringPulse 3s ease-in-out infinite;
}

.icon-ring-middle {
  inset: 15px;
  animation: ringPulse 3s ease-in-out infinite;
  animation-delay: 0.5s;
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
}

.icon-inner {
  position: absolute;
  inset: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: iconFloat 4s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.error-icon {
  font-size: 56px;
}

.status-code {
  position: absolute;
  bottom: -8px;
  right: -20px;
  font-size: 56px;
  font-weight: 900;
  color: rgba(34, 197, 94, 0.12);
  font-family: var(--font-mono);
  letter-spacing: -0.05em;
}

.title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  animation: titleSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.1s;
}

@keyframes titleSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  font-size: 18px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 48px;
  white-space: pre-line;
  animation: subtitleSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.2s;
}

@keyframes subtitleSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  animation: actionsSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.3s;
}

@keyframes actionsSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn {
  padding: 14px 32px;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn .iconify {
  font-size: 20px;
}

.btn-primary {
  background: var(--green-primary);
  color: #000;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
}

.btn-primary:hover {
  background: var(--green-light);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(34, 197, 94, 0.4);
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
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .title { font-size: 32px; }
  .subtitle { font-size: 16px; }
  .icon-wrapper { width: 160px; height: 160px; }
  .status-code { font-size: 44px; }
  .error-icon { font-size: 44px; }
  .icon-inner { inset: 30px; }
  .gradient-orb { opacity: 0.25; }
}

@media (max-width: 480px) {
  .actions { flex-direction: column; }
  .btn { width: 100%; justify-content: center; }
}
</style>