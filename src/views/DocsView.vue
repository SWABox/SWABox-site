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
import { ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { marked } from 'marked'

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
    const response = await fetch(path)

    // 更详细的错误处理
    if (!response.ok) {
      if (response.status === 404) {
        error.value = '文档不存在 (404)'
      } else if (response.status === 403) {
        error.value = '没有权限访问此文档 (403)'
      } else if (response.status >= 500) {
        error.value = '服务器错误，请稍后再试 (500)'
      } else {
        error.value = `加载失败 (${response.status})`
      }
      return
    }

    const mdText = await response.text()
    renderedHtml.value = marked(mdText)
  } catch (err) {
    // 捕获网络错误或其他异常
    error.value = '网络错误或文档加载失败'
    console.error('文档加载错误:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 默认加载首页
  loadDoc('/docs/README.md')
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
}
.docs-sidebar a {
  display: block;
  padding: 8px 12px;
  color: #aaa;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}
.docs-sidebar a:hover {
  background: rgba(129, 140, 248, 0.1);
  color: #fff;
}
.docs-sidebar a.active {
  background: rgba(129, 140, 248, 0.2);
  color: #818cf8;
  font-weight: bold;
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
  color: #888;
}
.error {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.2);
}
</style>