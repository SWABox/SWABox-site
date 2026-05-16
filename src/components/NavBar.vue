<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() { scrolled.value = window.scrollY > 12 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { label: '功能',    href: '#features' },
  { label: '技术栈',  href: '#stack' },
  { label: '下载',    href: '#download' },
  { label: 'GitHub',  href: 'https://github.com/liyunhan177/SWABox', ext: true },
]
</script>

<template>
  <header class="nav" :class="{ glass: scrolled || mobileOpen }">
    <div class="container nav-inner">
      <a href="#" class="logo">
        <!-- Logo 图片 -->
        <img
            src="../assets/logo-nobg.png"
            alt="SWABox Logo"
            class="logo-img"
            @error="(e) => e.target.style.display='none'"
        />
        <span class="logo-text">
          SWA<span class="glow">Box</span>
        </span>
      </a>

      <!-- desktop -->
      <nav class="desktop-links">
        <a v-for="l in links" :key="l.label"
           :href="l.href" :target="l.ext?'_blank':undefined"
           class="nav-link">
          {{ l.label }}
        </a>
      </nav>

      <!-- hamburger -->
      <button class="hamburger" :class="{ open: mobileOpen }"
              @click="mobileOpen=!mobileOpen" aria-label="菜单">
        <i></i><i></i><i></i>
      </button>
    </div>

    <!-- mobile drawer -->
    <transition name="drawer">
      <div v-if="mobileOpen" class="mobile-drawer">
        <a v-for="l in links" :key="l.label"
           :href="l.href" :target="l.ext?'_blank':undefined"
           class="nav-link" @click="mobileOpen=false">
          {{ l.label }}
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed; inset: 0 0 auto; height: var(--nav-h);
  z-index: 100; transition: background .3s, box-shadow .3s;
}
.nav.glass {
  background: rgba(10,10,15,.72);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  box-shadow: 0 1px 0 var(--border);
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 100%;
}
.logo {
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:800;
  font-size:1.15rem;
}
.logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
  /* 如果logo是白色/浅色，可以添加轻微发光效果 */
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
  transition: filter 0.3s;
}
.logo:hover .logo-img {
  filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.5));
}
.logo-text {
  display: inline-block;
}

.desktop-links { display:flex; gap:6px; }
.nav-link {
  padding: 6px 14px; border-radius: 8px; font-size:.88rem; font-weight:500;
  color: var(--text-dim); transition: .2s;
}
.nav-link:hover { color:#fff; background:rgba(255,255,255,.06); }

.hamburger { display:none; flex-direction:column; gap:5px; background:none;
  border:none; cursor:pointer; padding:6px; }
.hamburger i { display:block; width:20px;height:2px;background:var(--text);border-radius:2px;transition:.3s; }
.hamburger.open i:nth-child(1){transform:translateY(7px)rotate(45deg)}
.hamburger.open i:nth-child(2){opacity:0}.hamburger.open i:nth-child(3){transform:translateY(-7px)rotate(-45deg)}

.mobile-drawer {
  display:none; flex-direction:column; padding:16px 20px 24px;
  background:rgba(10,10,15,.96); backdrop-filter:blur(18px);
}
.mobile-drawer .nav-link { padding:12px 0; font-size:1rem; }

@media(max-width:720px){
  .desktop-links{display:none}
  .hamburger{display:flex}
  .mobile-drawer{display:flex}
  .logo-img {
    height: 28px; /* 移动端稍微小一点 */
  }
}
.drawer-enter-active,.drawer-leave-active{transition:opacity .25s,transform .25s}
.drawer-enter-from,.drawer-leave-to{opacity:0;transform:translateY(-8px)}
</style>
