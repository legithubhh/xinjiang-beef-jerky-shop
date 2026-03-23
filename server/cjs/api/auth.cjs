const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database.cjs');

router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: '用户名、邮箱和密码为必填项' }, timestamp: new Date().toISOString() });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, error: { code: 'WEAK_PASSWORD', message: '密码长度至少 8 位' }, timestamp: new Date().toISOString() });
        }
        const existingUser = await db.get('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUser) return res.status(409).json({ success: false, error: { code: 'DUPLICATE_USERNAME', message: '用户名已存在' }, timestamp: new Date().toISOString() });
        const passwordHash = await bcrypt.hash(password, 12);
        const result = await db.execute(`INSERT INTO users (username, email, password_hash, phone) VALUES (?, ?, ?, ?)`, [username, email, passwordHash, phone || null]);
        const token = jwt.sign({ userId: result.lastID, username, role: 'user' }, process.env.JWT_SECRET || 'default-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
        res.status(201).json({ success: true, data: { userId: result.lastID, username, token }, message: '注册成功', timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: '用户名和密码为必填项' }, timestamp: new Date().toISOString() });
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
        if (!user) return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: '用户名或密码错误' }, timestamp: new Date().toISOString() });
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: '用户名或密码错误' }, timestamp: new Date().toISOString() });
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'default-secret', { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
        res.json({ success: true, data: { userId: user.id, username: user.username, token, expiresIn: 86400 }, message: '登录成功', timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

router.get('/me', async (req, res, next) => {
    try {
        const user = await db.get('SELECT id, username, email, phone, nickname, avatar, role, created_at FROM users WHERE id = ?', [req.user.userId]);
        if (!user) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: '用户不存在' }, timestamp: new Date().toISOString() });
        res.json({ success: true, data: user, timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

module.exports = router;
