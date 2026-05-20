<template>
  <div class="docs-wrapper">
    <NavBar />

    <div class="docs-container">
      <DocsSidebar
          :menu="menu"
          :current-path="currentPath"
          @navigate="handleNavigate"
      />

      <DocsContent
          :content="renderedMarkdown"
          :loading="loading"
          :error="error"
      />
    </div>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/SiteFooter.vue'
import DocsSidebar from '../components/DocsSidebar.vue'
import DocsContent from '../components/DocsContent.vue'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()

const renderedMarkdown = ref('')
const loading = ref(false)
const error = ref(null)
const currentPath = ref('')

// 菜单数据（对应 public/docs 目录结构）
const menu = ref([
  {
    title: '🏠 概览',
    path: '/docs/',
    children: [
      { title: '简介与快速开始', path: '/docs/' }
    ]
  },
  {
    title: '🛠 使用指南',
    path: '/docs/usage',
    children: [
      { title: '基础操作', path: '/docs/usage/basic' },
      { title: '工具箱功能', path: '/docs/usage/tools' },
      { title: '常见问题', path: '/docs/usage/faq' }
    ]
  },
  {
    title: '💻 开发文档',
    path: '/docs/dev',
    children: [
      { title: '环境搭建', path: '/docs/dev/env' },
      { title: '项目结构', path: '/docs/dev/structure' },
      { title: '贡献指南', path: '/docs/dev/contribute' }
    ]
  }
])

// 加载 Markdown 文件
const loadMarkdown = async (path) => {
  loading.value = true
  error.value = null

  try {
    let filePath = ''

    if (route.params.category && route.params.page) {
      filePath = `/docs/${route.params.category}/${route.params.page}.md`
    } else if (route.params.category) {
      filePath = `/docs/${route.params.category}/README.md`
    } else {
      filePath = '/docs/README.md'
    }

    const response = await fetch(filePath)
    if (!response.ok) throw new Error('文档不存在')

    const text = await response.text()
    renderedMarkdown.value = marked(text)
  } catch (err) {
    error.value = err.message
    renderedMarkdown.value = ''
  } finally {
    loading.value = false
  }
}

const handleNavigate = (path) => {
  router.push(path)
}

// 监听路由变化
watch(
    () => route.fullPath,
    (newPath) => {
      currentPath.value = newPath
      loadMarkdown(newPath)
    },
    { immediate: true }
)

onMounted(() => {
  currentPath.value = route.fullPath
})
</script>

<style scoped>
.docs-wrapper {
  min-height: 100vh;
  background: #0f0f0f;
  color: #ccc;
}

.docs-container {
  display: flex;
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .docs-container {
    flex-direction: column;
  }
}
</style>