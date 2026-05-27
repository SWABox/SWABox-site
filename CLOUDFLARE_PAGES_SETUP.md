# Cloudflare Pages 环境变量配置

在部署到 Cloudflare Pages 时，需要在项目设置中配置以下环境变量：

## 必需的环境变量

### 1. TURNSTILE_SITE_KEY
- **描述**: Cloudflare Turnstile Site Key（公钥）
- **用途**: 前端初始化 Turnstile 验证组件
- **获取方式**: 
  1. 访问 [Cloudflare Turnstile 控制台](https://dash.cloudflare.com/?to=/:account/turnstile)
  2. 创建或选择现有的 Site Key
  3. 复制 Site Key 值
- **示例值**: `0x4AAAAAADTy6YTSxcziFVXR`

### 2. TURNSTILE_SECRET_KEY
- **描述**: Cloudflare Turnstile Secret Key（私钥）
- **用途**: 后端验证 Turnstile Token 的有效性
- **获取方式**: 
  1. 在同一 Turnstile 控制台页面
  2. 找到对应的 Secret Key
  3. 复制 Secret Key 值
- **示例值**: `0x4AAAAAADTy6YTSxcziFVXR_secret_key`

### 3. ALLOWED_ORIGINS
- **描述**: 允许访问 API 的域名列表
- **用途**: CORS 安全控制，防止跨域攻击
- **格式**: 逗号分隔的域名列表
- **示例值**: `https://swabox.cc.cd,https://www.swabox.cc.cd`

## 可选的环境变量

### VITE_TURNSTILE_SITE_KEY（仅本地开发）
- **描述**: 本地开发环境的 Site Key
- **用途**: 本地开发时备用 Site Key
- **文件**: 本地 `.env` 文件
- **示例值**: `0x4AAAAAADTy6YTSxcziFVXR`

### VITE_ENABLE_SECURITY（仅开发环境）
- **描述**: 强制启用安全验证
- **用途**: 开发环境中测试完整的安全验证流程
- **值**: `true` 或 `false`
- **默认值**: `false`（开发环境跳过验证）

## 配置步骤

### Cloudflare Pages 配置

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择你的 Pages 项目
3. 进入 **Settings** > **Environment variables**
4. 点击 **Add variable** 添加以下环境变量：
   ```
   TURNSTILE_SITE_KEY=your_site_key_here
   TURNSTILE_SECRET_KEY=your_secret_key_here
   ALLOWED_ORIGINS=https://your-domain.com
   ```
5. 分别为 **Production** 和 **Preview** 环境配置

### 本地开发配置

1. 复制 `.env.example` 为 `.env`:
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，设置本地开发变量：
   ```env
   VITE_TURNSTILE_SITE_KEY=0x4AAAAAADTy6YTSxcziFVXR
   VITE_ENABLE_SECURITY=false
   ```

## 安全注意事项

1. **永远不要**将 `TURNSTILE_SECRET_KEY` 提交到版本控制系统
2. `.env` 文件已在 `.gitignore` 中，确保本地开发密钥安全
3. 定期轮换 Turnstile 密钥对
4. 监控异常的验证失败请求
5. 限制 `ALLOWED_ORIGINS` 为你的实际域名

## 验证配置

部署后，可以通过以下方式验证配置：

1. **检查 Site Key API**:
   ```bash
   curl https://your-domain.com/api/get-sitekey
   ```
   应返回:
   ```json
   {
     "success": true,
     "sitekey": "0x4AAAAAADTy6YTSxcziFVXR"
   }
   ```

2. **完成验证流程**:
   - 访问网站首页
   - 完成人机验证
   - 检查是否正常跳转

3. **查看浏览器控制台**:
   - 确认没有配置错误
   - 检查 API 请求是否成功

## 故障排除

### Site Key 未加载 (500 错误)

**症状**: `/api/get-sitekey` 返回 500 错误

**解决方案**:
1. 检查 Cloudflare Pages 环境变量是否正确设置
2. 确认 `TURNSTILE_SITE_KEY` 变量名拼写正确
3. 查看 Cloudflare Pages 函数日志
4. 重新部署项目以应用环境变量更改

### 验证失败

**症状**: Turnstile 验证一直失败

**解决方案**:
1. 确认 `TURNSTILE_SECRET_KEY` 正确
2. 检查域名是否在 Turnstile 控制台配置中
3. 验证 `ALLOWED_ORIGINS` 包含当前域名
4. 检查浏览器控制台的错误信息

### CSP 错误

**症状**: 浏览器控制台显示 CSP 违规

**解决方案**:
1. 检查 `index.html` 中的 CSP 策略
2. 确保所有外部域名都在白名单中
3. 验证 Turnstile 脚本加载顺序正确

### CORS 错误

**症状**: API 请求被 CORS 策略阻止

**解决方案**:
1. 确认 `ALLOWED_ORIGINS` 配置正确
2. 检查请求来源是否在允许列表中
3. 验证 API 端点的 CORS 响应头

### Turnstile 回调未找到

**症状**: `Unable to find onload callback 'turnstileOnLoad'`

**解决方案**:
1. 确保 `window.turnstileOnLoad` 在 Turnstile 脚本加载前定义
2. 检查脚本加载顺序
3. 验证 CSP 策略允许内联脚本

## 调试技巧

### 启用详细日志

在开发环境中，可以通过浏览器控制台查看详细日志：

```javascript
// 在浏览器控制台中执行
localStorage.setItem('debug', 'true');
```

### 检查环境变量

创建一个测试端点来验证环境变量：

```javascript
// functions/api/debug.js
export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    env: Object.keys(context.env),
    hasSiteKey: !!context.env.TURNSTILE_SITE_KEY,
    hasSecretKey: !!context.env.TURNSTILE_SECRET_KEY
  }));
}
```

### 网络请求分析

使用浏览器开发者工具的网络面板：

1. 打开开发者工具 (F12)
2. 切换到 Network 标签
3. 刷新页面
4. 检查 `/api/get-sitekey` 和 `/api/verify-turnstile` 请求
5. 查看请求和响应的详细信息

## 部署检查清单

- [ ] 在 Cloudflare Pages 中配置所有必需的环境变量
- [ ] 验证 `TURNSTILE_SITE_KEY` 和 `TURNSTILE_SECRET_KEY` 正确
- [ ] 设置 `ALLOWED_ORIGINS` 为你的实际域名
- [ ] 在 Turnstile 控制台中添加你的域名
- [ ] 本地测试验证功能正常
- [ ] 部署到 Cloudflare Pages
- [ ] 在生产环境中测试完整流程
- [ ] 检查浏览器控制台无错误
- [ ] 验证 CSP 策略正常工作
- [ ] 测试移动端兼容性