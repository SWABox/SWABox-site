<template>
  <div class="docs-wrapper">
    <NavBar />

    <div class="docs-container">
      <!-- 左侧导航 -->
      <aside class="docs-sidebar">
        <div class="sidebar-title">文档导航</div>
        <ul>
          <li v-for="item in menu" :key="item.path">
            <a
                href="#"
                @click.prevent="loadDoc(item.path)"
                :class="{ active: currentPath === item.path }"
            >
              {{ item.title }}
            </a>
            <!-- 子菜单 -->
            <ul v-if="item.children" class="sub-menu">
              <li v-for="child in item.children" :key="child.path">
                <a
                    href="#"
                    @click.prevent="loadDoc(child.path)"
                    :class="{ active: currentPath === child.path }"
                >
                  {{ child.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <!-- 右侧内容区 -->
      <main class="docs-content">
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <!-- 使用 v-html 渲染 Markdown 转换后的 HTML -->
        <article v-else class="markdown-body" v-html="renderedHtml"></article>
      </main>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup>
// 关键修复：导入所需的 Vue 函数
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/SiteFooter.vue'

// 使用 CDN 版本的 marked（确保 index.html 中已引入）
const menu = ref([
  { title: '🏠 概览', path: '/docs/README.md', children: [] },
  {
    title: '🛠 使用指南',
    path: '',
    children: [
      { title: '基础操作', path: '/docs/usage/basic.md' },
      { title: '工具箱功能', path: '/docs/usage/tools.md' }
    ]
  },
  {
    title: '💻 开发文档',
    path: '',
    children: [
      { title: '环境搭建', path: '/docs/dev/env.md' },
      { title: '项目结构', path: '/docs/dev/structure.md' }
    ]
  }
])

const renderedHtml = ref('')
const loading = ref(false)
const error = ref('')
const currentPath = ref('')

const loadDoc = async (path) => {
  if (!path) return

  loading.value = true
  error.value = ''
  currentPath.value = path

  try {
    // 直接从 public 目录 fetch markdown 文件
    const response = await fetch(path)

    if (!response.ok) {
      if (response.status === 404) {
        error.value = '文档不存在 (404)'
      } else if (response.status === 403) {
        error.value = '没有权限访问此文档 (403)'
      } else {
        error.value = `加载失败 (${response.status})`
      }
      return
    }

    const mdText = await response.text()

    // 使用全局 marked（通过 CDN 引入）
    if (window.marked) {
      renderedHtml.value = window.marked(mdText)
    } else {
      // 如果 marked 未加载，显示原始文本
      renderedHtml.value = `<pre>${mdText}</pre>`
    }
  } catch (err) {
    error.value = '网络错误或文档加载失败'
    console.error('文档加载错误:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 根据当前 URL 决定加载哪个文档
  const path = window.location.pathname

  if (path.startsWith('/docs/')) {
    // 提取文档路径
    const docPath = path.replace('/docs/', '/docs/')
    const fullPath = docPath.endsWith('.md') ? docPath : `${docPath}.md`
    loadDoc(fullPath)
  } else {
    // 默认加载首页
    loadDoc('/docs/README.md')
  }
})
</script>

<style scoped>
/* 样式保持与你网站一致 */
.docs-wrapper {
  background: #0f0f0f;
  min-height: 100vh;
  color: #ccc;
}
.docs-container {
  display: flex;
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 20px;
}
.docs-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  border-right: 1px solid #333;
  padding-right: 20px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.docs-sidebar a {
  display: block;
  padding: 8px 12px;
  color: #aaa;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}
.docs-sidebar a.active {
  background: rgba(129, 140, 248, 0.2);
  color: #818cf8;
  font-weight: bold;
}
.docs-sidebar a:hover {
  background: rgba(129, 140, 248, 0.1);
  color: #fff;
}
.sub-menu {
  padding-left: 16px;
  font-size: 0.9em;
}
.docs-content {
  flex: 1;
  padding: 0 40px;
}
.markdown-body {
  line-height: 1.7;
}
.markdown-body :deep(h1) {
  color: #fff;
  border-bottom: 1px solid #333;
  padding-bottom: 16px;
}
.markdown-body :deep(h2) {
  color: #fff;
  border-left: 4px solid #818cf8;
  padding-left: 12px;
  margin-top: 32px;
}
.markdown-body :deep(h3) {
  color: #ddd;
  margin-top: 24px;
}
.markdown-body :deep(code) {
  background: #1a1a2e;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  color: #a5b4fc;
}
.markdown-body :deep(pre) {
  background: #1a1a2e;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid #333;
}
.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}
.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #333;
  padding: 10px;
  text-align: left;
}
.markdown-body :deep(th) {
  background: #1a1a2e;
  color: #818cf8;
}
.loading, .error {
  text-align: center;
  padding: 60px;
}
.error {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .docs-container {
    flex-direction: column;
  }
  .docs-sidebar {
    width: 100%;
    position: static;
    border-right: none;
    border-bottom: 1px solid #333;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
}
</style>