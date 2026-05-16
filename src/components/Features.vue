<script setup>
import { onMounted } from 'vue'

const items = [
  { icon: '🔧',  title: '白板优化 & 修复',    desc:'一键获取优化工具与修复脚本，缩短排障链路' },
  { icon: '🆘',  title: '内置急救工具',        desc:'本地集成 360 急救箱等应急方案，断网也能救场' },
  { icon: '🚀',  title: '常用软件快捷入口',    desc:'直链希沃官网等站点，下载驱动/镜像不再迷路' },
  { icon: '🗂️', title: '维护文件集中管理',    desc:'工具箱即"移动仓库"——分类清晰、随取随用' },
  { icon: '🖥️', title: '原生 Windows 体验',   desc:'PySide6 原生 GUI，启动快、体积小、不花哨' },
  { icon: '🔒', title: '仅限内网友好',        desc:'关键资产可放本地 Tool 目录，紧急时刻零依赖启动' },
]

onMounted(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.15 })
  document.querySelectorAll('.reveal').forEach(el => io.observe(el))
})
</script>

<template>
  <section id="features" class="section">
    <div class="container">
      <p class="section-title reveal">为什么选 <span class="glow">SWA Box</span></p>
      <p class="section-sub reveal">不是又一个"全家桶"，而是电教委真实工作流的压缩器。</p>

      <div class="grid">
        <div v-for="(it,i) in items" :key="i"
             class="card reveal" :style="{transitionDelay:i*.07+'s'}">
          <span class="card-icon">{{ it.icon }}</span>
          <h3>{{ it.title }}</h3>
          <p>{{ it.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
  gap: 18px;
}
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px 22px;
  transition: .25s;
}
.card:hover {
  border-color: rgba(99,102,241,.25);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,.25);
}
.card-icon { font-size:1.6rem; display:block; margin-bottom:10px; }
.card h3 { font-size:.98rem; font-weight:650; margin-bottom:6px; color:#f0f0ff; }
.card p  { font-size:.85rem; color:var(--text-dim); line-height:1.65; }
</style>
