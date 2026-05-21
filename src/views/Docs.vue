<template>
  <div class="docs-page">
    <NavBar />
    <div class="docs-container">
      <h1>SWA Box 文档中心</h1>
      <p>文档正在建设中...</p>
      <a href="/docs/index.html" target="_blank" class="docs-link">
        查看完整文档 →
      </a>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/SiteFooter.vue'
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  background: var(--bg-dark); /* ✅ 现在一定存在 */
  color: var(--text);
}

.docs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
}

.docs-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.2s;
}

.docs-link:hover {
  transform: translateY(-2px);
}
</style>