<template>
  <div class="gate">
    <div class="spinner"></div>
    <p>安全检测中...</p>
  </div>
</template>

<script setup>
import {ref, onMounted } from 'vue'

const emit = defineEmits(['pass'])

onMounted(async () => {
  try {
    // 无感获取 Token
    const token = await window.turnstile.execute()

    // 发送给 Workers 验证
    const res = await fetch('https://turnstile-verify.liyunhan11111.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })

    const data = await res.json()
    if (data.success) emit('pass')
  } catch {
    alert('验证失败，请刷新')
  }
})
</script>

<style scoped>
.gate {
  position: fixed; inset: 0;
  background: #1a1a2e;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid rgba(255,255,255,0.1);
  border-left-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>