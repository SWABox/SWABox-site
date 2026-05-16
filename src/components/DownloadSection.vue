<script setup>
import { ref, onMounted } from 'vue'

const release = ref(null)
const loading = ref(true)
const error = ref(false)

// Windows Logo SVG（无依赖）
const WinLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
  <rect x="2" y="2" width="8.5" height="8.5" rx="1" fill="#f25022"/>
  <rect x="13.5" y="2" width="8.5" height="8.5" rx="1" fill="#7fba00"/>
  <rect x="2" y="13.5" width="8.5" height="8.5" rx="1" fill="#00a4ef"/>
  <rect x="13.5" y="13.5" width="8.5" height="8.5" rx="1" fill="#ffb900"/>
</svg>`

async function fetchRelease() {
  try {
    console.log('🔄 正在从 master 分支获取版本信息...')

    // ✅ 关键修正：使用 master 分支
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
      throw new Error(`HTTP ${response.status}`)
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

      <!-- ✅ 成功获取 version.json -->
      <div v-else-if="release && !error" class="dl-card reveal">
        <div class="dl-top">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span class="win-badge" v-html="WinLogo" />
          <span>Windows 10 / 11</span>
        </div>

        <h3 style="margin:14px 0 4px; font-size:1.1rem">
          {{ release.version || '最新版本' }}
        </h3>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
          发布于 {{ release.date }}
        </p>

        <!-- 下载按钮 -->
        <a :href="release.windows"
           target="_blank"
           class="btn-download">
          ⬇ 下载 {{ release.version }}.exe
        </a>

        <p style="margin-top: 12px; font-size: 0.75rem; color: var(--text-dim)">
          其他文件可在
          <a href="https://github.com/liyunhan177/SWABox/releases"
             target="_blank"
             style="text-decoration: underline; color: var(--accent)">
            GitHub Release 页面
          </a>
          查看
        </p>
      </div>

      <!-- ❌ 兜底方案（无 version.json 或获取失败） -->
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
          💡 提示：如需自动显示版本号，请在 SWABox 仓库 master 分支创建 version.json
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
