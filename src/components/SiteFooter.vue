<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="brand-section">
          <div class="brand">
            <img src="/logo-nobg.png" alt="SWABox Logo" class="logo" onerror="this.style.display='none';">
            <span class="brand-name">SWABox</span>
          </div>
          <p class="brand-description">
            专为电教委打造的工具箱，让工作更高效、更便捷。
          </p>
          <a href="https://github.com/liyunhan177/SWABox" target="_blank" rel="noopener noreferrer" class="github-link">
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            <span>访问 GitHub 仓库</span>
          </a>
        </div>

        <div class="links-section">
          <div class="links-column">
            <h3 class="column-title">内容跳转</h3>
            <ul class="links-list">
              <li>
                <a href="/" @click="handleLinkClick('/', $event)">主页</a>
              </li>
              <li>
                <a href="#features" @click="handleLinkClick('#features', $event)">功能</a>
              </li>
              <li>
                <a href="#stack" @click="handleLinkClick('#stack', $event)">技术栈</a>
              </li>
              <li>
                <a href="#download" @click="handleLinkClick('#download', $event)">下载</a>
              </li>
            </ul>
          </div>

          <div class="links-column">
            <h3 class="column-title">快速链接</h3>
            <ul class="links-list">
              <li>
                <a href="https://github.com/liyunhan177/SWABox" target="_blank" rel="noopener noreferrer">
                  GitHub 仓库
                </a>
              </li>
              <li>
                <a href="https://github.com/liyunhan177/SWABox/releases" target="_blank" rel="noopener noreferrer">
                  Releases
                </a>
              </li>
            </ul>
          </div>

          <div class="links-column">
            <h3 class="column-title">法律信息</h3>
            <ul class="links-list">
              <li>
                <router-link to="/terms">用户协议</router-link>
              </li>
              <li>
                <router-link to="/privacy">隐私政策</router-link>
              </li>
            </ul>
          </div>

          <div class="links-column">
            <h3 class="column-title">联系我们</h3>
            <ul class="links-list">
              <li class="contact-item">
                <a href="mailto:contect@swabox.cc.cd" class="email-link">
                  <svg class="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>发送邮件</span>
                </a>
              </li>
              <li class="email-text">
                <a href="mailto:contect@swabox.cc.cd" class="email-address">
                  contect@swabox.cc.cd
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © 2026 SWABox. 使用 MIT 许可证开源。
        </p>
        <p class="hosting-info">
          <span class="dot"></span>
          托管于 Cloudflare Pages · Cloudflare Turnstile
        </p>
      </div>
    </div>
  </footer>
</template>

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
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, rgba(10, 10, 18, 0.98), rgba(5, 5, 10, 1));
  border-top: 1px solid rgba(124, 58, 237, 0.15);
  padding: 4rem 0 2.5rem;
  margin-top: auto;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 0%, rgba(124, 58, 237, 0.06), transparent 50%),
    radial-gradient(circle at 80% 100%, rgba(6, 182, 212, 0.04), transparent 50%);
  pointer-events: none;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.2fr 2.8fr;
  gap: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 1;
}

.brand-section {
  max-width: 340px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo {
  height: 44px;
  width: 44px;
  object-fit: contain;
  filter: drop-shadow(0 4px 16px rgba(124, 58, 237, 0.3));
}

.brand-name {
  font-size: 1.7rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.brand-description {
  color: #a1a1aa;
  margin-bottom: 1.75rem;
  line-height: 1.8;
  font-size: 0.98rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.github-link:hover {
  color: #f1f1f5;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(124, 58, 237, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}

.github-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.links-section {
  display: flex;
  gap: 1.8rem;
  flex-wrap: wrap;
}

.links-column {
  min-width: 125px;
}

.column-title {
  font-size: 0.82rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  color: #f1f1f5;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.9;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: 0.85rem;
}

.links-list a,
.links-list router-link {
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-block;
  padding: 2px 0;
}

.links-list a:hover,
.links-list router-link:hover {
  color: #a78bfa;
  transform: translateX(4px);
}

.contact-item {
  margin-bottom: 1rem !important;
}

.email-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 12px 28px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 10px;
  color: #a78bfa !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

.email-link:hover {
  background: rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.3);
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
}

.email-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  transform: translateY(1px);
}

.email-text {
  margin-top: 0.5rem !important;
}

.email-address {
  font-size: 0.85rem !important;
  color: #71717a !important;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  word-break: break-all;
}

.email-address:hover {
  color: #a78bfa !important;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.copyright {
  color: #71717a;
  font-size: 0.9rem;
}

.hosting-info {
  color: #71717a;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7c3aed;
  box-shadow: 0 0 12px #7c3aed;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 12px #7c3aed;
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 20px #7c3aed;
  }
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .brand-section {
    max-width: 100%;
  }

  .links-section {
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .footer {
    padding: 2.5rem 0 2rem;
  }

  .links-section {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
