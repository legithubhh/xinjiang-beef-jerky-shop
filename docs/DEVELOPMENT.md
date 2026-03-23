# 开发指南

> 🛠️ 人机协作开发流程与规范

**版本**: 1.0.0  
**最后更新**: 2026-03-22

---

## 👥 角色定义

### 人类开发者 (Jason)

**职责**:
- ✅ 架构决策审批
- ✅ 代码最终审查
- ✅ 安全配置审核
- ✅ 生产环境部署
- ✅ 需求定义和优先级

**权限**:
- 可直接修改任何文件
- 可部署到生产环境
- 可修改安全配置
- 可访问敏感数据

### AI 协作者 (OpenClaw)

**职责**:
- ✅ 代码生成和实现
- ✅ 文档编写和维护
- ✅ 测试用例编写
- ✅ 代码审查建议
- ✅ 问题诊断和修复

**限制**:
- ❌ 不能直接部署
- ❌ 不能修改安全配置
- ❌ 不能访问敏感数据
- ❌ 重大变更需人类确认

---

## 📝 开发流程

### 新功能开发

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 需求分析                                                 │
│    - 理解需求                                               │
│    - 评估工作量                                             │
│    - 识别风险                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. 创建开发日志                                             │
│    - docs/LOGS/YYYY-MM-DD.md                               │
│    - 记录需求和计划                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. 技术方案设计                                             │
│    - 更新 ARCHITECTURE.md                                   │
│    - 设计数据模型                                           │
│    - 设计 API 接口                                           │
│    - [人类审查]                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. 实现功能                                                 │
│    - 编写代码                                               │
│    - 添加 [AI-GENERATED] 标注                               │
│    - 编写测试                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. 代码审查                                                 │
│    - AI 自查                                                 │
│    - [人类审查]                                             │
│    - 修复问题                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. 更新文档                                                 │
│    - API 文档                                                │
│    - 变更日志                                               │
│    - 开发日志                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. 提交合并                                                 │
│    - Git commit                                             │
│    - 更新 CHANGELOG.md                                      │
│    - [人类确认部署]                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏷️ 代码标注规范

### AI 生成的代码

```javascript
// [AI-GENERATED] 2026-03-22 - OpenClaw - 功能描述
// [HUMAN-REVIEWED] 2026-03-22 - Jason - 审查意见（如有）

function aiGeneratedFunction() {
    // ...
}
```

### 人类编写的代码

```javascript
// [HUMAN] 2026-03-22 - Jason - 功能描述

function humanWrittenFunction() {
    // ...
}
```

### 协作修改的代码

```javascript
// [AI-GENERATED] 2026-03-22 - OpenClaw - 初始实现
// [HUMAN-MODIFIED] 2026-03-22 - Jason - 优化性能
// [AI-OPTIMIZED] 2026-03-22 - OpenClaw - 代码重构

function collaborativeFunction() {
    // ...
}
```

---

## 📁 文件组织

### 前端目录

```
src/
├── components/           # 可复用 UI 组件
│   ├── Header.js        # 页头组件
│   ├── Footer.js        # 页脚组件
│   └── README.md        # 组件说明
├── pages/               # 页面组件
│   ├── Home.js          # 首页
│   ├── Products.js      # 产品列表
│   └── README.md        # 页面说明
├── utils/               # 工具函数
│   ├── api.js           # API 调用
│   ├── cart.js          # 购物车逻辑
│   └── README.md        # 工具说明
├── styles/              # 样式文件
│   ├── main.css         # 主样式
│   └── variables.css    # CSS 变量
└── main.js              # 应用入口
```

### 后端目录

```
server/
├── api/                 # API 路由
│   ├── auth.js          # 认证接口
│   ├── products.js      # 产品接口
│   ├── orders.js        # 订单接口
│   └── index.js         # 路由汇总
├── middleware/          # 中间件
│   ├── auth.js          # 认证中间件
│   ├── validation.js    # 验证中间件
│   └── errorHandler.js  # 错误处理
├── models/              # 数据模型
│   ├── User.js          # 用户模型
│   ├── Product.js       # 产品模型
│   └── Order.js         # 订单模型
├── config/              # 配置
│   ├── database.js      # 数据库配置
│   └── app.js           # 应用配置
└── index.js             # 服务入口
```

### 文档目录

