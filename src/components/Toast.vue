<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast--${toast.type}`]"
      >
        <div class="toast__icon">
          <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <svg v-else-if="toast.type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <span class="toast__message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

const showToast = (message, type = 'info', duration = 4000) => {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

defineExpose({ showToast })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
  max-width: 400px;
}

.toast--success {
  border-color: var(--green-primary);
  background: linear-gradient(135deg, var(--bg-elevated), rgba(34, 197, 94, 0.1));
}

.toast--success .toast__icon {
  color: var(--green-primary);
}

.toast--error {
  border-color: #ef4444;
  background: linear-gradient(135deg, var(--bg-elevated), rgba(239, 68, 68, 0.1));
}

.toast--error .toast__icon {
  color: #ef4444;
}

.toast--info {
  border-color: #3b82f6;
  background: linear-gradient(135deg, var(--bg-elevated), rgba(59, 130, 246, 0.1));
}

.toast--info .toast__icon {
  color: #3b82f6;
}

.toast__icon {
  flex-shrink: 0;
}

.toast__icon svg {
  width: 20px;
  height: 20px;
}

.toast__message {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

@media (max-width: 480px) {
  .toast-container {
    left: 20px;
    right: 20px;
  }
  
  .toast {
    max-width: none;
  }
}
</style>