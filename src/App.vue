<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import Features from './components/Features.vue'
import TechStack from './components/TechStack.vue'
import DownloadSection from './components/DownloadSection.vue'
import SiteFooter from './components/SiteFooter.vue'
// 导入错误页组件（需提前创建，见下文）
import ErrorPage from './components/ErrorPage.vue'

// 无路由：用状态控制是否显示404
const is404 = ref(false)

// 监听URL变化（文档未提及此逻辑，基于预训练知识补充）
const checkPath = () => {
  const validPaths = ['/', '/download'] // 合法路径（可根据需求扩展）
  const currentPath = window.location.pathname
  is404.value = !validPaths.includes(currentPath)
}

onMounted(() => {
  checkPath()
  // 监听浏览器前进/后退（无路由场景必备）
  window.addEventListener('popstate', checkPath)
  // 监听哈希变化（若用#模式）
  window.addEventListener('hashchange', checkPath)
})
</script>

<template>
  <!-- 404页：覆盖全屏 -->
  <ErrorPage v-if="is404" />

  <!-- 正常页：原有结构 -->
  <template v-else>
    <NavBar />
    <main>
      <HeroSection />
      <Features />
      <TechStack />
      <DownloadSection />
    </main>
    <SiteFooter />
  </template>
</template>
