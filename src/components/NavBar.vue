<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  mobileMenuOpen.value = false
}

function handleLinkClick(href) {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { label: '功能', href: '#features' },
  { label: '技术栈', href: '#stack' },
  { label: '下载', href: '#download' },
]
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="container nav__inner">
      <a href="/" class="nav__logo" @click.prevent="scrollToTop">
        <img src="/logo-nobg.png" alt="SWABox Logo" class="nav__logo-icon">
        <span class="nav__logo-text">SWA<span class="green-text">Box</span></span>
      </a>

      <nav class="nav__links nav__links--desktop">
        <a
          v-for="l in links"
          :key="l.label"
          :href="l.href"
          class="nav__link"
          @click.prevent="handleLinkClick(l.href)"
        >{{ l.label }}</a>
        <a
          href="https://github.com/liyunhan177/SWABox"
          target="_blank"
          rel="noopener noreferrer"
          class="nav__github"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </nav>

      <button 
        class="nav__menu-btn" 
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ 'nav__menu-btn--active': mobileMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="nav__mobile" :class="{ 'nav__mobile--open': mobileMenuOpen }">
      <div class="nav__mobile-inner">
        <a
          v-for="l in links"
          :key="l.label"
          href="#"
          class="nav__link nav__link--mobile"
          @click.prevent="handleLinkClick(l.href)"
        >{{ l.label }}</a>
        <a
          href="https://github.com/liyunhan177/SWABox"
          target="_blank"
          rel="noopener noreferrer"
          class="nav__github nav__github--mobile"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  height: var(--nav-height);
  z-index: 100;
  transition: background 0.3s;
}

.nav--scrolled {
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  transition: opacity 0.2s;
  min-height: 44px;
  padding: 4px 0;
}

.nav__logo:hover {
  opacity: 0.8;
}

.nav__logo-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.nav__logo-text {
  font-family: var(--font-mono);
}

.nav__links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav__link {
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav__link:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.nav__link:active {
  transform: scale(0.98);
}

.nav__github {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  margin-left: 12px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px;
  cursor: pointer;
}

.nav__github:hover {
  background: var(--bg-hover);
  border-color: var(--green-primary);
  color: var(--green-primary);
  box-shadow: var(--shadow-glow);
}

.nav__github:active {
  transform: scale(0.98);
}

.nav__github svg {
  flex-shrink: 0;
}

.nav__menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.nav__menu-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__menu-btn--active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav__menu-btn--active span:nth-child(2) {
  opacity: 0;
}

.nav__menu-btn--active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav__mobile {
  display: none;
  position: absolute;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background: rgba(10, 10, 15, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__mobile--open {
  max-height: 300px;
  opacity: 1;
}

.nav__mobile-inner {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav__link--mobile {
  padding: 14px 16px;
  font-size: 1rem;
}

.nav__github--mobile {
  margin: 12px 0 0;
  justify-content: center;
}

@media (max-width: 768px) {
  .nav__links--desktop {
    display: none;
  }

  .nav__menu-btn {
    display: flex;
  }

  .nav__mobile {
    display: block;
  }
}

@media (max-width: 640px) {
  .nav__logo-text {
    font-size: 1rem;
  }
}
</style>