/**
 * 购物车 API 路由
 * 
 * [AI-GENERATED] 2026-03-22 - OpenClaw
 * 需要认证
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * 获取购物车
 * GET /api/cart
 */
router.get('/', async (req, res, next) => {
    try {
        const userId = req.user.userId;
        
        const items = await db.query(`
            SELECT c.*, p.name, p.price, p.image 
            FROM carts c 
            JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ?
        `, [userId]);
        
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        res.json({
            success: true,
            data: {
                items: items.map(item => ({
                    id: item.id,
                    productId: item.product_id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity,
                    emoji: item.image || '🥩'
                })),
                total,
                itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

/**
 * 添加商品到购物车
 * POST /api/cart/items
 */
router.post('/items', async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity = 1 } = req.body;
        
        // 验证产品是否存在
        const product = await db.get('SELECT id, price, stock FROM products WHERE id = ?', [productId]);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: '产品不存在' },
                timestamp: new Date().toISOString()
            });
        }
        
        // 检查是否已在购物车
        const existing = await db.get('SELECT * FROM carts WHERE user_id = ? AND product_id = ?', [userId, productId]);
        
        if (existing) {
            // 更新数量
            await db.execute(
                'UPDATE carts SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [quantity, existing.id]
            );
        } else {
            // 新增
            await db.execute(
                'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, productId, quantity]
            );
        }
        
        res.json({
            success: true,
            message: '已添加到购物车',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

/**
 * 更新购物车商品数量
 * PUT /api/cart/items/:id
 */
router.put('/items/:id', async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { quantity } = req.body;
        
        if (quantity <= 0) {
            // 删除
            await db.execute('DELETE FROM carts WHERE id = ? AND user_id = ?', [req.params.id, userId]);
        } else {
            await db.execute(
                'UPDATE carts SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
                [quantity, req.params.id, userId]
            );
        }
        
        res.json({
            success: true,
            message: '购物车已更新',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

/**
 * 删除购物车商品
 * DELETE /api/cart/items/:id
 */
router.delete('/items/:id', async (req, res, next) => {
    try {
        await db.execute('DELETE FROM carts WHERE id = ? AND user_id = ?', [req.params.id, req.user.userId]);
        
        res.json({
            success: true,
            message: '商品已删除',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

/**
 * 清空购物车
 * DELETE /api/cart
 */
router.delete('/', async (req, res, next) => {
    try {
        await db.execute('DELETE FROM carts WHERE user_id = ?', [req.user.userId]);
        
        res.json({
            success: true,
            message: '购物车已清空',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;
