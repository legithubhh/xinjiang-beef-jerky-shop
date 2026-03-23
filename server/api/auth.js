/**
 * 认证 API 路由
 * 
 * [AI-GENERATED] 2026-03-22 - OpenClaw
 * 用户注册、登录接口
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

/**
 * 用户注册
 * POST /api/auth/register
 */
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password, phone } = req.body;
        
        // 验证必填字段
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: '用户名、邮箱和密码为必填项'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        // 验证密码强度
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'WEAK_PASSWORD',
                    message: '密码长度至少 8 位'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        // 检查用户名是否已存在
        const existingUser = await db.get('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 'DUPLICATE_USERNAME',
                    message: '用户名已存在'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        // 加密密码
        const passwordHash = await bcrypt.hash(password, 12);
        
        // 创建用户
        const result = await db.execute(
            `INSERT INTO users (username, email, password_hash, phone) 
             VALUES (?, ?, ?, ?)`,
            [username, email, passwordHash, phone || null]
        );
        
        // 生成 token
        const token = jwt.sign(
            { userId: result.lastID, username, role: 'user' },
            process.env.JWT_SECRET || 'default-secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );
        
        res.status(201).json({
            success: true,
            data: {
                userId: result.lastID,
                username,
                token
            },
            message: '注册成功',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

/**
 * 用户登录
 * POST /api/auth/login
 */
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        // 验证必填字段
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: '用户名和密码为必填项'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        // 查找用户
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: '用户名或密码错误'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        // 验证密码
        const validPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: '用户名或密码错误'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        // 生成 token
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'default-secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );
        
        res.json({
            success: true,
            data: {
                userId: user.id,
                username: user.username,
                token,
                expiresIn: 86400
            },
            message: '登录成功',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

/**
 * 获取当前用户信息
 * GET /api/auth/me
 */
router.get('/me', async (req, res, next) => {
    try {
        // req.user 由 auth 中间件设置
        const user = await db.get(
            'SELECT id, username, email, phone, nickname, avatar, role, created_at FROM users WHERE id = ?',
            [req.user.userId]
        );
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: '用户不存在'
                },
                timestamp: new Date().toISOString()
            });
        }
        
        res.json({
            success: true,
            data: user,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;
