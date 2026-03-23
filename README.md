# 新疆手工牛肉干电商平台

> 🥩 正宗新疆风味手工牛肉干在线订购平台  
> 🤝 人类与 AI 持续共同开发项目

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Status](https://img.shields.io/badge/status-developing-brightgreen)

---

## 📖 项目简介

这是一个**人机协作开发**的新疆特色食品电商平台，采用现代化技术架构，实现完整的电商购物流程。项目遵循严格的开发规范和安全标准，所有开发活动透明可追溯。

### 核心特色

- 🤝 **人机协作** - 人类决策 + AI 执行，透明可追溯
- 📚 **文档完善** - 6 大核心文档 + 每日开发日志
- 🔐 **安全第一** - 企业级安全规范，强制遵守
- 🏗️ **架构现代** - 前后端分离，RESTful API
- 📱 **响应式设计** - 完美适配手机、平板、电脑

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x
- Git

### 安装步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd xinjiang-beef-jerky-shop

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入实际配置

# 4. 启动开发服务器（前端）
npm run dev

# 5. 启动后端服务（新终端）
npm run server
```

### 访问地址

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端开发 | http://localhost:3000 | Vite 开发服务器 |
| 后端 API | http://localhost:3001 | Express API 服务 |
| API 文档 | http://localhost:3001/api/health | 健康检查 |

---

## 📁 项目结构

```
xinjiang-beef-jerky-shop/
├── 📄 README.md              # 项目说明（本文）
├── 📄 .env.example           # 环境变量示例
├── 📄 .gitignore             # Git 忽略配置
├── 📄 package.json           # 项目配置
├── 📄 vite.config.js         # Vite 构建配置
├── 📄 index.html             # 前端入口
│
├── 📂 docs/                  # 📚 文档中心
│   ├── CHARTER.md           # ⭐ 项目章程（宪法）
│   ├── ARCHITECTURE.md      # 系统架构详解
│   ├── SECURITY.md          # 🔐 安全规范（强制）
│   ├── DEVELOPMENT.md       # 🛠️ 开发指南
│   ├── API.md               # 📡 API 文档
│   ├── CHANGELOG.md         # 📝 变更日志
│   └── LOGS/                # 📔 开发日志
│       ├── TEMPLATE.md      # 日志模板
│       └── 2026-03-22.md    # 每日日志
│
├── 📂 src/                   # 💻 前端源代码
│   ├── components/          # UI 组件
│   ├── pages/               # 页面组件
│   ├── utils/               # 工具函数
│   ├── styles/              # 样式文件
│   └── main.js              # 应用入口
│
├── 📂 server/                # 🔧 后端服务
│   ├── api/                 # API 路由
│   ├── middleware/          # 中间件
│   ├── models/              # 数据模型
│   ├── config/              # 配置文件
│   └── index.js             # 服务入口
│
├── 📂 public/                # 🖼️ 静态资源
│   └── favicon.ico          # 网站图标
│
└── 📂 tests/                 # 🧪 测试文件
    ├── unit/                # 单元测试
    └── integration/         # 集成测试
```

---

## 🛠️ 技术栈

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| JavaScript | ES2022+ | 原生，无框架依赖 |
| CSS3 | - | 自定义变量 + 响应式 |
| Vite | 5.x | 快速构建工具 |
| Hash Router | - | 前端路由 |

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | 18+ | 运行环境 |
| Express | 4.x | Web 框架 |
| SQLite | 5.x | 开发数据库 |
| JWT | 9.x | 认证令牌 |
| bcrypt | 5.x | 密码加密 |

### 开发工具

| 工具 | 说明 |
|------|------|
| ESLint | 代码检查 |
| Vitest | 单元测试 |
| dotenv | 环境变量 |
| CORS | 跨域支持 |

---

## 📚 核心文档

### 必读文档

| 文档 | 说明 | 重要性 |
|------|------|--------|
| [CHARTER.md](docs/CHARTER.md) | 项目章程，根本规范 | ⭐⭐⭐⭐⭐ |
| [DEVELOPMENT.md](docs/DEVELOPMENT.md) | 开发指南，协作流程 | ⭐⭐⭐⭐⭐ |
| [SECURITY.md](docs/SECURITY.md) | 安全规范，强制执行 | ⭐⭐⭐⭐⭐ |

### 参考文档

| 文档 | 说明 |
|------|------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | 系统架构详解 |
| [API.md](docs/API.md) | API 接口文档 |
| [CHANGELOG.md](docs/CHANGELOG.md) | 版本变更日志 |
| [LOGS/](docs/LOGS/) | 每日开发日志 |

---

## 🎯 功能模块

### 已实现 ✅

| 模块 | 状态 | 说明 |
|------|------|------|
| 首页 | ✅ | 品牌展示、热销产品 |
| 产品列表 | ✅ | 8 款产品、标签筛选 |
| 产品详情 | ✅ | 完整信息、加入购物车 |
| 购物车 | ✅ | 增删改查、金额计算 |
| 订单结算 | ✅ | 收货信息、支付方式 |
| 订单管理 | ✅ | 列表、详情、状态追踪 |
| 关于我们 | ✅ | 品牌故事、联系方式 |
| 用户认证 | ✅ | 注册、登录、JWT |
| 产品 API | ✅ | 列表、详情、搜索 |
| 购物车 API | ✅ | 增删改查 |
| 订单 API | ✅ | 创建、查询 |

### 开发中 🟡

| 模块 | 进度 | 预计完成 |
|------|------|----------|
| 支付集成 | 0% | 2026-04-01 |
| 物流追踪 | 0% | 2026-04-05 |
| 管理后台 | 0% | 2026-04-10 |
| 用户评价 | 0% | 2026-04-15 |

---

## 📋 开发命令

```bash
# 前端开发
npm run dev          # 启动 Vite 开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产版本

# 后端服务
npm run server       # 启动 Express 服务
npm start            # 构建 + 启动（生产）

# 代码质量
npm run lint         # ESLint 检查
npm test             # 运行测试
```

---

## 🔐 安全规范

### 基本原则

1. **所有输入必须验证** - 防止注入攻击
2. **密码加密存储** - bcrypt + salt
3. **JWT 认证** - 无状态认证
4. **HTTPS 传输** - 生产环境强制
5. **速率限制** - 防止暴力攻击

### 详细规范

查看 [docs/SECURITY.md](docs/SECURITY.md)

---

## 👥 贡献指南

### 人类开发者

1. 审查 AI 生成的代码
2. 做出架构决策
3. 部署到生产环境
4. 更新开发日志

### AI 协作者

1. 生成代码和测试
2. 编写文档
3. 提出优化建议
4. 修复 Bug

### 提交流程

```bash
# 1. 创建分支
git checkout -b feature/your-feature

# 2. 开发并提交
git add .
git commit -m "feat: 描述你的功能"

# 3. 推送并创建 PR
git push origin feature/your-feature
```

---

## 📊 项目进度

```
项目启动    ████████████████████ 100%
文档体系    ████████████████████ 100%
前端基础    ████████████████░░░░  80%
后端框架    ████████████░░░░░░░░  60%
数据库      ████████████░░░░░░░░  60%
测试        ░░░░░░░░░░░░░░░░░░░░   0%
部署        ░░░░░░░░░░░░░░░░░░░░   0%
```

**总体进度**: 约 65%

---

## 📞 联系方式

- **项目负责人**: Jason
- **AI 协作者**: OpenClaw
- **问题反馈**: docs/LOGS/ 创建日志
- **安全报告**: security@xinjiangbeef.com (示例)

---

## 📄 许可证

MIT License

Copyright (c) 2026 Jason & OpenClaw

---

## 🙏 致谢

感谢所有为这个项目做出贡献的人类开发者和 AI 助手！

---

> 🤝 **人机协作，共创美好未来！**

*最后更新：2026-03-22*
