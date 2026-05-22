<script setup>
import { ref, onMounted } from 'vue'

const release = ref(null)
const loading = ref(true)
const error = ref(false)

const WinLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#f25022"></rect>
  <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7fba00"></rect>
  <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00a4ef"></rect>
  <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#ffb900"></rect>
</svg>`

async function fetchRelease() {
  try {
    console.log('🔄 正在从 master 分支获取版本信息...')

    const response = await fetch(
      'https://cdn.jsdelivr.net/gh/liyunhan177/SWABox@master/version.json',
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    console.log('📡 JsDelivr 响应状态:', response.status)

    if (!response.ok) {
      console.error('❌ 获取版本失败: HTTP', response.status)
      error.value = true
      loading.value = false
      return
    }

    const data = await response.json()
    console.log('✅ 版本数据:', data)
    release.value = data
  } catch (err) {
    console.error('❌ 获取版本失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchRelease)
</script>

<template>
  <section id="download" class="section">
    <div class="container" style="text-align: center;">
      <div class="section__header reveal">
        <p class="section-title">下载 <span class="glow">SWA Box</span></p>
        <p class="section-sub" style="margin-inline: auto;">
          目前仅提供 Windows 版本，建议下载后右键「解除锁定」再运行。
        </p>
      </div>

      <div class="download-wrapper">
        <div v-if="loading" class="download-card reveal">
          <div class="download-loading">
            <div class="spinner"></div>
            <p style="margin-top: 16px; color: var(--text-secondary); font-size: 0.95rem;">正在查询最新版本...</p>
          </div>
        </div>

        <div v-else-if="release && !error" class="download-card reveal">
          <div class="download-card__header">
            <div class="download-card__platform">
              <div class="download-card__win" v-html="WinLogo"></div>
              <span>Windows 10 / 11</span>
            </div>
          </div>

          <div class="download-card__info">
            <h3>{{ release.version || '最新版本' }}</h3>
            <p class="download-card__date">发布于 {{ release.date }}</p>
          </div>

          <a :href="release.windows" target="_blank" class="download-btn">
            <span>⬇️ 下载 {{ release.version }}.exe</span>
          </a>

          <p class="download-card__note">
            其他文件可在
            <a href="https://github.com/liyunhan177/SWABox/releases" target="_blank" class="download-link">
              GitHub Release 页面
            </a>
            查看
          </p>
        </div>

        <div v-else class="download-card reveal">
          <div class="download-card__header">
            <div class="download-card__platform">
              <div class="download-card__win" v-html="WinLogo"></div>
              <span>Windows 10 / 11</span>
            </div>
          </div>

          <div class="download-card__info">
            <h3>获取 SWABox</h3>
            <p class="download-card__desc">点击下方按钮前往 GitHub 下载最新版本</p>
          </div>

          <a href="https://github.com/liyunhan177/SWABox/releases" target="_blank" class="download-btn">
            <span>📦 前往 GitHub Releases 下载</span>
          </a>

          <p class="download-card__note">
            💡 提示：如果下载缓慢，请尝试科学上网或使用下载工具
          </p>
        </div>
      </div>

      <p class="download-footer reveal">
        MIT License · 仅供教育设备管理场景使用
      </p>
    </div>
  </section>
</template>

<style scoped>
.section__header {
  margin-bottom: 48px;
}

.download-wrapper {
  max-width: 520px;
  margin: 0 auto;
}

.download-card {
  background: linear-gradient(145deg, rgba(18, 18, 32, 0.98), rgba(10, 10, 20, 1));
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.download-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary), var(--cyan-primary), var(--accent-light));
}

.download-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.spinner {
  width: 52px;
  height: 52px;
  border: 3px solid rgba(124, 58, 237, 0.12);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.download-card__header {
  margin-bottom: 20px;
}

.download-card__platform {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 0.98rem;
  color: var(--text-primary);
}

.download-card__win {
  display: inline-flex;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.download-card__info {
  margin-bottom: 20px;
}

.download-card__info h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: var(--text-bright);
  letter-spacing: -0.02em;
}

.download-card__date {
  color: var(--text-muted);
  font-size: 0.88rem;
  margin: 0;
}

.download-card__desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.6;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-light));
  color: white;
  padding: 16px 28px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 10px 40px var(--accent-glow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.download-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-light), var(--cyan-light));
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 56px var(--accent-glow);
}

.download-btn:hover::before {
  opacity: 1;
}

.download-btn span {
  position: relative;
  z-index: 1;
}

.download-card__note {
  margin-top: 16px;
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.download-link {
  color: var(--accent-light);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.download-link:hover {
  color: var(--cyan-light);
}

.download-footer {
  margin-top: 24px;
  font-size: 0.85rem;
  color: var(--text-muted);
  opacity: 0.7;
}

@media (max-width: 640px) {
  .download-card {
    padding: 32px 24px;
  }
}
</style>
