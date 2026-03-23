# 🧪 测试文件

> 本文件夹包含所有测试代码

---

## 📋 文件夹说明

`tests/` 用于存放项目的**测试代码**，确保代码质量和功能正确性。

### 测试理念

- **测试驱动** - 重要功能先写测试
- **自动化** - CI/CD 自动运行测试
- **高覆盖** - 关键代码 100% 覆盖
- **易维护** - 测试代码也要保持质量

---

## 📁 文件结构

```
tests/
├── 📄 README.md            # 本文件
├── 📂 unit/                # 单元测试
│   ├── cart.test.js       # 购物车测试
│   ├── products.test.js   # 产品测试
│   └── utils.test.js      # 工具函数测试
├── 📂 integration/         # 集成测试
│   ├── auth.test.js       # 认证接口测试
│   ├── products.test.js   # 产品接口测试
│   ├── cart.test.js       # 购物车接口测试
│   └── orders.test.js     # 订单接口测试
└── 📂 e2e/                 # 端到端测试（待创建）
    └── README.md          # E2E 测试说明
```

---

## 🧪 测试类型

### 1. 单元测试 (unit/)

**目标**: 测试单个函数或模块

**特点**:
- ✅ 运行快速
- ✅ 隔离测试
- ✅ 易于定位问题

**示例**:
```javascript
// tests/unit/cart.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { addToCart, getCartTotal } from '../../src/utils/cart.js';

describe('购物车功能', () => {
    beforeEach(() => {
        // 每个测试前重置购物车
        localStorage.clear();
    });

    it('应该能添加商品到购物车', () => {
        const product = { id: 1, name: '牛肉干', price: 68 };
        addToCart(product);
        
        // 验证购物车有商品
        const cart = JSON.parse(localStorage.getItem('beef-cart'));
        expect(cart).toHaveLength(1);
        expect(cart[0].name).toBe('牛肉干');
    });

    it('应该能计算购物车总额', () => {
        addToCart({ id: 1, price: 68 });
        addToCart({ id: 2, price: 65 });
        
        const total = getCartTotal();
        expect(total).toBe(133);
    });
});
```

### 2. 集成测试 (integration/)

**目标**: 测试多个模块协作

**特点**:
- ✅ 测试 API 接口
- ✅ 测试数据库操作
- ✅ 测试模块间交互

**示例**:
```javascript
// tests/integration/auth.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../server/index.js';

describe('认证 API', () => {
    it('应该能注册用户', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test1234!'
            });
        
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.token).toBeDefined();
    });

    it('应该能登录', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'Test1234!'
            });
        
        expect(res.status).toBe(200);
        expect(res.body.data.token).toBeDefined();
    });

    it('密码错误应该失败', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'WrongPassword'
            });
        
        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
    });
});
```

### 3. 端到端测试 (e2e/)

**目标**: 测试完整用户流程

**特点**:
- ✅ 模拟真实用户操作
- ✅ 测试完整流程
- ✅ 使用浏览器自动化

**示例** (待实现):
```javascript
// tests/e2e/checkout.test.js
import { test, expect } from '@playwright/test';

test('完整购物流程', async ({ page }) => {
    // 访问首页
    await page.goto('http://localhost:3000');
    
    // 浏览产品
    await page.click('text=立即选购');
    
    // 加入购物车
    await page.click('[data-product-id="1"]');
    
    // 结算
    await page.click('text=购物车');
    await page.click('text=去结算');
    
    // 填写信息
    await page.fill('input[name="name"]', '测试用户');
    await page.fill('input[name="phone"]', '13800138000');
    
    // 提交订单
    await page.click('text=提交订单');
    
    // 验证成功
    await expect(page).toHaveURL(/order-success/);
});
```

---

## 🛠️ 测试工具

### 当前配置

| 工具 | 用途 | 版本 |
|------|------|------|
| Vitest | 单元测试框架 | 1.x |
| Supertest | API 测试 | 6.x |

### 推荐添加

| 工具 | 用途 |
|------|------|
| Playwright | E2E 测试 |
| Testing Library | 组件测试 |
| MSW | API Mock |

---

## 📝 测试规范

### 命名规范

```javascript
// 测试文件
{模块名}.test.js
示例：cart.test.js

// 测试套件
describe('模块名', () => { });

// 测试用例
it('应该能做什么', () => { });
it('在什么情况下应该怎样', () => { });
```

### 测试结构

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('功能模块', () => {
    // 测试前准备
    beforeEach(() => {
        // 重置状态
    });

    // 测试后清理
    afterEach(() => {
        // 清理资源
    });

    // 正常场景
    it('应该能正常完成功能', () => {
        // Arrange - 准备数据
        // Act - 执行操作
        // Assert - 验证结果
    });

    // 异常场景
    it('在异常情况下应该抛出错误', () => {
        expect(() => {
            // 执行会失败的操作
        }).toThrow();
    });

    // 边界条件
    it('在边界条件下应该正确处理', () => {
        // 测试边界值
    });
});
```

### 断言规范

```javascript
// 相等
expect(value).toBe(expected);
expect(value).toEqual(expected);

// 布尔值
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// 包含
expect(array).toContain(item);
expect(string).toContain(substring);

// 长度
expect(array).toHaveLength(3);

// 异常
expect(fn).toThrow();
expect(fn).toThrowError('错误信息');

// 自定义
expect(value).toMatchObject({ key: 'value' });
```

---

## 🚀 运行测试

### 基本命令

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- cart.test.js

# 运行匹配的测试
npm test -- -t "购物车"

# 监视模式（开发）
npm test -- --watch

# 生成覆盖率报告
npm test -- --coverage
```

### CI/CD 集成

```yaml
# GitHub Actions 示例
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
```

---

## 📊 测试覆盖率

### 目标

| 代码类型 | 覆盖率目标 |
|----------|------------|
| 工具函数 | > 90% |
| API 接口 | > 80% |
| 页面组件 | > 70% |
| 整体项目 | > 80% |

### 查看覆盖率

```bash
npm test -- --coverage
open coverage/index.html
```

---

## 📌 注意事项

### 测试数据

- ✅ 使用测试专用数据
- ✅ 每个测试独立
- ✅ 测试后清理数据

### Mock 数据

```javascript
// Mock API 响应
vi.mock('../../src/utils/api.js', () => ({
    fetchProducts: vi.fn(() => Promise.resolve([{ id: 1, name: 'Test' }]))
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
};
global.localStorage = localStorageMock;
```

### 测试原则

- ✅ **FIRST 原则**
  - Fast - 快速运行
  - Independent - 相互独立
  - Repeatable - 可重复
  - Self-validating - 自动验证
  - Timely - 及时编写

- ✅ **AAA 模式**
  - Arrange - 准备
  - Act - 执行
  - Assert - 断言

---

## 🔗 相关文档

- [开发指南](../docs/DEVELOPMENT.md) - 测试流程
- [API 文档](../docs/API.md) - 接口说明
- [项目章程](../docs/CHARTER.md) - 质量要求

---

## 📚 学习资源

- [Vitest 文档](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright 文档](https://playwright.dev/)
- [Martin Fowler - 测试金字塔](https://martinfowler.com/bliki/TestPyramid.html)

---

> 🧪 **没有测试的代码就是 Bug 的温床！**

*最后更新：2026-03-22*
