# 🔧 后端服务

> 本文件夹包含 Node.js 后端服务代码

---

## 📋 文件夹说明

`server/` 是后端服务的**核心代码**，提供 RESTful API、用户认证、数据存储等功能。

### 架构原则

- **RESTful** - 遵循 REST 架构风格
- **安全性** - JWT 认证、输入验证、速率限制
- **可扩展** - 模块化设计，便于扩展
- **可维护** - 清晰的代码组织，完善的注释

---

## 📁 文件结构

```
server/
├── 📄 index.js             # 服务入口文件
├── 📂 api/                 # API 路由
│   ├── auth.js            # 认证接口（注册/登录）
│   ├── products.js        # 产品接口
│   ├── cart.js            # 购物车接口
│   ├── orders.js          # 订单接口
│   └── README.md          # API 说明
├── 📂 middleware/          # 中间件
│   ├── auth.js            # JWT 认证中间件
│   ├── errorHandler.js    # 错误处理中间件
│   └── README.md          # 中间件说明
├── 📂 models/              # 数据模型（待创建）
│   ├── User.js            # 用户模型
│   ├── Product.js         # 产品模型
│   └── Order.js           # 订单模型
├── 📂 config/              # 配置文件
│   ├── app.js             # 应用配置
│   ├── database.js        # 数据库配置
│   └── README.md          # 配置说明
└── 📂 utils/               # 工具函数（待创建）
    └── README.md          # 工具说明
```

---

## 🔧 核心模块

### 1. 服务入口 (index.js)

**职责**: 启动服务器、注册中间件、配置路由

```javascript
// 主要功能
- CORS 配置
- 安全头设置
- 请求日志
- Body 解析
- 路由注册
- 错误处理
- 静态文件服务（生产）
```

**修改指南**:
- 添加新中间件：在路由注册前添加
- 添加新路由：导入并 `app.use()`
- 修改端口：设置 `PORT` 环境变量

### 2. API 路由 (api/)

| 文件 | 基础路径 | 认证 | 说明 |
|------|----------|------|------|
| auth.js | /api/auth | ❌ | 用户认证 |
| products.js | /api/products | ❌ | 产品查询（公开） |
| cart.js | /api/cart | ✅ | 购物车管理 |
| orders.js | /api/orders | ✅ | 订单管理 |

**路由规范**:
```javascript
const express = require('express');
const router = express.Router();

// GET 列表
router.get('/', async (req, res, next) => {
    try {
        // 业务逻辑
        res.json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
});

// POST 创建
router.post('/', async (req, res, next) => {
    // ...
});

module.exports = router;
```

### 3. 中间件 (middleware/)

| 文件 | 说明 | 使用场景 |
|------|------|----------|
| auth.js | JWT 认证 | 需要登录的接口 |
| errorHandler.js | 错误处理 | 全局错误捕获 |

**中间件规范**:
```javascript
// 认证中间件示例
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: '未认证' }
        });
    }
    
    // 验证 token
    req.user = decoded;
    next();
};
```

### 4. 配置文件 (config/)

| 文件 | 说明 | 环境变量 |
|------|------|----------|
| app.js | 应用配置 | PORT, JWT_SECRET 等 |
| database.js | 数据库 | DB_PATH |

**配置规范**:
```javascript
module.exports = {
    port: process.env.PORT || 3001,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h'
    }
};
```

---

## 🗄️ 数据库

### 当前配置

- **开发环境**: SQLite (文件数据库)
- **生产环境**: PostgreSQL (推荐)

### 数据表

| 表名 | 说明 | 关键字段 |
|------|------|----------|
| users | 用户 | id, username, email, password_hash |
| products | 产品 | id, name, price, stock, sales |
| orders | 订单 | id, order_no, user_id, total_amount |
| order_items | 订单项 | id, order_id, product_id, quantity |
| carts | 购物车 | id, user_id, product_id, quantity |

### 数据库操作

```javascript
const db = require('../config/database');

// 查询多条
const rows = await db.query('SELECT * FROM products');

// 查询单条
const row = await db.get('SELECT * FROM users WHERE id = ?', [id]);

// 执行修改
await db.execute('INSERT INTO users (...) VALUES (...)');
```

---

## 📝 开发指南

### 添加新 API

1. 在 `api/` 创建路由文件
2. 实现 CRUD 操作
3. 在 `index.js` 中注册路由
4. 更新 `docs/API.md`

```javascript
// 1. 创建 api/newfeature.js
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({ success: true, data: [] });
});

module.exports = router;

// 2. 在 index.js 注册
const newFeatureRoutes = require('./api/newfeature');
app.use('/api/newfeature', newFeatureRoutes);
```

### 添加中间件

1. 在 `middleware/` 创建文件
2. 实现中间件逻辑
3. 在路由中使用

```javascript
// 使用中间件
app.use('/api/protected', authMiddleware, protectedRoutes);
```

### 数据库迁移

创建新的数据表：

```javascript
// 在 database.js 的 createTables() 中添加
await execute(`
    CREATE TABLE IF NOT EXISTS new_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
`);
```

---

## 🔐 安全规范

### 必须遵守

1. **输入验证** - 所有用户输入必须验证
2. **参数化查询** - 防止 SQL 注入
3. **密码加密** - 使用 bcrypt
4. **JWT 认证** - 敏感操作需要认证
5. **速率限制** - 防止暴力攻击
6. **错误处理** - 不泄露敏感信息

### 代码示例

```javascript
// ✅ 正确 - 参数化查询
const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);

// ❌ 错误 - SQL 注入风险
const user = await db.get(`SELECT * FROM users WHERE id = ${id}`);

// ✅ 正确 - 密码加密
const hash = await bcrypt.hash(password, 12);

// ✅ 正确 - 输入验证
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: '邮箱格式不正确' });
}
```

---

## 🧪 测试

### API 测试

```javascript
// tests/integration/auth.test.js
import request from 'supertest';
import app from '../../server/index.js';

describe('认证 API', () => {
    it('应该能注册用户', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'test',
                email: 'test@example.com',
                password: 'Test1234!'
            });
        
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
    });
});
```

---

## 🚀 部署

### 环境变量

创建 `.env` 文件：

```bash
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
DB_PATH=/var/data/beef-shop.sqlite
ALLOWED_ORIGINS=https://yourdomain.com
```

### 启动服务

```bash
# 开发环境
npm run server

# 生产环境
npm start  # 构建 + 启动

# 使用 PM2（推荐）
pm2 start server/index.js --name beef-shop
pm2 save
pm2 startup
```

---

## 📌 注意事项

### 性能优化

- ✅ 使用数据库索引
- ✅ 实现查询缓存
- ✅ 避免 N+1 查询
- ✅ 使用连接池

### 日志记录

```javascript
// 请求日志
console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

// 错误日志
console.error('❌ 错误:', err);

// 业务日志
console.log('✅ 用户登录:', username);
```

### 错误处理

```javascript
// 统一错误格式
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "错误描述",
        "details": null
    },
    "timestamp": "2026-03-22T10:00:00Z"
}
```

---

## 🔗 相关文档

- [API 文档](../docs/API.md) - 接口详细说明
- [安全规范](../docs/SECURITY.md) - 安全要求
- [架构文档](../docs/ARCHITECTURE.md) - 系统设计
- [开发指南](../docs/DEVELOPMENT.md) - 协作流程

---

> 🔧 **保持稳定、安全、高效！**

*最后更新：2026-03-22*
