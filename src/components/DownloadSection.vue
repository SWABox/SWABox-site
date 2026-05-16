<script setup>
import { ref, onMounted } from 'vue'

const release = ref(null)
const loading = ref(true)
const error = ref(false)

// Windows Logo SVG
const WinLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
  <rect x="2" y="2" width="8.5" height="8.5" rx="1" fill="#f25022"/>
  <rect x="13.5" y="2" width="8.5" height="8.5" rx="1" fill="#7fba00"/>
  <rect x="2" y="13.5" width="8.5" height="8.5" rx="1" fill="#00a4ef"/>
  <rect x="13.5" y="13.5" width="8.5" height="8.5" rx="1" fill="#ffb900"/>
</svg>`

async function fetchRelease() {
  try {
    console.log('🔄 正在获取 GitHub Release...')

    const response = await fetch(
        'https://api.github.com/repos/liyunhan177/SWABox/releases/latest',
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // 如果需要，可以添加 Authorization token 来避免 rate limit
            // 'Authorization': 'token YOUR_GITHUB_TOKEN'
          }
        }
    )

    console.log('📡 API 响应状态:', response.status)

    if (response.status === 403) {
      console.warn('⚠️ GitHub API 速率限制，使用备用方案')
      error.value = true
    } else if (response.status === 404) {
      console.warn('⚠️ 未找到 Release，使用备用方案')
      error.value = true
    } else if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    } else {
      const data = await response.json()
      console.log('✅ Release 数据:', data)
      release.value = data
    }
  } catch (err) {
    console.error('❌ 获取 Release 失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchRelease)
</script>

<template>
  <section id="download" class="section">
    <div class="container" style="text-align:center">
      <p class="section-title reveal">下载 <span class="glow">SWA Box</span></p>
      <p class="section-sub" style="margin-inline:auto">
        目前仅提供 Windows 版本，建议下载后右键「解除锁定」再运行。
      </p>

      <!-- 加载中 -->
      <div v-if="loading" class="dl-card reveal">
        <div class="loading-spinner"></div>
        <p style="margin-top: 12px; color: var(--text-dim)">正在查询最新版本...</p>
      </div>

      <!-- 成功获取到 Release -->
      <div v-else-if="release && !error" class="dl-card reveal">
        <div class="dl-top">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="win-badge" v-html="WinLogo" />
          <span>Windows 10 / 11</span>
        </div>

        <h3 style="margin:14px 0 4px; font-size:1.1rem">
          {{ release.tag_name || '最新版本' }}
        </h3>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
          发布于 {{ new Date(release.published_at).toLocaleDateString() }}
        </p>

        <!-- 查找 .exe 文件 -->
        <template v-if="release.assets && release.assets.length > 0">
          <a v-for="asset in release.assets.filter(a => a.name.endsWith('.exe'))"
             :key="asset.id"
             :href="asset.browser_download_url"
             class="btn-download"
             target="_blank">
            ⬇ 下载 {{ asset.name }}
          </a>

          <p style="margin-top: 12px; font-size: 0.75rem; color: var(--text-dim)">
            其他文件可在
            <a :href="release.html_url" target="_blank" style="text-decoration: underline; color: var(--accent)">
              GitHub Release 页面
            </a>
            查看
          </p>
        </template>

        <!-- 没有 .exe 但有 Release -->
        <a v-else :href="release.html_url" target="_blank" class="btn-download">
          📦 前往 GitHub 下载
        </a>
      </div>

      <!-- 出错或没有 Release（显示备用方案） -->
      <div v-else class="dl-card reveal">
        <div class="dl-top">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="win-badge" v-html="WinLogo" />
          <span>Windows 10 / 11</span>
        </div>

        <h3 style="margin:14px 0 8px; font-size:1.1rem">获取 SWABox</h3>

        <p style="color: var(--text-dim); margin-bottom: 20px; font-size: 0.9rem;">
          点击下方按钮前往 GitHub 下载最新版本
        </p>

        <a href="https://github.com/liyunhan177/SWABox/releases"
           target="_blank"
           class="btn-download">
          📦 前往 GitHub Releases 下载
        </a>

        <p style="margin-top: 16px; font-size: 0.75rem; color: var(--text-dim); opacity: 0.7;">
          💡 提示：如果这是首次发布，请先在 GitHub 创建一个 Release
        </p>
      </div>

      <p style="margin-top: 20px; font-size: 0.73rem; color: var(--text-dim); opacity: 0.55">
        MIT License · 仅供教育设备管理场景使用
      </p>
    </div>
  </section>
</template>

<style scoped>
.dl-card {
  max-width: 480px;
  margin: 24px auto 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px 28px;
  text-align: left;
}

.dl-top {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 0.92rem;
  color: #ddd;
}

.win-badge {
  display: inline-flex;
  align-items: center;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: #fff;
  padding: 13px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3);
  transition: transform 0.18s, box-shadow 0.18s;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(99, 102, 241, 0.4);
}

/* 加载动画 */
.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 3px solid rgba(99, 102, 241, 0.1);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
