<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="handleDisagree">
        <div class="modal-container">
          <div class="modal-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="var(--green-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="var(--green-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h2 class="modal-title">欢迎使用 SWABox</h2>
          
          <p class="modal-description">
            在继续使用之前，请阅读并同意以下内容：
          </p>
          
          <div class="terms-links">
            <a href="/terms" target="_blank" class="terms-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              用户条款
            </a>
            <a href="/privacy" target="_blank" class="terms-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              隐私政策
            </a>
          </div>
          
          <p class="modal-note">
            点击"同意"即表示您已阅读并理解上述协议内容
          </p>
          
          <div class="modal-buttons">
            <button @click="handleDisagree" class="btn btn-disagree">
              不同意
            </button>
            <button @click="handleAgree" class="btn btn-agree">
              同意
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showModal = ref(false)

const STORAGE_KEY = 'swabox_terms_accepted'

onMounted(() => {
  const hasAccepted = localStorage.getItem(STORAGE_KEY)
  if (!hasAccepted) {
    showModal.value = true
  }
})

const handleAgree = () => {
  localStorage.setItem(STORAGE_KEY, 'true')
  showModal.value = false
}

const handleDisagree = () => {
  showModal.value = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-container {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 40px;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.modal-icon {
  margin-bottom: 20px;
}

.modal-icon svg {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.2;
}

.modal-description {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.6;
}

.terms-links {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
}

.terms-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--green-primary);
  font-size: 15px;
  font-weight: 500;
  padding: 12px 20px;
  background: var(--green-glow);
  border: 1px solid var(--green-muted);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.terms-link:hover {
  background: rgba(34, 197, 94, 0.2);
  border-color: var(--green-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
}

.terms-link svg {
  flex-shrink: 0;
}

.modal-note {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 28px;
  line-height: 1.5;
}

.modal-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn {
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.btn-disagree {
  background: var(--bg-surface);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}

.btn-disagree:hover {
  background: var(--bg-hover);
  border-color: var(--border-strong);
  color: var(--text-primary);
}

.btn-agree {
  background: var(--green-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
}

.btn-agree:hover {
  background: var(--green-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(34, 197, 94, 0.5);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95);
  opacity: 0;
}

@media (max-width: 480px) {
  .modal-container {
    padding: 28px 24px;
  }
  
  .modal-title {
    font-size: 24px;
  }
  
  .terms-links {
    flex-direction: column;
  }
  
  .modal-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>