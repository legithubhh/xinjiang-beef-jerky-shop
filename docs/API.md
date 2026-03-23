# API 文档

> 📡 RESTful API 接口文档

**版本**: 1.0.0  
**最后更新**: 2026-03-22  
**状态**: 🟡 开发中

---

## 📋 概览

### 基础信息

- **基础 URL**: `/api`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 响应格式

**成功响应**:
```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功",
  "timestamp": "2026-03-22T10:00:00Z"
}
```

**错误响应**:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": [ ... ]
  },
  "timestamp": "2026-03-22T10:00:00Z"
}
```

### 认证

需要认证的接口，请求头需包含：
```
Authorization: Bearer <token>
```

---

## 🔐 认证接口

### 用户注册

```
POST /api/auth/register
```

**请求体**:
```json
{
  "username": "jason",
  "email": "jason@example.com",
  "password": "SecurePass123!",
  "phone": "13800138000"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "userId": "123",
    "username": "jason",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "注册成功"
}
```

### 用户登录

```
POST /api/auth/login
```

**请求体**:
```json
{
  "username": "jason",
  "password": "SecurePass123!"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "userId": "123",
    "username": "jason",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  },
  "message": "登录成功"
}
```

### 刷新 Token

```
POST /api/auth/refresh
```

**请求头**:
```
Authorization: Bearer <refresh_token>
```

**响应**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400
  }
}
```

---

## 📦 产品接口

### 获取产品列表

```
GET /api/products
```

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 (默认 1) |
| limit | number | 每页数量 (默认 20) |
| category | string | 分类筛选 |
| tag | string | 标签筛选 |
| sort | string | 排序 (price_asc, price_desc, sales) |

**响应**:
```json
{
  "success": true,
  "data": {
    "products": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

### 获取产品详情

```
GET /api/products/:id
```

**响应**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "香辣味牛肉干",
    "price": 68,
    "originalPrice": 88,
    "description": "...",
    "images": [...],
    "stock": 999,
    "sales": 1258,
    "rating": 4.9
  }
}
```

### 搜索产品

```
GET /api/products/search?q=keyword
```

---

## 变更记录

### 变更记录 - 2026-03-22
- 文件：API.md
- 作者：AI-agent
- 概要：补充初始变更记录，遵循 `AI_README.md` 的文档更新政策。
- 影响：要求在对 API 文档或接口实现修改时添加变更说明并更新 `AI_README.md`。


---

## 🛒 购物车接口

### 获取购物车

```
GET /api/cart
```

**认证**: 需要

**响应**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": 1,
        "name": "香辣味牛肉干",
        "price": 68,
        "quantity": 2,
        "subtotal": 136
      }
    ],
    "total": 136,
    "itemCount": 2
  }
}
```

### 添加商品到购物车

```
POST /api/cart/items
```

**认证**: 需要

**请求体**:
```json
{
  "productId": 1,
  "quantity": 2
}
```

### 更新购物车商品数量

```
PUT /api/cart/items/:itemId
```

**认证**: 需要

**请求体**:
```json
{
  "quantity": 5
}
```

### 删除购物车商品

```
DELETE /api/cart/items/:itemId
```

**认证**: 需要

### 清空购物车

```
DELETE /api/cart
```

**认证**: 需要

---

## 📦 订单接口

### 创建订单

```
POST /api/orders
```

**认证**: 需要

**请求体**:
```json
{
  "shippingAddress": {
    "name": "Jason",
    "phone": "13800138000",
    "province": "新疆",
    "city": "乌鲁木齐市",
    "district": "XX 区",
    "address": "XX 路 XX 号"
  },
  "paymentMethod": "wechat",
  "message": "请尽快发货"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "orderId": "XJ1711094400000",
    "total": 268,
    "shipping": 0,
    "finalTotal": 268
  },
  "message": "订单创建成功"
}
```

### 获取订单列表

```
GET /api/orders
```

**认证**: 需要

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| status | string | 订单状态筛选 |
| page | number | 页码 |
| limit | number | 每页数量 |

### 获取订单详情

```
GET /api/orders/:id
```

**认证**: 需要

### 取消订单

```
POST /api/orders/:id/cancel
```

**认证**: 需要

### 确认收货

```
POST /api/orders/:id/confirm
```

**认证**: 需要

---

## 👤 用户接口

### 获取用户信息

```
GET /api/user/profile
```

**认证**: 需要

### 更新用户信息

```
PUT /api/user/profile
```

**认证**: 需要

**请求体**:
```json
{
  "nickname": "新昵称",
  "avatar": "https://..."
}
```

### 修改密码

```
PUT /api/user/password
```

**认证**: 需要

**请求体**:
```json
{
  "oldPassword": "...",
  "newPassword": "..."
}
```

---

## 📊 错误码

| 错误码 | 说明 | HTTP 状态 |
|--------|------|----------|
| SUCCESS | 成功 | 200 |
| VALIDATION_ERROR | 参数验证失败 | 400 |
| UNAUTHORIZED | 未认证 | 401 |
| FORBIDDEN | 无权限 | 403 |
| NOT_FOUND | 资源不存在 | 404 |
| DUPLICATE | 资源重复 | 409 |
| SERVER_ERROR | 服务器错误 | 500 |

---

## 🔒 安全说明

1. **所有接口** 必须使用 HTTPS
2. **认证接口** 有速率限制 (5 次/小时)
3. **敏感操作** 需要二次验证
4. **密码** 必须加密存储 (bcrypt)

---

## 📝 开发状态

| 接口 | 状态 | 负责人 | 预计完成 |
|------|------|--------|----------|
| 认证接口 | 🟡 开发中 | OpenClaw | 2026-03-25 |
| 产品接口 | 🟡 开发中 | OpenClaw | 2026-03-24 |
| 购物车接口 | 🟡 开发中 | OpenClaw | 2026-03-25 |
| 订单接口 | ⚪ 待开始 | - | - |
| 用户接口 | ⚪ 待开始 | - | - |

---

> 📌 **API 变更必须先更新本文档，经人类审查后实施。**
