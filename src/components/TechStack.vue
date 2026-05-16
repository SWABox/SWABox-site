<script setup>
import { onMounted } from 'vue'

const stacks = [
  { label:'Python 3',       color:'#3776ab', bg:'rgba(55,118,171,.12)', icon:'🐍' },
  { label:'PySide6 (Qt6)',   color:'#41cd52', bg:'rgba(65,205,82,.10)',  icon:'🪟' },
  { label:'Logging',         color:'#f1c40f', bg:'rgba(241,196,15,.10)', icon:'📋' },
  { label:'Windows Only',    color:'#00adef', bg:'rgba(0,173,239,.10)',   icon:'🏁' },
]

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15 })
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})
</script>

<template>
  <section id="stack" class="section" style="border-top:1px solid var(--border)">
    <div class="container">
      <p class="section-title reveal">核心技术栈</p>
      <p class="section-sub reveal">桌面端原生性能 · 低开销 · 易二次修改</p>

      <div class="chips">
        <span v-for="(s,i) in stacks" :key="i"
              class="chip reveal"
              :style="{borderColor:s.color+'22',background:s.bg,transitionDelay:i*.08+'s'}">
          <span>{{ s.icon }}</span> {{ s.label }}
        </span>
      </div>

      <!-- 小提示卡片 -->
      <div class="note reveal">
        💡 项目处于快速迭代中 —— 日志系统、数据库迁移、EXE 打包与镜像站计划均在 Roadmap 内。
      </div>
    </div>
  </section>
</template>

<style scoped>
.chips { display:flex; flex-wrap:wrap; gap:12px; }
.chip {
  display:inline-flex; align-items:center; gap:7px;
  padding: 9px 18px; border-radius:999px;
  border: 1px solid rgba(255,255,255,.08);
  font-size:.88rem; font-weight:600; color:#eee;
}
.note {
  margin-top:28px;
  background:rgba(99,102,241,.06); border:1px solid rgba(99,102,241,.12);
  border-radius:var(--radius); padding:16px 20px;
  font-size:.84rem; color:var(--text-dim); line-height:1.6;
}
</style>
