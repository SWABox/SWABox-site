<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { label: '首页', href: '/', isRouter: true },
  { label: '功能', href: '#features' },
  { label: '技术栈', href: '#stack' },
  { label: '下载', href: '#download' },
  { label: 'GitHub', href: 'https://github.com/liyunhan177/SWABox', ext: true },
]

function handleLinkClick(link, event) {
  if (link.isRouter) {
    event.preventDefault()
    router.push(link.href)
    mobileOpen.value = false
  }
}
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled || mobileOpen }">
    <div class="container nav__inner">
      <a href="#" class="nav__logo">
        <img
          src="../assets/logo-nobg.png"
          alt="SWABox"
          class="nav__logo-img"
          @error="(e) => e.target.style.display='none'"
        />
        <span class="nav__logo-text">SWA<span class="glow">Box</span></span>
      </a>

      <nav class="nav__links">
        <a
          v-for="l in links"
          :key="l.label"
          :href="l.href"
          :target="l.ext ? '_blank' : undefined"
          class="nav__link"
          @click="handleLinkClick(l, $event)"
        >{{ l.label }}</a>
      </nav>

      <button
        class="nav__hamburger"
        :class="{ 'nav__hamburger--open': mobileOpen }"
        @click="mobileOpen = !mobileOpen"
        aria-label="菜单"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <transition name="drawer">
      <div v-if="mobileOpen" class="nav__drawer">
        <a
          v-for="l in links"
          :key="l.label"
          :href="l.href"
          :target="l.ext ? '_blank' : undefined"
          class="nav__link"
          @click="handleLinkClick(l, $event)"
        >{{ l.label }}</a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  height: var(--nav-height);
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: transparent;
  transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav--scrolled::before {
  background: rgba(5, 5, 8, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
  z-index: 1;
}

.nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__logo:hover {
  background: var(--glass-1);
  transform: translateY(-1px);
}

.nav__logo-img {
  height: 36px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px var(--accent-glow));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__logo:hover .nav__logo-img {
  filter: drop-shadow(0 6px 20px var(--accent-glow));
  transform: scale(1.05);
}

.nav__logo-text {
  position: relative;
}

.nav__links {
  display: flex;
  gap: 4px;
  background: var(--glass-1);
  padding: 6px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
}

.nav__link {
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav__link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--accent-primary), var(--cyan-primary));
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__link:hover {
  color: var(--text-bright);
  transform: translateY(-1px);
}

.nav__link:hover::before {
  opacity: 0.12;
}

.nav__link span {
  position: relative;
  z-index: 1;
}

.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: var(--glass-1);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  padding: 10px;
  border-radius: var(--radius-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__hamburger:hover {
  background: var(--glass-2);
}

.nav__hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav__hamburger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.nav__hamburger--open span:nth-child(2) {
  opacity: 0;
}

.nav__hamburger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav__drawer {
  display: none;
  flex-direction: column;
  padding: 16px 20px 28px;
  background: rgba(8, 8, 16, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(124, 58, 237, 0.12);
}

.nav__drawer .nav__link {
  padding: 14px 0;
  font-size: 1rem;
  border-bottom: 1px solid var(--border-subtle);
}

.nav__drawer .nav__link:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .nav__links {
    display: none;
  }

  .nav__hamburger {
    display: flex;
  }

  .nav__drawer {
    display: flex;
  }
}
</style>