```
docs/
├── CHARTER.md           # 项目章程 ⭐
├── ARCHITECTURE.md      # 架构文档
├── SECURITY.md          # 安全规范
├── DEVELOPMENT.md       # 开发指南（本文）
├── API.md               # API 文档
├── CHANGELOG.md         # 变更日志
└── LOGS/                # 开发日志
    ├── 2026-03-22.md    # 每日日志
    └── TEMPLATE.md      # 日志模板
```

---

## 📋 开发日志规范

### 日志模板

```markdown
# 开发日志 - YYYY-MM-DD

**日期**: 2026-03-22  
**参与者**: Jason, OpenClaw  
**天气**: ☀️ (可选，增加人情味)

## 📝 今日工作

### 完成的任务
- [x] 任务 1 - 负责人 - 状态
- [x] 任务 2 - 负责人 - 状态

### 进行中的任务
- [ ] 任务 3 - 负责人 - 进度%

### 遇到的问题
1. 问题描述
   - 原因分析
   - 解决方案
   - 预防措施

## 📊 代码统计

- 新增文件：X 个
- 修改文件：Y 个
- 新增代码：Z 行
- 删除代码：W 行

## 🎯 明日计划

1. 计划任务 1
2. 计划任务 2

## 💡 想法和笔记

- 任何想法、建议、待讨论事项

## ✍️ 签署

**人类**: Jason  
**AI**: OpenClaw
```

### 日志示例

查看 `docs/LOGS/2026-03-22.md`

---

## 🧪 测试规范

### 单元测试

```javascript
// [AI-GENERATED] 2026-03-22 - 购物车测试

import { describe, it, expect } from 'vitest';
import { addToCart, getCartTotal } from '../utils/cart.js';

describe('购物车功能', () => {
    it('应该能添加商品到购物车', () => {
        const product = { id: 1, name: '牛肉干', price: 68 };
        addToCart(product);
        // 测试逻辑
    });
    
    it('应该能计算购物车总额', () => {
        // 测试逻辑
    });
});
```

### 测试覆盖率要求

- 工具函数：> 90%
- 页面组件：> 70%
- API 接口：> 80%
- 整体覆盖：> 80%

---

## 🔧 开发环境

### 必需工具

- Node.js >= 18.x
- npm >= 9.x

---

## 变更记录

### 变更记录 - 2026-03-22
- 文件：DEVELOPMENT.md
- 作者：AI-agent
- 概要：添加初始变更记录，说明人机协作流程与文档更新要求。
- 影响：要求修改开发流程或工具配置时，追加变更记录并更新 `AI_README.md`。
- Git
- VS Code (推荐)

### 推荐扩展

- ESLint
- Prettier
- GitLens
- Thunder Client (API 测试)

### 环境配置

```bash
# 克隆项目
git clone <repository>
cd xinjiang-beef-jerky-shop

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env

# 启动开发服务器
npm run dev
```

---

## 📤 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

### 示例

```bash
# 新功能
git commit -m "feat(cart): 添加购物车数量调整功能"

# Bug 修复
git commit -m "fix(auth): 修复登录 token 过期问题"

# 文档更新
git commit -m "docs: 更新 API 文档"

# AI 生成的代码
git commit -m "feat(products): [AI] 实现产品筛选功能"
```

---

## 🚀 部署流程

### 开发环境

```bash
npm run dev          # 启动开发服务器 (http://localhost:3000)
```

### 测试环境

```bash
npm run build        # 构建
npm run preview      # 预览
```

### 生产环境

```bash
# [人类操作]
npm run build        # 构建生产版本
npm run server       # 启动后端服务
pm2 start server.js  # 进程管理
```

---

## 📞 沟通协作

### 日常沟通

- 开发日志：docs/LOGS/
- 问题讨论：GitHub Issues
- 紧急事项：直接联系

### 决策流程

```
AI 提议 → 人类审查 → 讨论修改 → 人类批准 → 实施
```

### 争议解决

- 技术争议：参考最佳实践
- 架构争议：人类最终决定
- 安全争议：遵循 SECURITY.md

---

## 📚 学习资源

### 内部文档

- docs/CHARTER.md - 项目章程
- docs/ARCHITECTURE.md - 架构设计
- docs/SECURITY.md - 安全规范
- docs/API.md - API 文档

### 外部资源

- [MDN Web Docs](https://developer.mozilla.org/)
- [Node.js 文档](https://nodejs.org/docs/)
- [Vite 文档](https://vitejs.dev/)

---

> 🤝 **人机协作，共创美好未来！**
