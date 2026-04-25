/**
 * 新疆手工牛肉干电商后端服务
 * 
 * [AI-GENERATED] 2026-03-22 - OpenClaw
 * 后端服务入口文件
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// 导入配置
const config = require('./config/app');
const database = require('./config/database');

// 导入中间件
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// 导入路由
const authRoutes = require('./api/auth');
const productRoutes = require('./api/products');
const cartRoutes = require('./api/cart');
const orderRoutes = require('./api/orders');

// 创建 Express 应用
const app = express();

// ============================================
// 全局中间件
// ============================================

// CORS 配置
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 安全头
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// 请求日志
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Body 解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// API 路由
// ============================================

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: '服务运行正常',
        timestamp: new Date().toISOString()
    });
});

// 认证路由
app.use('/api/auth', authRoutes);

// 产品路由 (公开)
app.use('/api/products', productRoutes);

// 需要认证的路由
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

// ============================================
// 静态文件服务 (生产环境)
// ============================================

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

// ============================================
// 错误处理
// ============================================

// 404 处理
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: '接口不存在'
        },
        timestamp: new Date().toISOString()
    });
});

// 全局错误处理
app.use(errorHandler);

// ============================================
// 启动服务器
// ============================================

const PORT = process.env.PORT || 3001;

// 初始化数据库
database.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🥩 新疆手工牛肉干电商后端服务                        ║
║                                                        ║
║   环境：${process.env.NODE_ENV || 'development'}                                        ║
║   端口：${PORT}                                          ║
║   时间：${new Date().toLocaleString('zh-CN')}                          ║
║                                                        ║
║   状态：✅ 服务已启动                                   ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
            `);
        });
    })
    .catch(err => {
        console.error('❌ 数据库初始化失败:', err);
        process.exit(1);
    });

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('📴 收到 SIGTERM 信号，正在关闭...');
    database.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('📴 收到 SIGINT 信号，正在关闭...');
    database.close();
    process.exit(0);
});

module.exports = app;
