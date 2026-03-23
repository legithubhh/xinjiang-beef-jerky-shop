# 安全规范

> 🔐 安全是第一位的 - 所有开发者必须严格遵守

**版本**: 1.0.0  
**最后更新**: 2026-03-22  
**安全等级**: 🔴 强制执行

---

## ⚠️ 安全红线

**以下行为严格禁止**:

- ❌ 明文存储密码
- ❌ 将密钥提交到代码库
- ❌ 绕过输入验证
- ❌ 在生产环境使用开发配置
- ❌ 忽略安全警告
- ❌ 直接拼接 SQL 语句
- ❌ 泄露用户敏感数据

---

## 🔑 认证与授权

### JWT Token 规范

```javascript
// Token 结构
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "123",
    "username": "jason",
    "role": "user",
    "iat": 1711094400,
    "exp": 1711180800  // 24 小时过期
  },
  "signature": "..."
}
```

### 密码安全

```javascript
// [AI-GENERATED] 2026-03-22 - 密码加密规范
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

// 加密密码
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// 验证密码
async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// 密码强度要求
const PASSWORD_RULES = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true
};
```

### 会话管理

- Token 有效期：24 小时
- Refresh Token: 7 天
- 单设备登录：可选
- 强制登出：支持

---

## 🛡️ 输入验证

### 所有用户输入必须验证

```javascript
// [AI-GENERATED] 2026-03-22 - 输入验证中间件

const validation = {
    // 手机号验证
    phone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    
    // 邮箱验证
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // 密码验证
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    
    // 身份证验证
    idCard: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
};

function validateInput(input, rules) {
    const errors = [];
    for (const [field, rule] of Object.entries(rules)) {
        if (!rule.test(input[field])) {
            errors.push(`${field} 格式不正确`);
        }
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
```

### XSS 防护

```javascript
// HTML 转义
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// 所有用户输入显示前必须转义
document.getElementById('output').textContent = userInput; // 安全
// document.getElementById('output').innerHTML = userInput; // 危险！
```

### SQL 注入防护

```javascript
// ❌ 错误示例 - 禁止使用
const sql = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ 正确示例 - 参数化查询
const sql = 'SELECT * FROM users WHERE id = ?';
db.execute(sql, [userId]);
```

---

## 🔒 数据安全

### 敏感数据加密

```javascript
// [AI-GENERATED] 2026-03-22 - 数据加密

const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 字节
const IV_LENGTH = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
    const [ivHex, encrypted] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
```

### 数据脱敏

```javascript
// 手机号脱敏：138****1234
function maskPhone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

// 身份证脱敏：110101********1234
function maskIdCard(idCard) {
    return idCard.replace(/(\d{6})\d{8}(\w{4})/, '$1********$2');
}

// 邮箱脱敏：j***@example.com
function maskEmail(email) {
    const [name, domain] = email.split('@');
    return `${name[0]}***@${domain}`;
}
```

---

## 🌐 网络安全

### HTTPS 配置

```nginx
# Nginx 配置示例
server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 安全协议
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000" always;
}
```

### CORS 配置

```javascript
// [AI-GENERATED] 2026-03-22 - CORS 中间件
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 速率限制

```javascript
// [AI-GENERATED] 2026-03-22 - 速率限制中间件
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 每个 IP 最多 100 次请求
    message: '请求过于频繁，请稍后再试'
});

app.use('/api/', limiter);

// 登录接口更严格的限制
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 小时
    max: 5, // 最多 5 次登录尝试
    message: '登录尝试次数过多，请 1 小时后再试'
});

app.post('/api/auth/login', loginLimiter, loginHandler);
```

---

## 📋 安全清单

### 开发环境

- [ ] 使用 .env 存储敏感信息
- [ ] .env 添加到 .gitignore
- [ ] 不使用生产数据测试
- [ ] 启用错误日志

### 生产环境

- [ ] 启用 HTTPS
- [ ] 配置防火墙
- [ ] 定期更新依赖
- [ ] 启用安全监控
- [ ] 配置自动备份
- [ ] 设置告警通知

### 代码审查

- [ ] 无硬编码密钥
- [ ] 所有输入已验证
- [ ] 错误信息不敏感
- [ ] 使用参数化查询
- [ ] 文件上传有限制

---

## 🚨 安全事件响应

### 发现漏洞时

1. **立即报告**: docs/LOGS/ 创建安全事件日志
2. **评估影响**: 确定漏洞严重程度
3. **紧急修复**: 优先处理安全问题
4. **通知用户**: 如涉及用户数据
5. **事后分析**: 更新安全规范

---

## 变更记录

### 变更记录 - 2026-03-22
- 文件：SECURITY.md
- 作者：AI-agent
- 概要：添加初始变更记录，配合 `AI_README.md` 的文档与安全变更追踪要求。
- 影响：修改安全策略或实现时需记录变更原因与影响，并更新 `AI_README.md`。

### 联系方式

- 安全邮箱：security@xinjiangbeef.com (示例)
- 紧急联系：Jason

---

## 📚 参考资源

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js 安全最佳实践](https://nodejs.org/en/docs/guides/security/)
- [Express 安全最佳实践](https://expressjs.com/en/advanced/best-practice-security.html)

---

> ⚠️ **违反安全规范可能导致严重后果。所有开发者必须严格遵守。**
