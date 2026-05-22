<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="brand-section">
          <div class="brand">
            <img src="/logo-nobg.png" alt="SWABox Logo" class="logo" onerror="this.style.display='none'" />
            <span class="brand-name">SWABox</span>
          </div>
          <p class="brand-description">
            专为电教委打造的工具箱，让工作更高效、更便捷。
          </p>
          <a href="https://github.com/liyunhan177/SWABox" target="_blank" rel="noopener noreferrer" class="github-link">
            <svg class="github-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            访问 GitHub 仓库
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
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © 2026 SWABox. 使用 MIT 许可证开源。
        </p>
        <p class="hosting-info">
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
    // 如果是锚点链接，先跳转到首页，然后滚动到对应位置
    router.push('/').then(() => {
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    })
  } else {
    // 普通路由跳转
    router.push(href)
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 1));
  border-top: 1px solid var(--border);
  padding: 3rem 0 2rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.brand-section {
  max-width: 400px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.logo {
  height: 40px;
  width: 40px;
  object-contain: contain;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  color: var(--text-dim);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
}

.github-link:hover {
  color: var(--text);
}

.github-icon {
  width: 24px;
  height: 24px;
}

.links-section {
  display: flex;
  gap: 3rem;
}

.links-column {
  min-width: 150px;
}

.column-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text);
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: 0.75rem;
}

.links-list a,
.links-list router-link {
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 400;
}

.links-list a:hover,
.links-list router-link:hover {
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: var(--text-dim);
  font-size: 0.9rem;
}

.hosting-info {
  color: var(--text-dim);
  font-size: 0.85rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
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
