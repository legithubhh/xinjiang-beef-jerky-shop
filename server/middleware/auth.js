/**
 * JWT 认证中间件
 * 
 * [AI-GENERATED] 2026-03-22 - OpenClaw
 */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 从请求头获取 token
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: '未提供认证信息'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        const token = authHeader.split(' ')[1];
        
        // 验证 token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
        
        // 将用户信息附加到请求对象
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role
        };
        
        console.log(`✅ 用户认证通过：${req.user.username} (${req.user.userId})`);
        next();
        
    } catch (error) {
        console.error('❌ Token 验证失败:', error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'TOKEN_EXPIRED',
                    message: 'Token 已过期，请重新登录'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        return res.status(401).json({
            success: false,
            error: {
                code: 'INVALID_TOKEN',
                message: '无效的 Token'
            },
            timestamp: new Date().toISOString()
        });
    }
};
