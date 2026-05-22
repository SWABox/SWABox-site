<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLinkClick(href, event) {
  event.preventDefault()
  if (href.startsWith('#')) {
    router.push('/').then(() => {
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    })
  } else {
    router.push(href)
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <a href="/" class="footer__logo" @click.prevent="router.push('/')">
            <img src="/logo-nobg.png" alt="SWABox Logo" class="footer__logo-icon">
            <span>SWA<span class="green-text">Box</span></span>
          </a>
          <p class="footer__desc">
            专为电教委打造的工具箱。
            <br>
            让工作流压缩成一个exe。
          </p>
        </div>

        <div class="footer__links">
          <div class="footer__col">
            <h4 class="footer__col-title">导航</h4>
            <a href="#features" @click="handleLinkClick('#features', $event)">功能</a>
            <a href="#stack" @click="handleLinkClick('#stack', $event)">技术栈</a>
            <a href="#download" @click="handleLinkClick('#download', $event)">下载</a>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">链接</h4>
            <a href="https://github.com/liyunhan177/SWABox" target="_blank">GitHub</a>
            <a href="https://github.com/liyunhan177/SWABox/releases" target="_blank">Releases</a>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">法律</h4>
            <router-link to="/terms">用户协议</router-link>
            <router-link to="/privacy">隐私政策</router-link>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">联系</h4>
            <a href="mailto:contect@swabox.cc.cd" class="footer__email">contect@swabox.cc.cd</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">© 2026 SWABox · MIT License</p>
        <button @click="scrollToTop" class="footer__top-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          回到顶部
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border-subtle);
  padding: 64px 0 32px;
  margin-top: 48px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 2.5fr;
  gap: 64px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border-subtle);
}

.footer__brand {
  max-width: 280px;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 16px;
  transition: opacity 0.2s;
}

.footer__logo:hover {
  opacity: 0.8;
}

.footer__logo-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.footer__desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.footer__links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__col-title {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.footer__col a {
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.footer__col a:hover {
  color: var(--green-primary);
}

.footer__email {
  font-family: var(--font-mono);
  font-size: 0.8rem !important;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
}

.footer__copy,
.footer__hosting {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.footer__top-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  color: var(--text-muted);
  border: none;
  padding: 6px 12px;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.footer__top-btn:hover {
  background: var(--bg-hover);
  color: var(--green-primary);
}

@media (max-width: 900px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .footer__brand {
    max-width: 100%;
  }

  .footer__links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer__links {
    grid-template-columns: 1fr;
  }

  .footer__bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .footer__top-btn {
    justify-content: center;
  }
}
</style>
