<script setup>
import { ref, onMounted, computed } from 'vue'

const titleText = ref('')
const fullTitle = '编程语言是用来思考的'
const isTyping = ref(true)

const titlePart1 = computed(() => {
  return titleText.value.slice(0, 7)
})

const titlePart2 = computed(() => {
  return titleText.value.slice(7, 9)
})

const titlePart3 = computed(() => {
  return titleText.value.slice(9)
})

onMounted(() => {
  let index = 0
  const typeInterval = setInterval(() => {
    if (index < fullTitle.length) {
      titleText.value += fullTitle.charAt(index)
      index++
    } else {
      clearInterval(typeInterval)
      isTyping.value = false
    }
  }, 80)
})

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__main">
        <p class="hero__label">// 专为电教委</p>

        <h1 class="hero__title">
          <span class="title-typed">
            {{ titlePart1 }}
            <span class="green-text">{{ titlePart2 }}</span>
            {{ titlePart3 }}
          </span>
          <span class="cursor" :class="{ 'cursor-blink': !isTyping }">_</span>
        </h1>

        <p class="hero__subtitle">
          SWABox 也是。
        </p>

        <p class="hero__desc">
          不想在10个网页里找白板工具？不想记一堆下载链接？
          <br>
          一个文件夹，一个工具箱，按一下就到。
        </p>

        <div class="hero__actions">
          <button class="btn btn--primary" @click.prevent="scrollTo('#download')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            下载 Windows 版
          </button>

          <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="btn btn--ghost">
            查看源码
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        <div class="hero__meta">
          <span class="hero__platform">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#f25022"/>
              <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7fba00"/>
              <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00a4ef"/>
              <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#ffb900"/>
            </svg>
            Windows 10 / 11
          </span>
          <span class="hero__sep">·</span>
          <span class="hero__license">MIT License</span>
        </div>
      </div>

      <div class="hero__aside">
        <div class="hero__terminal">
          <div class="terminal__header">
            <span class="terminal__dot terminal__dot--red"></span>
            <span class="terminal__dot terminal__dot--yellow"></span>
            <span class="terminal__dot terminal__dot--green"></span>
            <span class="terminal__title">swabox.exe</span>
          </div>
          <div class="terminal__body">
            <p class="terminal__line"><span class="terminal__prompt">$</span> 运行 SWABox</p>
            <p class="terminal__line terminal__line--output">初始化工具目录...</p>
            <p class="terminal__line terminal__line--output">加载白板优化工具: <span class="green-text">完成</span></p>
            <p class="terminal__line terminal__line--output">加载修复工具: <span class="green-text">完成</span></p>
            <p class="terminal__line terminal__line--output">加载急救工具: <span class="green-text">完成</span></p>
            <p class="terminal__line terminal__line--muted">---</p>
            <p class="terminal__line terminal__line--output">已就绪。按需求选择工具。</p>
            <p class="terminal__line"><span class="terminal__prompt">$</span> <span class="terminal__cursor"></span></p>
          </div>
        </div>

        <div class="hero__stat">
          <div class="stat">
            <span class="stat__value">Python</span>
            <span class="stat__label">PySide6</span>
          </div>
          <div class="stat">
            <span class="stat__value">&lt;1.5GB</span>
            <span class="stat__label">安装体积</span>
          </div>
          <div class="stat">
            <span class="stat__value">MIT</span>
            <span class="stat__label">开源协议</span>
          </div>
        </div>
      </div>
    </div>

    <div class="hero__scroll" @click.prevent="scrollTo('#features')">
      <span class="hero__scroll-text">往下看</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: var(--nav-height);
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 60px 0;
}

.hero__main {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero__label {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 20px;
  letter-spacing: 0.02em;
}

.hero__title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
}

.title-typed {
  display: inline;
}

.cursor {
  color: var(--green-primary);
  font-weight: 700;
  font-size: inherit;
  line-height: 1;
}

.cursor-blink {
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero__subtitle {
  font-family: var(--font-mono);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 28px;
}

.hero__desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 480px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 40px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--primary {
  background: var(--green-primary);
  color: #000;
}

.btn--primary:hover {
  background: var(--green-light);
  transform: translateY(-2px);
}

.btn--ghost {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}

.btn--ghost:hover {
  background: var(--bg-hover);
  border-color: var(--green-primary);
}

.hero__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.hero__platform {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero__sep {
  opacity: 0.4;
}

.hero__aside {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.hero__terminal {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.terminal__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

.terminal__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal__dot--red { background: #ff5f57; }
.terminal__dot--yellow { background: #febc2e; }
.terminal__dot--green { background: #28c840; }

.terminal__title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-left: 8px;
}

.terminal__body {
  padding: 20px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.8;
}

.terminal__line {
  margin: 0;
  color: var(--text-secondary);
}

.terminal__line--output {
  padding-left: 16px;
}

.terminal__line--muted {
  color: var(--text-dim);
}

.terminal__prompt {
  color: var(--green-primary);
  margin-right: 12px;
}

.terminal__cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: var(--green-primary);
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero__stat {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.stat {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 16px;
  text-align: center;
}

.stat__value {
  display: block;
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat__label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-dim);
  cursor: pointer;
  transition: color 0.2s;
}

.hero__scroll:hover {
  color: var(--text-muted);
}

.hero__scroll-text {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero__aside {
    order: -1;
  }

  .hero__terminal {
    max-width: 480px;
  }
}

@media (max-width: 640px) {
  .hero__title {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .hero__actions {
    flex-direction: column;
  }

  .btn {
    justify-content: center;
  }

  .hero__stat {
    grid-template-columns: repeat(3, 1fr);
  }

  .stat {
    padding: 12px 8px;
  }

  .stat__value {
    font-size: 0.85rem;
  }

  .stat__label {
    font-size: 0.65rem;
  }
}
</style>
