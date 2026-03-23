/**
 * 应用配置
 * 
 * [AI-GENERATED] 2026-03-22 - OpenClaw
 */

module.exports = {
    // 服务器配置
    server: {
        port: process.env.PORT || 3001,
        host: process.env.HOST || 'localhost',
        env: process.env.NODE_ENV || 'development'
    },
    
    // JWT 配置
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    },
    
    // 数据库配置
    database: {
        path: process.env.DB_PATH || './data/database.sqlite'
    },
    
    // 速率限制配置
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    },
    
    // CORS 配置
    cors: {
        origins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']
    }
};
