# SWABox 网站开发文档

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 🔧 开发配置

### 访问验证和错误页面

在开发模式（本地运行）下，你可以通过以下路由访问不同页面：

| 页面 | 路由 | 说明 |
|------|------|------|
| 验证页面 | `/challenge` | Cloudflare Turnstile 人机验证页面 |
| 403 错误 | `/error/403` | 禁止访问页面 |
| 404 错误 | `/error/404` | 页面未找到 |
| 500 错误 | `/error/500` | 服务器错误 |
| 502 错误 | `/error/502` | 网关错误 |
| 503 错误 | `/error/503` | 服务不可用 |

### 开发模式说明

在开发环境中（`npm run dev`），验证守卫会自动跳过，你可以直接访问任何页面进行测试。

在生产环境中，验证会正常工作。

---

## 🌐 生产环境 Turnstile 配置指南

### 重要：域名配置问题

如果您在生产环境中遇到以下错误：
```
Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://challenges.cloudflare.com') does not match the recipient window's origin ('https://your-domain.com')
```

这是因为 Cloudflare Turnstile 的域名配置不正确。

### 解决步骤

#### 1. 登录 Cloudflare Turnstile 控制台
访问：https://dash.cloudflare.com/?to=/:account/turnstile

#### 2. 找到您的 Site Key
当前使用的 Site Key：`0x4AAAAAADTy6YTSxcziFVXR`

#### 3. 添加域名到白名单
在 Turnstile 控制台中：
1. 点击您的 Site Key 设置
2. 找到 "Domain" 或 "域名" 配置项
3. 添加您的实际域名，例如：
   - `swabox.cc.cd`
   - `*.swabox.cc.cd` (支持所有子域名)
   - `localhost` (开发环境)

#### 4. 保存并等待生效
配置更改通常需要 1-5 分钟生效。

#### 5. 验证配置
打开浏览器控制台，查看诊断信息：
```javascript
// 应该看到类似输出：
=== Turnstile 诊断信息 ===
当前域名: swabox.cc.cd
完整 URL: https://swabox.cc.cd/
Turnstile 库状态: 已加载
Site Key: 0x4AAAAAADTy6YTSxcziFVXR
```

### 常见问题

**Q: 为什么开发环境正常，生产环境报错？**
A: 开发环境使用 localhost，而生产环境需要您在 Turnstile 控制台中配置实际域名。

**Q: 配置后仍然报错怎么办？**
A: 1. 清除浏览器缓存 2. 等待 5-10 分钟让配置生效 3. 检查域名拼写是否正确

**Q: 支持多个域名吗？**
A: 支持，在 Turnstile 控制台中可以添加多个域名，用逗号分隔。

---

## ⏭️ 开发跳过验证功能

### 功能说明

在人机验证页面添加了一个**开发模式跳过按钮**，方便开发时直接进入网站。

### 如何删除此功能

当你准备部署到生产环境时，有以下几种方式删除此功能：

#### 方法一：删除相关代码（推荐）

1. 打开文件：`src/components/TurnstileChallenge.vue`

2. 删除以下部分：

   **模板部分（Template）：**
   ```vue
   <!-- 开发跳过按钮 - 仅开发环境显示 -->
   <div class="dev-panel" v-if="isDevelopment">
     <span class="dev-badge">开发模式</span>
     <button @click="handleSkip" class="dev-btn">跳过验证</button>
   </div>
   ```

   **脚本部分（Script）：**
   ```javascript
   // 开发模式检测
   const isDevelopment = import.meta.env.DEV;
   
   // 开发跳过功能
   function handleSkip() {
     console.log('开发模式：跳过人机验证');
     const fakeToken = 'dev-mode-fake-token-' + Date.now();
     emit('verified', fakeToken);
   }
   ```

   **样式部分（Style）：**
   ```css
   .dev-panel {
     position: fixed;
     top: 16px;
     right: 16px;
     display: flex;
     align-items: center;
     gap: 12px;
     background: var(--bg-surface);
     border: 1px solid var(--border-default);
     padding: 8px 12px;
     border-radius: var(--radius-md);
     z-index: 1000;
   }
   
   .dev-badge {
     background: var(--green-glow);
     color: var(--green-primary);
     font-family: var(--font-mono);
     font-size: 0.7rem;
     font-weight: 700;
     padding: 4px 10px;
     border-radius: 999px;
     text-transform: uppercase;
     letter-spacing: 0.08em;
   }
   
   .dev-btn {
     background: transparent;
     color: var(--text-secondary);
     border: none;
     padding: 6px 12px;
     font-size: 0.85rem;
     cursor: pointer;
     border-radius: var(--radius-sm);
     transition: all 0.2s;
   }
   
   .dev-btn:hover {
     background: var(--bg-hover);
     color: var(--green-primary);
   }
   ```

#### 方法二：使用 CSS 隐藏（临时方案）

