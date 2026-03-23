# 💻 前端源代码

> 本文件夹包含网站的所有前端代码

---

## 📋 文件夹说明

`src/` 是前端代码的**唯一来源**，包含所有用户界面和交互逻辑。

### 设计原则

- **轻量级** - 无重型框架依赖，原生 JavaScript
- **组件化** - 可复用的 UI 组件
- **模块化** - ES6 模块，清晰的文件组织
- **响应式** - 适配各种设备尺寸

---

## 📁 文件结构

```
src/
├── 📄 main.js              # 应用入口和路由
├── 📂 components/          # UI 组件
│   ├── Header.js          # 页头导航
│   ├── Footer.js          # 页脚
│   └── README.md          # 组件说明
├── 📂 pages/               # 页面组件
│   ├── Home.js            # 首页
│   ├── Products.js        # 产品列表
│   ├── ProductDetail.js   # 产品详情
│   ├── Cart.js            # 购物车
│   ├── Checkout.js        # 订单结算
│   ├── OrderSuccess.js    # 订单成功
│   ├── OrderStatus.js     # 订单状态
│   ├── Orders.js          # 订单列表
│   ├── About.js           # 关于我们
│   └── README.md          # 页面说明
├── 📂 utils/               # 工具函数
│   ├── cart.js            # 购物车逻辑
│   ├── products.js        # 产品数据
│   └── README.md          # 工具说明
├── 📂 styles/              # 样式文件
│   ├── main.css           # 主样式
│   └── README.md          # 样式说明
└── 📂 assets/              # 资源文件（待创建）
    ├── images/            # 图片
    └── fonts/             # 字体
```

---

## 🔧 核心模块

### 1. 入口文件 (main.js)

**职责**: 应用初始化、路由管理、组件渲染

```javascript
// 路由示例
class Router {
    handleRoute() {
        const hash = window.location.hash;
        // 根据 hash 渲染不同页面
    }
}
```

**修改指南**:
- 添加新路由：在 `handleRoute()` 中添加 case
- 修改初始化逻辑：在 `init()` 方法中

### 2. 组件 (components/)

**职责**: 可复用的 UI 组件

| 组件 | 说明 | 是否静态 |
|------|------|----------|
| Header.js | 页头导航，包含购物车计数 | ✅ |
| Footer.js | 页脚，联系信息和链接 | ✅ |

**组件规范**:
```javascript
export const ComponentName = {
    render() {
        return `<div>HTML 内容</div>`;
    },
    
    attachListeners() {
        // 事件绑定
    }
};
```

### 3. 页面 (pages/)

**职责**: 完整的页面内容

| 页面 | 路由 | 说明 |
|------|------|------|
| Home.js | #/ | 首页，品牌展示 |
| Products.js | #/products | 产品列表，支持筛选 |
| ProductDetail.js | #/product/:id | 产品详情 |
| Cart.js | #/cart | 购物车管理 |
| Checkout.js | #/checkout | 订单结算 |
| Orders.js | #/orders | 订单列表 |
| About.js | #/about | 关于我们 |

**页面规范**:
```javascript
export const PageName = {
    render(param1, param2) {
        // 返回页面 HTML
    },
    
    attachListeners() {
        // 绑定页面事件
    }
};
```

### 4. 工具函数 (utils/)

**职责**: 业务逻辑和数据管理

| 文件 | 说明 | 关键函数 |
|------|------|----------|
| cart.js | 购物车管理 | addToCart, removeFromCart |
| products.js | 产品数据 | getAllProducts, getProductById |

---

## 🎨 样式规范

### CSS 变量

在 `styles/main.css` 中定义：

```css
:root {
    --primary-color: #c41e3a;      /* 新疆红 */
    --secondary-color: #8b4513;    /* 牛肉棕 */
    --accent-color: #d4a76a;       /* 金色 */
}
```

### 响应式断点

```css
/* 手机 */
@media (max-width: 768px) { }

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) { }

/* 电脑 */
@media (min-width: 1025px) { }
```

---

## 📝 开发指南

### 添加新页面

1. 在 `pages/` 创建 `NewPage.js`
2. 实现 `render()` 和 `attachListeners()` 方法
3. 在 `main.js` 中导入并添加路由
4. 在导航中添加链接（如需要）

```javascript
// 1. 创建页面
export const NewPage = {
    render() { return `<div>新页面</div>`; },
    attachListeners() { }
};

// 2. 在 main.js 导入
import { NewPage } from './pages/NewPage.js';

// 3. 添加路由
case 'new-page':
    this.renderPage('新页面', NewPage);
    break;
```

### 添加新组件

1. 在 `components/` 创建 `NewComponent.js`
2. 在需要的页面中导入和使用
3. 确保组件可复用

### 修改样式

1. 优先使用 CSS 变量
2. 保持响应式设计
3. 测试不同设备尺寸

---

## 🔍 代码标注

### AI 生成的代码

```javascript
// [AI-GENERATED] 2026-03-22 - OpenClaw - 功能描述
```

### 人类编写的代码

```javascript
// [HUMAN] 2026-03-22 - Jason - 功能描述
```

### 协作修改的代码

```javascript
// [AI-GENERATED] 2026-03-22 - OpenClaw - 初始实现
// [HUMAN-MODIFIED] 2026-03-22 - Jason - 优化
```

---

## 🧪 测试

### 单元测试位置

测试文件放在 `tests/unit/` 目录

```javascript
// tests/unit/cart.test.js
import { describe, it, expect } from 'vitest';
import { addToCart } from '../../src/utils/cart.js';

describe('购物车功能', () => {
    it('应该能添加商品', () => {
        // 测试代码
    });
});
```

### 运行测试

```bash
npm test
```

---

## 📌 注意事项

### 性能优化

- ✅ 使用事件委托减少监听器数量
- ✅ 避免频繁的 DOM 操作
- ✅ 图片使用懒加载
- ✅ 代码按需加载

### 安全注意

- ✅ 所有用户输入必须转义
- ✅ 不使用 eval()
- ✅ 不直接设置 innerHTML（除非内容可信）
- ✅ 敏感数据不存储在 localStorage

### 代码质量

- ✅ 函数不超过 50 行
- ✅ 文件不超过 500 行
- ✅ 使用有意义的变量名
- ✅ 添加必要的注释

---

## 🔗 相关文档

- [项目章程](../docs/CHARTER.md) - 基本原则
- [开发指南](../docs/DEVELOPMENT.md) - 协作流程
- [安全规范](../docs/SECURITY.md) - 安全要求
- [架构文档](../docs/ARCHITECTURE.md) - 系统设计

---

> 💻 **保持代码简洁、清晰、可维护！**

*最后更新：2026-03-22*
