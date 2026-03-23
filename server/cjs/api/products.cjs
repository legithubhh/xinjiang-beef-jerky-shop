const express = require('express');
const router = express.Router();
const db = require('../config/database.cjs');

router.get('/', async (req, res, next) => {
    try {
        const { page = 1, limit = 20, tag, sort } = req.query;
        const offset = (page - 1) * limit;
        let whereClause = 'WHERE status = ?';
        let params = ['active'];
        if (tag && tag !== 'all') { whereClause += ' AND tags LIKE ?'; params.push(`%${tag}%`); }
        let orderBy = 'ORDER BY id DESC';
        if (sort === 'price_asc') orderBy = 'ORDER BY price ASC';
        if (sort === 'price_desc') orderBy = 'ORDER BY price DESC';
        if (sort === 'sales') orderBy = 'ORDER BY sales DESC';
        const countQuery = `SELECT COUNT(*) as count FROM products ${whereClause}`;
        const countResult = await db.get(countQuery, params);
        const total = countResult?.count || 0;
        const query = `SELECT * FROM products ${whereClause} ${orderBy} LIMIT ? OFFSET ?`;
        const products = await db.query(query, [...params, parseInt(limit), parseInt(offset)]);
        const formattedProducts = products.map(p => ({ id: p.id, name: p.name, description: p.description, price: p.price, originalPrice: p.original_price, weight: '250g', stock: p.stock, sales: p.sales, rating: p.rating, reviews: p.reviews, emoji: p.image || '🥩', tags: p.tags ? p.tags.split(',') : [] }));
        res.json({ success: true, data: { products: formattedProducts, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / limit) } }, timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const product = await db.get('SELECT * FROM products WHERE id = ? AND status = ?', [req.params.id, 'active']);
        if (!product) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: '产品不存在' }, timestamp: new Date().toISOString() });
        res.json({ success: true, data: { id: product.id, name: product.name, description: product.description, price: product.price, originalPrice: product.original_price, weight: '250g', ingredients: '牛肉、香辛料', shelfLife: '12 个月', storage: '阴凉干燥处保存', origin: '新疆', stock: product.stock, sales: product.sales, rating: product.rating, reviews: product.reviews, emoji: product.image || '🥩', tags: product.tags ? product.tags.split(',') : [] }, timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

router.get('/search', async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: '请提供搜索关键词' }, timestamp: new Date().toISOString() });
        const keyword = `%${q}%`;
        const products = await db.query(`SELECT * FROM products WHERE status = ? AND (name LIKE ? OR description LIKE ?) ORDER BY sales DESC LIMIT 20`, ['active', keyword, keyword]);
        res.json({ success: true, data: { products: products.map(p => ({ id: p.id, name: p.name, price: p.price, emoji: p.image || '🥩' })), keyword: q }, timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

module.exports = router;
