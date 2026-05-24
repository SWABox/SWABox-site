<template>
  <!-- 全局 Toast 通知 -->
  <Toast ref="toastRef" />
  
  <!-- 路由出口 -->
  <router-view />
</template>

<script setup>
import { ref, provide } from 'vue';
import Toast from './components/Toast.vue';

const toastRef = ref(null);

const showToast = (message, type = 'info', duration = 4000) => {
  toastRef.value?.showToast(message, type, duration);
};

provide('showToast', showToast);
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #03030a;
}
</style>