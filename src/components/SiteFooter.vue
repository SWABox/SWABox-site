<template>
  <footer class="foot">
    <div class="container foot-inner">
      <!-- 整体居中内容 -->
      <div class="center-content">
        <span>© 2026 <strong style="color:#818cf8">SWABox</strong> · MIT</span>

        <span class="separator">·</span>

        <!-- 隐私政策作为核心链接 -->
        <a href="/privacy.html" class="footer-link highlight-link">隐私政策</a>

        <span class="separator">·</span>

        <a href="mailto:content@swabox.cc.cd" class="footer-link">联系我们</a>

        <span class="separator">·</span>

        <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="footer-link">
          GitHub →
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.foot {
  border-top: 1px solid var(--border);
  padding: 22px 0;
  font-size: .8rem;
  color: var(--text-dim);
  margin-top: 60px;
}

.foot-inner {
  display: flex;
  justify-content: center; /* 整体水平居中 */
  align-items: center;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* 小屏幕自动换行 */
  gap: 8px; /* 元素之间的间距 */
  text-align: center;
}

.footer-link {
  color: var(--text-dim);
  text-decoration: none;
  transition: .2s;
}

.footer-link:hover {
  color: #fff; /* 保持原有的悬停变白效果 */
}

/* 隐私政策高亮 */
.highlight-link {
  color: #818cf8; /* 使用你品牌的主色调（紫色） */
  font-weight: 500;
}

.highlight-link:hover {
  color: #a5b4fc;
}

.separator {
  color: var(--text-dim);
  opacity: 0.5;
}

/* 响应式：小屏幕下优化间距 */
@media (max-width: 600px) {
  .center-content {
    gap: 6px;
    line-height: 1.8; /* 换行后行间距更大，更易读 */
  }
}
</style>