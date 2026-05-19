<template>
  <footer class="foot">
    <div class="container foot-inner">
      <span>© 2026 <strong style="color:#818cf8">SWABox</strong> · MIT <a href="../../public/privacy.html">隐私政策</a></span>
      <a href="https://github.com/liyunhan177/SWABox" target="_blank">
        GitHub →
      </a>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top:1px solid var(--border);
  padding:22px 0; font-size:.8rem; color:var(--text-dim);
}
.foot-inner {
  display:flex; justify-content:space-between; align-items:center;
}
.foot a { transition:.2s }
.foot a:hover { color:#fff }
</style>
