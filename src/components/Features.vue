<script setup>
import { onMounted } from 'vue'

const features = [
  {
    icon: '🔧',
    title: '白板优化 & 修复',
    desc: '一键获取优化工具与修复脚本，缩短排障链路'
  },
  {
    icon: '🆘',
    title: '内置急救工具',
    desc: '本地集成 360 急救箱等应急方案，断网也能救场'
  },
  {
    icon: '🚀',
    title: '常用软件快捷入口',
    desc: '直链希沃官网等站点，下载驱动/镜像不再迷路'
  },
  {
    icon: '🗂️',
    title: '维护文件集中管理',
    desc: '工具箱即「移动仓库」——分类清晰、随取随用'
  },
  {
    icon: '🖥️',
    title: '原生 Windows 体验',
    desc: 'PySide6 原生 GUI，启动快、体积小、不花哨'
  },
  {
    icon: '🔒',
    title: '仅限内网友好',
    desc: '关键资产可放本地 Tool 目录，紧急时刻零依赖启动'
  },
]

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
      }
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <div class="section__header reveal">
        <p class="section-title">为什么选 <span class="glow">SWA Box</span></p>
        <p class="section-sub">不是又一个「全家桶」，而是电教委真实工作流的压缩器。</p>
      </div>

      <div class="features">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card reveal"
          :style="{ transitionDelay: `${index * 0.08}s` }"
        >
          <div class="feature-card__icon">{{ feature.icon }}</div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section__header {
  margin-bottom: 56px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.feature-card {
  background: var(--glass-1);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(6, 182, 212, 0.04));
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.feature-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), var(--cyan-primary), var(--accent-light));
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  border-color: rgba(124, 58, 237, 0.2);
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-lg), 0 0 40px rgba(124, 58, 237, 0.1);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.feature-card__icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-card__icon {
  transform: scale(1.15) rotate(3deg);
  filter: drop-shadow(0 6px 20px rgba(124, 58, 237, 0.4));
}

.feature-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-bright);
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.feature-card__desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
