<template>
  <main class="docs-content">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <h2>⚠️ 加载失败</h2>
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-btn">重试</button>
    </div>

    <article v-else class="markdown-body" v-html="content"></article>
  </main>
</template>

<script setup>
defineProps({
  content: String,
  loading: Boolean,
  error: String
})

defineEmits(['retry'])
</script>

<style scoped>
.docs-content {
  flex: 1;
  padding: 0 40px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #333;
  border-top: 3px solid #818cf8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 60px 20px;
  color: #ff6b6b;
}

.retry-btn {
  background: #818cf8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #6366f1;
}

/* Markdown 样式 */
.markdown-body {
  color: #ccc;
  line-height: 1.7;
}

.markdown-body :deep(h1) {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
}

.markdown-body :deep(h2) {
  color: #fff;
  font-size: 1.8rem;
  margin-top: 32px;
  padding-left: 12px;
  border-left: 4px solid #818cf8;
}

.markdown-body :deep(h3) {
  color: #ddd;
  font-size: 1.4rem;
  margin-top: 24px;
}

.markdown-body :deep(p) {
  margin: 16px 0;
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
  margin: 16px 0;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  color: #ccc;
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

.markdown-body :deep(blockquote) {
  border-left: 4px solid #818cf8;
  padding-left: 16px;
  margin: 16px 0;
  color: #888;
  background: rgba(129, 140, 248, 0.05);
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
}
</style>