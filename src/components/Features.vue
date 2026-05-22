<script setup>
import { onMounted } from 'vue'

const features = [
  {
    icon: 'tools',
    title: '白板优化 & 修复',
    desc: '一键下载优化工具和修复脚本，不用再记那堆下载地址。',
    wide: true
  },
  {
    icon: 'medical-bag',
    title: '急救工具',
    desc: '内置360急救箱，断网也能用。',
  },
  {
    icon: 'link-variant',
    title: '快捷入口',
    desc: '希沃官网、驱动下载，一键直达。',
  },
  {
    icon: 'folder-outline',
    title: '本地工具库',
    desc: '自己的工具放Tool目录，随取随用。',
    wide: true
  },
  {
    icon: 'language-python',
    title: 'PySide6 原生 GUI',
    desc: '启动快、体积小、不捆绑。',
  },
  {
    icon: 'shield-check-outline',
    title: '仅限内网友好',
    desc: '紧急时刻零依赖，直接跑。',
  },
]

const iconPaths = {
  'tools': 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
  'medical-bag': 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z',
  'link-variant': 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  'folder-outline': 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z',
  'language-python': 'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2zm-4.17-6c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z',
  'shield-check-outline': 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
}

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <div class="features__header reveal">
        <p class="section-label">// 功能</p>
        <h2 class="section-title">不用再假装你会看完那些 README 了</h2>
        <p class="section-desc">
          需要什么工具，SWABox 里找。下载链接记不住？没关系，它记住了。
        </p>
      </div>

      <div class="features__grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card reveal"
          :class="{ 'feature-card--wide': feature.wide }"
          :style="{ transitionDelay: `${index * 0.06}s` }"
        >
          <div class="feature-card__icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path :d="iconPaths[feature.icon]" />
            </svg>
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features__header {
  margin-bottom: 64px;
  max-width: 560px;
}

.section-title {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .section-title {
    white-space: normal;
    word-break: keep-all;
  }
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.feature-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 28px;
  transition: all 0.25s;
  grid-column: span 4;
}

.feature-card--wide {
  grid-column: span 8;
}

.feature-card:hover {
  border-color: var(--border-default);
  background: var(--bg-hover);
}

.feature-card__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--green-glow);
  border-radius: var(--radius-md);
  color: var(--green-primary);
  margin-bottom: 20px;
  transition: all 0.25s;
}

.feature-card:hover .feature-card__icon {
  background: var(--green-primary);
  color: #000;
}

.feature-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.feature-card__desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-card {
    grid-column: span 1;
  }

  .feature-card--wide {
    grid-column: span 2;
  }
}

@media (max-width: 640px) {
  .features__grid {
    grid-template-columns: 1fr;
  }

  .feature-card,
  .feature-card--wide {
    grid-column: span 1;
  }
}
</style>
