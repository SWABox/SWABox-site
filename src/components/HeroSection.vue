<script setup>
function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <!-- 背景光斑 -->
    <div class="orb orb1" />
    <div class="orb orb2" />

    <div class="container hero-content">
      <p class="badge">⚡ 专为电教委 · 智慧白板管理</p>

      <h1>
        让白板优化工具获取<br />
        <span class="glow">快得像呼吸一样自然</span>
      </h1>

      <p class="hero-desc">
        SWABox 是一款 Windows桌面工具箱，集白板优化、修复、急救工具下载与常用软件入口于一身——
        给电教委一套「一键直达」的工作流。
      </p>

      <div class="cta-group">
        <a href="#download" class="btn-primary" @click.prevent="scrollTo('#download')">
          <svg class="wicon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          下载 Windows 版
        </a>

        <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="btn-ghost">
          ⭐ 在 GitHub 查看源码
        </a>
      </div>

      <p class="only-win">仅支持 Windows 10 / 11</p>
    </div>

    <!-- 向下指示箭头 -->
    <div class="scroll-hint" @click.prevent="scrollTo('#features')">
      <span />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative; overflow:hidden;
  min-height: 100svh; display:flex; align-items:center;
  padding-top: var(--nav-h);
}
/* 光斑 */
.orb {
  position:absolute; border-radius:50%; filter:blur(90px); opacity:.35; pointer-events:none;
  animation: drift 12s ease-in-out infinite alternate;
}
.orb1 { width:460px;height:460px;background:var(--accent);top:-120px;left:-80px; }
.orb2 { width:380px;height:380px;background:var(--accent2);bottom:-100px;right:-60px;animation-delay:-6s }
@keyframes drift { to { transform: translate(40px,30px) scale(1.08) } }

.hero-content { position:relative; z-index:2; padding: 60px 0 40px; }

.badge {
  display:inline-block;
  background: rgba(99,102,241,.12); color:var(--accent);
  padding: 4px 14px; border-radius:999px; font-size:.78rem; font-weight:600;
  letter-spacing:.04em; margin-bottom:20px;
  border:1px solid rgba(99,102,241,.18);
}
h1 { font-size: clamp(2.4rem, 6vw, 4rem); font-weight:800; line-height:1.15;
  letter-spacing:-.03em; color:#f5f5ff; }
.hero-desc { margin-top:20px; color:var(--text-dim); max-width:540px; font-size:.98rem; }

.cta-group { margin-top:32px; display:flex; flex-wrap:wrap; gap:14px; align-items:center; }
.btn-primary {
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;
  padding:13px 26px;border-radius:12px;font-weight:600;font-size:.95rem;
  box-shadow:0 6px 24px rgba(99,102,241,.35);
  transition:transform .18s,box-shadow .18s;
}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(99,102,241,.45)}
.wicon{width:18px;height:18px}

.btn-ghost {
  padding:13px 22px;border-radius:12px;font-size:.92rem;font-weight:500;
  border:1px solid var(--border);color:var(--text-dim);
  transition:.2s;
}
.btn-ghost:hover{color:#fff;border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.04)}

.only-win { margin-top:16px; font-size:.76rem; color:var(--text-dim); opacity:.6; }

.scroll-hint {
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  cursor:pointer;
}
.scroll-hint span {
  display:block; width:20px;height:32px;border:2px solid rgba(255,255,255,.18);border-radius:999px;position:relative;
}
.scroll-hint span::after{
  content:'';position:absolute;top:6px;left:50%;transform:translateX(-50%);
  width:4px;height:8px;border-radius:4px;background:rgba(255,255,255,.35);
  animation:bounce 1.8s infinite;
}
@keyframes bounce {
  0%,100%{top:6px;opacity:1} 50%{top:14px;opacity:.3}
}

@media(max-width:560px){ h1 br{display:none} }
</style>
