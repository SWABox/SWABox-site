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

## ⏭️ 开发跳过验证功能

### 功能说明

在人机验证页面添加了一个**开发模式跳过按钮**，方便开发时直接进入网站。

### 特性

- ✅ **仅在开发环境显示**（`npm run dev` 时）
- ✅ **生产环境自动隐藏**（`npm run build` 时）
- ✅ 醒目的红色设计，容易识别
- ✅ 点击即可跳过验证直接进入网站

### 如何删除此功能

当您准备部署到生产环境时，有以下几种方式删除此功能：

#### 方法一：删除相关代码（推荐）

1. 打开文件：`src/components/TurnstileChallenge.vue`

2. 删除以下内容：

   **模板部分（Template）：**
   ```vue
   <!-- 开发跳过按钮 - 仅开发环境显示 -->
   <button 
     v-if="isDevelopment"
     @click="handleSkip"
     class="dev-skip-btn"
   >
     <span class="dev-badge">开发模式</span>
     <span>⏭️ 跳过验证</span>
   </button>
   ```

   **脚本部分（Script）：**
   ```javascript
   // 🔧 开发模式检测
   const isDevelopment = import.meta.env.DEV;
   
   // ⏭️ 开发跳过功能
   function handleSkip() {
     console.log('⏭️ 开发模式：跳过人机验证');
     // 生成一个假的 token 用于开发
     const fakeToken = 'dev-mode-fake-token-' + Date.now();
     emit('verified', fakeToken);
   }
   ```

   **样式部分（Style）：**
   ```css
   /* 开发跳过按钮 */
   .dev-skip-btn {
     position: fixed;
     top: 20px;
     right: 20px;
     z-index: 1000;
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 8px;
     background: linear-gradient(135deg, rgba(239,68,68,0.9), rgba(249,115,22,0.9));
     border: 2px solid rgba(255,255,255,0.2);
     padding: 12px 20px;
     border-radius: 16px;
     cursor: pointer;
     transition: all 0.3s cubic-bezier(.4,0,.2,1);
     box-shadow: 0 8px 32px rgba(239,68,68,0.4);
     animation: devPulse 2s ease-in-out infinite;
   }
   /* ... 更多样式 ... */
   ```

#### 方法二：使用 CSS 隐藏（临时方案）

在 `src/style.css` 中添加：
```css
/* 永久隐藏开发跳过按钮 */
.dev-skip-btn {
  display: none !important;
}
```

#### 方法三：修改条件渲染

将 `v-if="isDevelopment"` 改为 `v-if="false"`：
```vue
<button v-if="false" class="dev-skip-btn">
  <!-- ... -->
</button>
```

### 验证功能在生产环境的注意事项

⚠️ **重要提醒**：

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

## 🎨 UI 设计系统

### 色彩系统

```css
:root {
  --bg: #050508;           /* 主背景色 */
  --bg-alt: #080810;        /* 替代背景色 */
  --accent: #6366f1;        /* 主色调（蓝紫） */
  --accent-light: #818cf8;   /* 亮色accent */
  --accent2: #22d3ee;       /* 辅助色（青色） */
  --text: #f0f0f5;          /* 主文字色 */
  --text-dim: #8b8b9f;      /* 次要文字 */
  --text-muted: #5f5f7a;    /* 弱化文字 */
}
```

### 设计特点

- 🎯 **科技精致主义**风格
- ✨ 丰富的动画和过渡效果
- 🔮 玻璃拟态和光晕效果
- 📱 完全响应式设计
- ⚡ 流畅的滚动和悬停交互

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
│   ├── views/             # 页面视图
│   ├── router/            # 路由配置
│   ├── assets/            # 静态资源
│   ├── App.vue            # 根组件
│   ├── main.js            # 入口文件
│   └── style.css          # 全局样式
├── public/                # 公共资源
├── functions/             # Cloudflare Functions
├── package.json
└── vite.config.js
```

## 🔧 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4
- **动画**: AOS + 自定义 CSS 动画
- **样式**: CSS3 (变量、网格、Flexbox)
- **人机验证**: Cloudflare Turnstile
- **后端**: Cloudflare Functions (用于验证 token)

## 🌐 部署

项目配置为部署到 Cloudflare Pages：

```bash
# 构建
npm run build

# 部署（使用 Wrangler）
wrangler pages deploy dist
```

详细部署指南：[Cloudflare Pages 部署文档](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/)

## 📝 开发注意事项

1. **环境变量**：确保在 `.env` 中配置必要的环境变量
2. **验证机制**：开发跳过功能仅在本地开发时可用
3. **CORS 问题**：如果遇到 CORS 错误，检查 Cloudflare Functions 配置
4. **本地存储**：验证状态存储在 localStorage，有效期 24 小时

## 🔐 安全建议

1. ✅ 不要在客户端存储敏感信息
2. ✅ 所有验证 token 在服务器端验证
3. ✅ 使用 HTTPS
4. ✅ 定期更新依赖
5. ✅ 监控异常访问

## 📚 学习资源

- [Vue 3 文档](https://vuejs.org/)
- [Vite 指南](https://vitejs.dev/)
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)
- [AOS 动画库](https://michalsnik.github.io/aos/)

---

**版本**: 1.0.0  
**最后更新**: 2026-05-22
