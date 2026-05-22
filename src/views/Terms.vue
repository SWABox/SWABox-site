<template>
  <div class="terms-page">
    <NavBar />
    <main class="main-content">
      <div class="container">
        <div class="document-card">
          <h1 class="title">用户协议</h1>
          <p class="effective-date"><strong>生效日期：2026年5月20日</strong></p>

          <div class="mit-highlight">
            <strong>MIT 许可证适用：</strong> 本软件（SWABox）受 MIT 许可证保护。除本用户协议外，您对软件的使用还受限于 <a href="https://opensource.org/licenses/MIT" target="_blank">MIT 许可证</a> 的条款。简而言之：您可以自由使用，但需承担风险，且必须保留版权声明。
          </div>

          <h2>1. 协议范围</h2>
          <p>本协议适用于您对本网站及 SWABox 软件的使用行为。本服务托管于 Cloudflare 平台。</p>

          <h2>2. 人机验证机制</h2>
          <p>本服务采用 Cloudflare Turnstile 托管模式（自动切换无交互与手动验证）。您同意配合完成必要的验证流程以确保服务安全。</p>

          <h2>3. 用户权利与义务</h2>
          <p>3.1 <strong>开源权利</strong>：根据 MIT 协议，您有权运行、复制、分发、研究和改进本软件。</p>
          <p>3.2 <strong>使用限制</strong>：您不得将本软件用于非法用途，不得试图绕过 Cloudflare 的安全防护机制。</p>
          <p>3.3 <strong>商标保留</strong>：MIT 许可证授予您代码使用权，但不授予您使用 SWABox 名称、Logo 或品牌标识进行商业推广的权利，除非获得明确授权。</p>

          <h2>4. 知识产权</h2>
          <p>4.1 软件代码：受 MIT 许可证保护，版权归开发者所有。</p>
          <p>4.2 网站内容：包括设计、文案、Logo 等，保留所有权利，未经允许不得用于其他项目。</p>

          <h2>5. 免责声明（MIT 标准条款）</h2>
          <p><strong>本软件按“原样”提供，没有任何明示或暗示的担保。</strong>作者或版权持有人不对任何索赔、损害或其他责任负责，无论这些责任是因合同、侵权还是其他原因引起的，与软件的使用或使用或其他交易有关。</p>
          <p>鉴于本项目为开源免费软件，开发者对因使用本软件（包括网站访问受阻、数据丢失等）造成的直接或间接损失不承担责任。</p>

          <h2>6. 协议变更</h2>
          <p>开发者有权随时更新本协议。对于开源用户，建议关注 GitHub 仓库的动态。</p>

          <h2>7. 联系我们</h2>
          <p>GitHub Issues：<a href="https://github.com/liyunhan177/SWABox/issues" target="_blank">项目 Issues 页面</a></p>

          <router-link to="/" class="back-link">← 返回 SWABox 首页</router-link>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import SiteFooter from '../components/SiteFooter.vue';

// 页面挂载时滚动到顶部
onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: calc(var(--nav-h) + 48px) 0 80px;
}

.document-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-bottom: 2px solid var(--border);
  padding-bottom: 1rem;
}

.effective-date {
  color: var(--text-dim);
  margin-bottom: 1.5rem;
}

.mit-highlight {
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #ef4444;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 var(--radius) var(--radius) 0;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: var(--text);
}

p {
  margin: 0.75rem 0;
  color: var(--text);
}

ul {
  margin: 1rem 0 1rem 2rem;
  color: var(--text);
}

li {
  margin: 0.5rem 0;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--accent2);
  text-decoration: underline;
}

.back-link {
  display: block;
  margin-top: 3rem;
  text-align: center;
  color: var(--text-dim);
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--accent);
  text-decoration: none;
}

@media (max-width: 768px) {
  .document-card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>
