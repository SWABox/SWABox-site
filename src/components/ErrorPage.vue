<template>
  <div class="error-page" @mousemove="handleMouseMove">
    <!-- 使用项目内背景图（路径适配Vite） -->
    <div
        class="background"
        :style="{ backgroundImage: `url(${errorBg})` }"
    ></div>

    <div class="content" :style="contentStyle">
      <!-- 项目Logo（跳转首页） -->
      <a href="/" class="logo-link">
        <img
            :src="logo"
            alt="SWABox Logo"
            class="logo-img"
        >
      </a>

      <!-- 404动态图标 -->
      <div class="icon-wrapper">
        <svg class="broken-box" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="#0078d7" stroke-width="4"/>
          <line x1="10" y1="10" x2="90" y2="90" stroke="#0078d7" stroke-width="4" stroke-linecap="round"/>
          <line x1="90" y1="10" x2="10" y2="90" stroke="#0078d7" stroke-width="4" stroke-linecap="round"/>
          <circle cx="50" cy="50" r="15" stroke="#0078d7" stroke-width="4"/>
        </svg>
        <span class="status-code">404</span>
      </div>

      <h1 class="title">页面迷路了</h1>
      <p class="subtitle">
        你访问的地址不存在<br>
        可能被色彩侵蚀了 😅
      </p>

      <div class="actions">
        <a href="/" class="btn-primary">返回首页</a>
        <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="btn-secondary">
          查看项目仓库
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 项目内资源（Vite自动处理路径）
import errorBg from '../assets/error-bg.jpg'
import logo from '../assets/logo-nobg.png'

const contentStyle = ref({ transform: 'translate(0px, 0px)' })

const handleMouseMove = (e) => {
  const { clientX, clientY } = e
  const x = (window.innerWidth / 2 - clientX) / 60
  const y = (window.innerHeight / 2 - clientY) / 60
  contentStyle.value = { transform: `translate(${x}px, ${y}px)` }
}
</script>

<style scoped>
/* 样式与之前一致，此处省略（保留浮动动画、响应式等） */
/* 关键调整：移除router-link，改用原生<a>标签 */
.logo-link { display: inline-block; margin-bottom: 40px; }
.btn-primary, .btn-secondary { /* 原有样式 */ }
</style>
