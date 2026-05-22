<script setup>
import { onMounted } from 'vue'

const stacks = [
  { label: 'Python 3', desc: '核心语言' },
  { label: 'PySide6', desc: 'GUI 框架' },
  { label: 'Logging', desc: '日志系统' },
  { label: 'Windows', desc: '目标平台' },
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
      <div class="stack__header reveal">
        <p class="section-label">// 技术栈</p>
        <h2 class="section-title">桌面端原生性能</h2>
        <p class="section-desc">
          低开销、易修改。不需要 Electron，不需要 Node.js。
        </p>
      </div>

      <div class="stack__grid">
        <div
          v-for="(stack, index) in stacks"
          :key="index"
          class="stack-card reveal"
          :style="{ transitionDelay: `${index * 0.08}s` }"
        >
          <span class="stack-card__label">{{ stack.label }}</span>
          <span class="stack-card__desc">{{ stack.desc }}</span>
        </div>
      </div>

      <div class="stack__roadmap reveal">
        <p class="stack__roadmap-label">Roadmap</p>
        <ul class="stack__roadmap-list">
          <li>日志系统生成</li>
          <li>数据库迁移</li>
          <li>EXE 打包</li>
          <li>镜像站（资金允许的话）</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack__header {
  margin-bottom: 48px;
}

.stack__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stack-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s;
}

.stack-card:hover {
  border-color: var(--green-primary);
  background: var(--bg-hover);
}

.stack-card__label {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.stack-card__desc {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.stack__roadmap {
  margin-top: 48px;
  padding: 24px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
}

.stack__roadmap-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.stack__roadmap-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.stack__roadmap-list li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  position: relative;
  padding-left: 16px;
}

.stack__roadmap-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--green-primary);
  font-family: var(--font-mono);
}

@media (max-width: 768px) {
  .stack__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stack__grid {
    grid-template-columns: 1fr;
  }
}
</style>
