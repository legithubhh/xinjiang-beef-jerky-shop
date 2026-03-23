# 🖼️ 静态资源

> 本文件夹存放网站的静态资源文件

---

## 📋 文件夹说明

`public/` 用于存放**直接提供给浏览器**的静态文件，这些文件不会被构建工具处理。

### 资源类型

- 📄 HTML 文件（入口）
- 🖼️ 图片资源
- 🎨 网站图标
- 📱 移动端图标
- 🔤 字体文件

---

## 📁 文件结构

```
public/
├── 📄 index.html          # 网站入口 HTML
├── 🖼️ favicon.ico         # 网站图标（16x16, 32x32）
├── 🖼️ icon-192.png        # PWA 图标（192x192）
├── 🖼️ icon-512.png        # PWA 图标（512x512）
├── 📱 apple-touch-icon.png # iOS 图标
├── 📄 manifest.json       # PWA 清单文件
├── 📄 robots.txt          # 搜索引擎爬虫规则
└── 📂 images/             # 图片资源（待创建）
    ├── products/          # 产品图片
    ├── banners/           # 横幅图片
    └── icons/             # 图标
```

---

## 📄 核心文件

### 1. index.html

**说明**: 网站的入口 HTML 文件

**关键内容**:
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="正宗新疆手工牛肉干在线订购">
    <title>新疆手工牛肉干</title>
    <link rel="icon" href="/favicon.ico">
</head>
<body>
    <div id="app">
        <header id="header"></header>
        <main id="main"></main>
        <footer id="footer"></footer>
    </div>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

**修改指南**:
- 修改标题：更新 `<title>` 标签
- 修改描述：更新 `<meta name="description">`
- 添加资源：在 `<head>` 中添加链接

### 2. favicon.ico

**说明**: 浏览器标签页图标

**规格**:
- 16x16 像素（标准）
- 32x32 像素（高分辨率）
- 格式：ICO

**生成工具**: [favicon.io](https://favicon.io/)

### 3. manifest.json

**说明**: PWA（渐进式 Web 应用）清单文件

**示例**:
```json
{
  "name": "新疆手工牛肉干",
  "short_name": "牛肉干",
  "description": "正宗新疆风味手工牛肉干在线订购",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#c41e3a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 4. robots.txt

**说明**: 搜索引擎爬虫规则

**示例**:
```txt
User-agent: *
Allow: /

# 禁止爬取 API
Disallow: /api/

# 网站地图
Sitemap: https://example.com/sitemap.xml
```

---

## 🖼️ 图片资源

### 产品图片

**位置**: `public/images/products/`

**命名规范**:
```
product-{id}-{name}.jpg
示例：product-1-spicy-beef.jpg
```

**规格建议**:
- 主图：800x800 像素
- 缩略图：200x200 像素
- 格式：WebP（优先）或 JPG
- 质量：80%

### 横幅图片

**位置**: `public/images/banners/`

**规格建议**:
- 首页横幅：1920x600 像素
- 移动端横幅：750x300 像素

### 图标

**位置**: `public/images/icons/`

**规格**:
- 功能图标：24x24, 48x48 像素
- 格式：SVG（优先）或 PNG

---

## 📝 使用指南

### 添加新图片

1. 将图片放入对应文件夹
2. 优化图片大小（使用工具压缩）
3. 在代码中引用

```javascript
// 在组件中使用
const imageUrl = '/images/products/product-1.jpg';
```

### 优化图片

**推荐工具**:
- [TinyPNG](https://tinypng.com/) - 在线压缩
- [Squoosh](https://squoosh.app/) - 格式转换
- [ImageOptim](https://imageoptim.com/) - Mac 应用

### 添加 PWA 支持

1. 创建 `manifest.json`
2. 添加图标文件
3. 在 HTML 中引用

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#c41e3a">
```

---

## 📌 注意事项

### 文件大小

- 单张图片 < 500KB
- 首页总资源 < 2MB
- 使用懒加载优化

### 命名规范

- ✅ 使用小写字母
- ✅ 使用连字符分隔：`product-image.jpg`
- ❌ 不要使用空格：`product image.jpg`
- ❌ 不要使用中文：`产品.jpg`

### 版权注意

- ✅ 使用自有图片
- ✅ 使用免版权图片
- ❌ 不要使用未授权图片

---

## 🔗 相关资源

### 设计资源

- [Unsplash](https://unsplash.com/) - 免费高质量图片
- [IconFont](https://www.iconfont.cn/) - 中文图标库
- [Font Awesome](https://fontawesome.com/) - 英文图标库

### 工具

- [TinyPNG](https://tinypng.com/) - 图片压缩
- [Squoosh](https://squoosh.app/) - 图片处理
- [Canva](https://www.canva.com/) - 在线设计

---

## 🔗 相关文档

- [前端代码说明](../src/README.md) - 如何使用静态资源
- [项目章程](../docs/CHARTER.md) - 项目规范

---

> 🖼️ **保持资源整洁、优化、有版权！**

*最后更新：2026-03-22*
