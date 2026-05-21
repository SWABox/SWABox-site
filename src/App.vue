<template>
  <!-- 路由出口：所有页面在这里切换 -->
  <router-view />
</template>

<script setup>
// 不需要任何逻辑，路由接管一切
</script>

<style>
/* 全局样式，确保错误页全屏显示 */
html, body, #app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>