在 `src/style.css` 中添加：
```css
/* 永久隐藏开发跳过按钮 */
.dev-panel {
  display: none !important;
}
```

#### 方法三：修改条件渲染

将 `v-if="isDevelopment"` 改为 `v-if="false"`：
```vue
<div class="dev-panel" v-if="false">
  <!-- ... -->
</div>
```

### 验证功能在生产环境的注意事项

⚠️ **重要提醒：**

1. 确保设置了正确的 `VITE_TURNSTILE_SITE_KEY` 环境变量
2. 生产环境的验证 token 需要在服务器端通过 Cloudflare API 验证
3. 跳过的 token 在生产环境中**不会通过服务器验证**

### 环境变量配置

创建 `.env` 文件：

```env
# 开发环境
VITE_TURNSTILE_SITE_KEY=your_dev_site_key_here

# 生产环境（使用不同的 key）
VITE_TURNSTILE_SITE_KEY=your_prod_site_key_here
```

获取 Site Key：https://dash.cloudflare.com/turnstile

---

## 🎨 UI 设计系统

### 配色方案

```css
:root {
  --bg-base: #0a0a0a;
  --bg-elevated: #111111;
  --bg-surface: #181818;
  --bg-hover: #1f1f1f;

  --green-dim: #4ade80;
  --green-primary: #22c55e;
  --green-light: #86efac;
  --green-muted: #166534;
  --green-glow: rgba(34, 197, 94, 0.15);

  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --text-dim: #52525b;

  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  --nav-height: 64px;

  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
```

### 设计特点

- 🎯 **《黑客与画家》风格** - 深灰 + 淡绿配色
- 🎨 噪点背景效果
- ⚡ 平滑的微交互动画
- 📱 完全响应式设计
- 🎭 不对称布局设计

### 禁止事项

根据设计规范，以下内容应该避免：

- ❌ 紫色或靛蓝色渐变
- ❌ 纯平背景色（必须有噪点或渐变）
- ❌ 完美居中对齐
- ❌ 等宽多栏（必须不对称）
- ❌ 高深的专业名词和无意义空话
- ❌ Lorem Ipsum 占位文本
- ❌ 被动时态和长句
- ❌ 默认 UI 组件库（必须深度定制）
- ❌ Emoji 作为功能图标
- ❌ 线性 ease-in-out 动画

---

## 📦 项目结构

```
swabox-site/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── NavBar.vue      # 导航栏
│   │   ├── HeroSection.vue # 英雄区
│   │   ├── Features.vue     # 功能特性
│   │   ├── TechStack.vue    # 技术栈
│   │   ├── DownloadSection.vue # 下载区
│   │   ├── SiteFooter.vue   # 页脚
│   │   └── TurnstileChallenge.vue # 验证页面
│   ├── views/              # 页面视图
│   │   ├── Home.vue        # 首页
│   │   ├── Privacy.vue     # 隐私政策
│   │   ├── Terms.vue       # 用户协议
│   │   ├── Challenge.vue   # 验证页
│   │   └── Error.vue       # 错误页（通用）
│   ├── router/             # 路由配置
│   ├── assets/             # 静态资源
│   ├── App.vue            # 根组件
│   ├── main.js            # 入口文件
│   └── style.css          # 全局样式
├── public/                # 公共资源
│   ├── logo-nobg.png      # Logo
│   └── 其他静态文件...
├── functions/             # Cloudflare Functions
├── _redirects             # 路由重定向配置
├── DEV_GUIDE.md           # 本文档
└── ...
```

---

## 🔧 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4
- **样式**: CSS 变量 + 自定义动画
- **人机验证**: Cloudflare Turnstile
- **后端**: Cloudflare Functions (用于验证 token)
- **部署**: Cloudflare Pages

---

## 🌐 部署

项目配置为部署到 Cloudflare Pages：

```bash
# 构建
npm run build

# 部署（使用 Wrangler）
wrangler pages deploy dist
```

详细部署指南：[Cloudflare Pages 部署文档](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/)

---

## 📝 开发注意事项

1. **环境变量**: 确保在 `.env` 中配置必要的环境变量
2. **验证机制**: 开发模式会自动跳过验证
3. **本地存储**: 验证状态存储在 localStorage，有效期 24 小时
4. **错误页面**: 访问 `/error/:code` 查看不同错误状态
5. **Logo 更新**: 使用 `public/logo-nobg.png` 替换原有图标

---

## 🔐 安全建议

1. ✅ 不要在客户端存储敏感信息
2. ✅ 所有验证 token 在服务器端验证
3. ✅ 使用 HTTPS
4. ✅ 定期更新依赖
5. ✅ 监控异常访问
6. ✅ 部署前移除开发跳过按钮

---

## 📚 学习资源

- [Vue 3 文档](https://vuejs.org/)
- [Vite 指南](https://vitejs.dev/)
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)
- [《黑客与画家》](https://book.douban.com/subject/6021448/)

---

**版本**: 2.0.0  
**最后更新**: 2026-05-22