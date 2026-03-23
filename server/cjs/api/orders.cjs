const express = require('express');
const router = express.Router();
const db = require('../config/database.cjs');

router.get('/', async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { status, page = 1, limit = 10 } = req.query;
        let whereClause = 'WHERE user_id = ?';
        let params = [userId];
        if (status) { whereClause += ' AND status = ?'; params.push(status); }
        const orders = await db.query(`SELECT * FROM orders ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, parseInt(limit), (page - 1) * limit]);
        res.json({ success: true, data: { orders: orders.map(o => ({ id: o.id, orderNo: o.order_no, totalAmount: o.total_amount, shippingFee: o.shipping_fee, finalAmount: o.final_amount, status: o.status, createdAt: o.created_at })) }, timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { shippingAddress, paymentMethod, message } = req.body;
        const cartItems = await db.query(`SELECT c.*, p.name, p.price FROM carts c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`, [userId]);
        if (cartItems.length === 0) return res.status(400).json({ success: false, error: { code: 'EMPTY_CART', message: '购物车为空' }, timestamp: new Date().toISOString() });
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingFee = totalAmount >= 200 ? 0 : 15;
        const finalAmount = totalAmount + shippingFee;
        const orderNo = 'XJ' + Date.now();
        const orderResult = await db.execute(`INSERT INTO orders (order_no, user_id, total_amount, shipping_fee, final_amount, payment_method, shipping_name, shipping_phone, shipping_address, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [orderNo, userId, totalAmount, shippingFee, finalAmount, paymentMethod, shippingAddress.name, shippingAddress.phone, `${shippingAddress.province}${shippingAddress.city}${shippingAddress.district}${shippingAddress.address}`, message || null]);
        for (const item of cartItems) {
            await db.execute(`INSERT INTO order_items (order_id, product_id, product_name, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?, ?)`, [orderResult.lastID, item.product_id, item.name, item.price, item.quantity, item.price * item.quantity]);
        }
        await db.execute('DELETE FROM carts WHERE user_id = ?', [userId]);
        res.status(201).json({ success: true, data: { orderId: orderNo, totalAmount, shippingFee, finalAmount }, message: '订单创建成功', timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const order = await db.get(`SELECT * FROM orders WHERE order_no = ? AND user_id = ?`, [req.params.id, req.user.userId]);
        if (!order) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: '订单不存在' }, timestamp: new Date().toISOString() });
        const items = await db.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
        res.json({ success: true, data: { id: order.id, orderNo: order.order_no, totalAmount: order.total_amount, shippingFee: order.shipping_fee, finalAmount: order.final_amount, status: order.status, paymentMethod: order.payment_method, shippingAddress: { name: order.shipping_name, phone: order.shipping_phone, address: order.shipping_address }, message: order.message, items: items.map(i => ({ productId: i.product_id, name: i.product_name, price: i.price, quantity: i.quantity, subtotal: i.subtotal })), createdAt: order.created_at }, timestamp: new Date().toISOString() });
    } catch (error) { next(error); }
});

module.exports = router;
