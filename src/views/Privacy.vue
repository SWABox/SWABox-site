<template>
  <div class="privacy-page">
    <NavBar />
    <main class="main-content">
      <div class="container">
        <div class="document-card">
          <h1 class="title">隐私政策</h1>
          <p class="update-date"><strong>最后更新日期：2026年5月20日</strong></p>

          <div class="mit-notice">
            <strong>开源协议声明：</strong> SWABox 项目源代码采用 <strong> MIT 开源许可证</strong>。这意味着您可以自由使用、复制、修改和分发本软件，但必须包含原始的版权声明。本隐私政策仅规范网站访问及软件使用过程中的数据处理行为，不影响您对源代码的合法使用权利。
          </div>

          <h2>引言</h2>
          <p>欢迎访问 SWABox 网站（以下简称“本站”）。本隐私政策旨在向您说明我们在您使用本站服务时，如何处理您的相关信息。我们严格遵守中国《个人信息保护法》及通用数据保护规范，尽力确保数据处理透明、最小化。</p>

          <h2>1. 开源与数据处理的独立性</h2>
          <p>SWABox 项目源代码完全托管于 <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="url">GitHub</a>，采用 MIT 许可证。本隐私政策仅适用于本站（域名 swabox.cc.cd）的网站服务，与您本地运行的 SWABox 软件无关。我们承诺：</p>
          <ul>
            <li><strong>代码透明</strong>：软件本体无任何隐蔽数据收集代码或后门。</li>
            <li><strong>数据分离</strong>：本政策所述的数据处理（如 Cloudflare 托管、Turnstile 验证、Web Analytics）仅发生在网站服务端，您本地运行软件时产生的数据完全由您自己控制。</li>
          </ul>

          <h2>2. 我们如何收集和使用您的信息</h2>
          <p><strong>本站为纯静态网站，无后端数据库，不设用户注册登录、评论留言等功能，自身不直接收集您的个人身份信息，不使用 Cookie 或 LocalStorage 进行追踪。</strong></p>
          <p>但在使用以下第三方必要服务时，可能会间接处理某些技术数据：</p>

          <table class="data-table">
            <thead>
            <tr>
              <th>处理场景</th>
              <th>处理的信息类型</th>
              <th>处理目的</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>安全验证</td>
              <td>IP 地址、浏览器指纹、User-Agent 标头、TLS 指纹等技术信号</td>
              <td>防御恶意机器人攻击，保障网站安全稳定运行</td>
            </tr>
            <tr>
              <td>内容分发</td>
              <td>IP 地址、请求时间、User-Agent 标头</td>
              <td>提供 CDN 加速服务，实现快速访问</td>
            </tr>
            <tr>
              <td>网站分析</td>
              <td>页面浏览、引用来源、设备类型、国家/地区等匿名统计数据</td>
              <td>了解网站访问情况，优化内容与性能</td>
            </tr>
            <tr>
              <td>邮件通信</td>
              <td>您主动提供的邮箱地址及邮件内容</td>
              <td>回复您的咨询与请求</td>
            </tr>
            </tbody>
          </table>

          <h2>3. Cloudflare Turnstile 安全验证</h2>
          <p>本站全站启用 <strong>Cloudflare Turnstile 托管验证</strong>（自动切换无交互与手动验证），作为防御恶意攻击的必要安全措施。其法律基础为《个人信息保护法》第十三条第（二）款规定的“为订立、履行合同所必需”或“为维护合法权益所必需”。</p>
          <p>Cloudflare 作为数据处理者可能会处理上述技术信号，但承诺：<strong>不将 Turnstile 数据用于广告投放、用户画像或跨站追踪</strong>，数据留存一般不超过数周。详见 <a href="https://www.cloudflare-cn.com/turnstile-privacy-policy/" target="_blank" class="url">Cloudflare Turnstile 隐私政策</a>。</p>

          <h2>4. Cloudflare Pages 托管平台</h2>
          <p>本站托管于 Cloudflare Pages，利用其全球 CDN 网络加速访问。作为数据处理者，Cloudflare 会自动记录必要的技术信息以实现加速和安全防护，该信息仅短暂留存。</p>

          <h2>5. Cloudflare Web Analytics 统计</h2>
          <p>本站使用 <strong>Cloudflare Web Analytics</strong> 进行匿名访问统计。这是一种隐私优先的分析工具，具有以下特点：</p>
          <ul>
            <li><strong>不设置 Cookie</strong>，不使用任何客户端追踪技术。</li>
            <li>收集的信息仅为聚合后的<strong>匿名统计数据</strong>（如页面浏览量、引用来源、国家/地区级别地理信息），不包含个人标识符，无法识别特定用户。</li>
            <li>仅用于了解网站使用状况、优化服务，<strong>绝不用于广告或用户画像</strong>。</li>
          </ul>
          <p>Cloudflare 为此服务的数据处理者，其隐私政策同样适用于本服务。详情参阅 <a href="https://www.cloudflare-cn.com/privacypolicy/" target="_blank" class="url">Cloudflare 隐私政策</a>。</p>

          <h2>6. 通信与邮件处理</h2>
          <p>若您通过 <strong>content@swabox.cc.cd</strong> 联系我们，邮件将通过 Cloudflare Email Routing 转发。我们仅将您提供的信息用于回复咨询，不作其他用途。</p>

          <h2>7. 您的权利</h2>
          <p>根据中国《个人信息保护法》及相关法律，您享有以下权利：</p>
          <ul>
            <li><strong>知情权与查阅权</strong>：您有权知晓我们如何处理您的信息。由于本站不直接收集个人信息，且源代码完全公开，您可通过审查 <a href="https://github.com/liyunhan177/SWABox" target="_blank" class="url">项目仓库</a> 代码自行核实数据处理逻辑。</li>
            <li><strong>修改权</strong>：您可在遵守 MIT 许可证的前提下，自行部署或修改软件，以改变数据处理方式。</li>
            <li><strong>补充与删除权</strong>：若您发现涉及您的信息不完整或有误，或认为处理目的已实现、我们已无必要处理您的相关信息，您有权要求我们进行补充或删除。我们将在十五个工作日内响应您的请求。</li>
          </ul>

          <h2>8. 政策更新</h2>
          <p>我们可能会更新本隐私政策。重大变更将通过 <a href="https://github.com/liyunhan177/SWABox-site" target="_blank" class="url">网站仓库</a> 的 Release Notes 或 Issue 通知。</p>

          <h2>9. 联系我们</h2>
          <p>如有任何疑问或欲行使上述权利，请通过以下方式联系：</p>
          <ul>
            <li>GitHub Issues：<a href="https://github.com/liyunhan177/SWABox-site/issues" target="_blank" class="url">SWABox-site Issues</a></li>
            <li>邮箱：<a href="mailto:content@swabox.cc.cd" class="url">content@swabox.cc.cd</a></li>
          </ul>

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

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
</script>

<style scoped>
/* 原有样式保持不变 */
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

.url {
  color: var(--green-primary);
}

.url:hover {
  color: var(--green-primary);
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

/* 新增表格样式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  color: var(--text);
  background: var(--surface);
}

.data-table th,
.data-table td {
  border: 1px solid var(--border);
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: top;
}

.data-table th {
  background: rgba(6, 182, 212, 0.05);
  font-weight: 600;
  white-space: nowrap;
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

  .data-table th,
  .data-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>