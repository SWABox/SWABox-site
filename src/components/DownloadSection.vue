<script setup>
import { ref, onMounted } from 'vue'

const release = ref(null)
const loading = ref(true)
const error = ref(false)

const WinLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#f25022"/>
  <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7fba00"/>
  <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00a4ef"/>
  <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#ffb900"/>
</svg>`

async function fetchRelease() {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/liyunhan177/SWABox@master/version.json',
      { headers: { 'Accept': 'application/json' } }
    )

    if (!response.ok) {
      error.value = true
      loading.value = false
      return
    }

    const data = await response.json()
    release.value = data
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchRelease)
</script>

<template>
  <section id="download" class="section">
    <div class="container">
      <div class="download__layout">
        <div class="download__info reveal">
          <p class="section-label">// 下载</p>
          <h2 class="section-title">一个exe，用起来就像呼吸一样自然</h2>
          <p class="section-desc">
            目前只有 Windows 版。建议下载后右键「解除锁定」再运行。
            <br>
            <span class="download__note">下载慢？试试科学上网，或者用下载工具。</span>
          </p>
        </div>

        <div class="download__card reveal">
          <div class="download__header">
            <div class="download__platform">
              <span v-html="WinLogo"></span>
              <span>Windows 10 / 11</span>
            </div>
          </div>

          <div v-if="loading" class="download__loading">
            <div class="spinner"></div>
            <p>正在查询版本...</p>
          </div>

          <div v-else-if="release && !error" class="download__content">
            <div class="download__version">
              <span class="download__version-label">v{{ release.version }}</span>
              <span class="download__version-date">{{ release.date }}</span>
            </div>

            <a :href="release.windows" target="_blank" class="download__btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              下载 {{ release.version }}.exe
            </a>
          </div>

          <div v-else class="download__content">
            <div class="download__version">
              <span class="download__version-label">最新版本</span>
            </div>

            <a href="https://github.com/liyunhan177/SWABox/releases" target="_blank" class="download__btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              前往 GitHub Releases
            </a>
          </div>

          <p class="download__footer">
            MIT License · 仅供教育设备管理场景使用
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.download__info {
  padding-top: 8px;
}

.download__note {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 8px;
  display: block;
}

.download__card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.download__header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.download__platform {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.download__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  gap: 16px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid var(--border-subtle);
  border-top-color: var(--green-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.download__loading p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.download__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.download__version {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.download__version-label {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.download__version-date {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.download__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  background: var(--green-primary);
  color: #000;
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.download__btn:hover {
  background: var(--green-light);
  transform: translateY(-2px);
}

.download__footer {
  margin-top: 20px;
  font-size: 0.8rem;
  color: var(--text-dim);
  text-align: center;
}

@media (max-width: 768px) {
  .download__layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
