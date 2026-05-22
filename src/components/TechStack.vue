<script setup>
import { onMounted } from 'vue'

const stacks = [
  { label: 'Python 3', color: '#3776ab', bg: 'rgba(55, 118, 171, 0.1)', icon: '🐍' },
  { label: 'PySide6 (Qt6)', color: '#41cd52', bg: 'rgba(65, 205, 82, 0.08)', icon: '🪟' },
  { label: 'Logging', color: '#f1c40f', bg: 'rgba(241, 196, 15, 0.08)', icon: '📋' },
  { label: 'Windows Only', color: '#00a4ef', bg: 'rgba(0, 164, 239, 0.08)', icon: '🏁' },
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
  <section id="stack" class="section" style="border-top: 1px solid var(--border-subtle);">
    <div class="container">
      <div class="section__header reveal">
        <p class="section-title">核心技术栈</p>
        <p class="section-sub">桌面端原生性能 · 低开销 · 易二次修改</p>
      </div>

      <div class="tech-chips">
        <span
          v-for="(stack, index) in stacks"
          :key="index"
          class="tech-chip reveal"
          :style="{
            borderColor: stack.color + '30',
            background: stack.bg,
            transitionDelay: `${index * 0.1}s`
          }"
        >
          <span class="tech-chip__icon">{{ stack.icon }}</span>
          <span class="tech-chip__label">{{ stack.label }}</span>
        </span>
      </div>

      <div class="tech-note reveal">
        <span class="tech-note__icon">💡</span>
        <p>项目处于快速迭代中 —— 日志系统、数据库迁移、EXE 打包与镜像站计划均在 Roadmap 内。</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section__header {
  margin-bottom: 48px;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  backdrop-filter: blur(12px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.tech-chip:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-md);
}

.tech-chip__icon {
  font-size: 1.2rem;
}

.tech-chip__label {
  position: relative;
  z-index: 1;
}

.tech-note {
  margin-top: 48px;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.tech-note__icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.tech-note p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 640px) {
  .tech-chips {
    flex-direction: column;
  }

  .tech-chip {
    width: 100%;
    justify-content: center;
  }
}
</style>
