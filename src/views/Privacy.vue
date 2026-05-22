<template>
  <div class="privacy-page">
    <NavBar />
    <main class="main-content">
      <div class="container">
        <div class="document-card">
          <h1 class="title">隐私政策</h1>
          <p class="update-date"><strong>最后更新日期：2026年5月20日</strong></p>

          <div class="mit-notice">
            <strong>开源协议声明：</strong> SWABox 项目源代码采用 <strong>MIT 开源许可证</strong>。这意味着您可以自由使用、复制、修改和分发本软件，但必须包含原始的版权声明。本隐私政策仅规范网站访问及软件使用过程中的数据处理行为，不影响您对源代码的合法使用权利。
          </div>

          <h2>1. 关于开源与数据隐私</h2>
          <p>由于 SWABox 是开源项目，您可以在 <a href="https://github.com/liyunhan177/SWABox" target="_blank">GitHub</a> 上审查所有源代码。我们承诺：</p>
          <ul>
            <li><strong>代码透明</strong>：软件本身不包含任何后门或隐蔽的数据收集代码。</li>
            <li><strong>数据分离</strong>：本政策所述的数据处理（如 Cloudflare 托管、Turnstile 验证）仅针对网站服务，与您本地运行的 SWABox 软件无关。</li>
          </ul>

          <h2>2. 我们收集的信息</h2>
          <p><strong>本站是一个纯静态网站，本身不具备后端数据库，因此我们不直接收集或存储您的个人身份信息。</strong></p>
          <ul>
            <li>本站没有用户注册、登录功能。</li>
            <li>没有评论、留言板等交互表单。</li>
            <li>本站自身不设置 Cookie，也不使用本地存储（LocalStorage）追踪用户。</li>
          </ul>

          <h2>3. Cloudflare Turnstile 隐私附加条款</h2>
          <p>为了防御恶意机器人攻击，本站全站启用 <strong>Cloudflare Turnstile 托管验证</strong>（自动切换无交互与手动验证）。</p>
          <p>Cloudflare 可能会处理您的 IP 地址、浏览器指纹等信息以区分人机。根据 MIT 协议的精神，我们选择的工具同样注重隐私：Cloudflare 承诺不将 Turnstile 数据用于广告或用户画像。</p>
          <p>详情请参阅：<a href="https://www.cloudflare.com/en-gb/turnstile-privacy-policy/" target="_blank">Cloudflare Turnstile 隐私政策</a>。</p>

          <h2>4. 托管平台自动记录的技术信息</h2>
          <p>本站托管于 Cloudflare Pages。当您访问时，Cloudflare 可能会自动记录您的 IP 地址、请求时间及 User-Agent 用于 CDN 加速和安全防护。</p>

          <h2>5. 通信与邮件处理</h2>
          <p>若您通过邮件 <strong>content@swabox.cc.cd</strong> 联系我们，邮件将通过 Cloudflare Email Routing 转发。</p>

          <h2>6. 您的权利</h2>
          <p>鉴于本项目为 MIT 开源项目，您享有以下额外权利：</p>
          <ul>
            <li><strong>审查权</strong>：您可以随时审查 GitHub 上的源代码，确认数据处理逻辑。</li>
            <li><strong>修改权</strong>：您可以在遵守 MIT 许可证的前提下，自行部署或修改软件，改变数据处理方式。</li>
          </ul>

          <h2>7. 政策更新</h2>
          <p>我们可能会不时更新本隐私政策。对于开源社区用户，重大变更将在 GitHub Repository 中通过 Release Notes 或 Issue 通知。</p>

          <h2>8. 联系我们</h2>
          <p>如有疑问，请通过 GitHub Issues 联系我们。</p>

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
.privacy-page {
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

.update-date {
  color: var(--text-dim);
  margin-bottom: 1.5rem;
}

.mit-notice {
  background: rgba(6, 182, 212, 0.1);
  border-left: 4px solid var(--accent2);
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
