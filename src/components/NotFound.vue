<template>
  <div class="error-page">
    <div class="error-content">
      <h1 class="error-code">{{ errorCode }}</h1>
      <p class="error-message">{{ errorMessage }}</p>
      <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="btn-home">
        📦 前往仓库主页
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const errorCode = route.query.code || '404'
const errorMessages = {
  '404': '页面似乎被白板擦除啦',
  '403': '权限不足，无法访问此资源',
  '500': '服务器开小差了，请稍后再试'
}
const errorMessage = errorMessages[errorCode] || '页面走丢了'
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background: url('../assets/error-bg.jpg') no-repeat center/cover fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.error-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(30, 30, 46, 0.85); /* 深色遮罩 */
}

.error-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px;
  background: rgba(30, 30, 46, 0.9);
  border-radius: 16px;
  border: 1px solid var(--border, #313244);
  backdrop-filter: blur(10px);
  max-width: 500px;
  margin: 20px;
}

.error-code {
  font-size: 6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f38ba8, #89b4fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}

.error-message {
  color: var(--text-dim, #a6adc8);
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.btn-home {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3);
}

.btn-home:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(99, 102, 241, 0.4);
}
</style>
