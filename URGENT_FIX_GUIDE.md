# 紧急修复指南 - 解决当前部署问题

## 🚨 当前问题诊断

根据错误日志，发现以下问题：

### 1. ✅ CSP 策略问题 - 已修复
- **问题**: 内联脚本被阻止
- **状态**: 已修复，添加了 `'unsafe-inline'` 到 script-src

### 2. ✅ Turnstile 回调顺序问题 - 已修复  
- **问题**: `turnstileOnLoad` 函数未在脚本加载前定义
- **状态**: 已修复，调整了脚本加载顺序

### 3. ⚠️ API 500 错误 - 需要配置环境变量
- **问题**: `TURNSTILE_SITE_KEY` 环境变量未设置
- **状态**: 需要用户在 Cloudflare Pages 中配置

## 🔧 立即修复步骤

### 步骤 1: 配置 Cloudflare Pages 环境变量

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** > 选择你的项目 **swabox-site**
3. 点击 **Settings** > **Environment variables**
4. 添加以下环境变量：

#### Production 环境
```
TURNSTILE_SITE_KEY=0x4AAAAAADTy6YTSxcziFVXR
TURNSTILE_SECRET_KEY=你的_secret_key_这里
ALLOWED_ORIGINS=https://swabox.cc.cd
```

#### Preview 环境（可选）
```
TURNSTILE_SITE_KEY=0x4AAAAAADTy6YTSxcziFVXR
TURNSTILE_SECRET_KEY=你的_secret_key_这里
ALLOWED_ORIGINS=https://swabox.cc.cd
```

### 步骤 2: 获取 Secret Key

1. 访问 [Cloudflare Turnstile 控制台](https://dash.cloudflare.com/?to=/:account/turnstile)
2. 找到你的 Site Key: `0x4AAAAAADTy6YTSxcziFVXR`
3. 复制对应的 **Secret Key**
4. 将 Secret Key 粘贴到上面的环境变量配置中

### 步骤 3: 重新部署

配置环境变量后，需要重新部署项目：

```bash
# 方法 1: 通过 Git 推送触发部署
git add .
git commit -m "fix: 修复 CSP 和 API 配置"
git push

# 方法 2: 通过 Cloudflare Dashboard 手动部署
# 在项目页面点击 "Create deployment"
```

### 步骤 4: 验证修复

部署完成后，访问网站并检查：

1. **浏览器控制台** - 应该看到：
   ```
   Turnstile 库加载完成
   成功获取 Site Key: 0x4AAAAAA...
   ```

2. **网络请求** - `/api/get-sitekey` 应该返回 200 状态码

3. **验证功能** - Turnstile 验证组件应该正常显示

## 🧪 快速测试

### 测试 API 端点

在浏览器中访问：
```
https://swabox.cc.cd/api/get-sitekey
```

应该返回：
```json
{
  "success": true,
  "sitekey": "0x4AAAAAADTy6YTSxcziFVXR"
}
```

### 测试 Turnstile 功能

1. 访问 `https://swabox.cc.cd/`
2. 应该看到安全验证页面
3. 完成 Turnstile 验证
4. 应该跳转到主页

## 🐛 如果问题仍然存在

### 检查环境变量是否生效

创建一个测试函数来验证环境变量：

1. 创建文件 `functions/api/test-env.js`:
```javascript
export async function onRequestGet(context) {
  const { env } = context;
  
  return new Response(JSON.stringify({
    siteKeyExists: !!env.TURNSTILE_SITE_KEY,
    secretKeyExists: !!env.TURNSTILE_SECRET_KEY,
    allowedOrigins: env.ALLOWED_ORIGINS,
    allKeys: Object.keys(env || {})
  }));
}
```

2. 访问 `https://swabox.cc.cd/api/test-env`
3. 检查返回的环境变量状态

### 查看 Cloudflare Pages 日志

1. 进入 Cloudflare Pages 项目
2. 点击 **Functions** > **Logs**
3. 查看函数执行日志
4. 寻找环境变量相关的错误信息

### 常见问题解决

#### 问题: 环境变量配置后仍然 500 错误

**解决方案**:
- 确认环境变量名称拼写正确（区分大小写）
- 重新部署项目以应用环境变量更改
- 清除浏览器缓存

#### 问题: Turnstile 组件不显示

**解决方案**:
- 检查域名是否在 Turnstile 控制台配置中
- 验证 CSP 策略允许 Turnstile 域名
- 查看浏览器控制台的错误信息

#### 问题: 验证成功后不跳转

**解决方案**:
- 检查 localStorage 是否正常工作
- 验证路由配置正确
- 查看控制台的验证成功日志

## 📞 获取帮助

如果以上步骤都无法解决问题，请：

1. 收集以下信息：
   - 浏览器控制台的完整错误日志
   - 网络请求的详细信息
   - Cloudflare Pages 函数日志

2. 检查：
   - [CLOUDFLARE_PAGES_SETUP.md](CLOUDFLARE_PAGES_SETUP.md) - 详细配置指南
   - [.env.example](.env.example) - 环境变量示例

3. 验证：
   - Cloudflare Turnstile 控制台中的域名配置
   - 环境变量是否正确设置
   - 项目是否成功部署

## ✅ 修复确认清单

- [ ] Cloudflare Pages 环境变量已配置
- [ ] TURNSTILE_SITE_KEY 已设置
- [ ] TURNSTILE_SECRET_KEY 已设置  
- [ ] ALLOWED_ORIGINS 已设置
- [ ] 项目已重新部署
- [ ] /api/get-sitekey 返回 200 状态码
- [ ] Turnstile 组件正常显示
- [ ] 验证功能正常工作
- [ ] 浏览器控制台无错误

完成以上步骤后，您的网站应该可以正常工作了！🎉