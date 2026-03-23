/**
 * 订单列表页面组件
 */
export const OrdersPage = {
    render() {
        const orders = JSON.parse(localStorage.getItem('beef-orders') || '[]');
        
        if (orders.length === 0) {
            return `
                <section class="orders-empty" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 5rem;">📦</span>
                        <h2 style="margin-top: 1rem; color: var(--text-primary);">暂无订单</h2>
                        <p style="color: var(--text-secondary); margin: 1rem 0 2rem;">快去选购心仪的牛肉干吧！</p>
                        <a href="#/products" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">
                            去选购 →
                        </a>
                    </div>
                </section>
            `;
        }
        
        const statusMap = {
            'pending': { text: '待付款', color: 'var(--warning)' },
            'paid': { text: '已付款', color: 'var(--info)' },
            'processing': { text: '配货中', color: 'var(--primary-color)' },
            'shipped': { text: '已发货', color: 'var(--info)' },
            'delivered': { text: '已签收', color: 'var(--success)' },
            'completed': { text: '已完成', color: 'var(--success)' }
        };
        
        // 按时间倒序排列
        const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return `
            <!-- 页面头部 -->
            <section class="page-header" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 2rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2rem;">📦 我的订单</h2>
                    <p style="opacity: 0.9; margin-top: 0.5rem;">共 ${orders.length} 个订单</p>
                </div>
            </section>

            <!-- 订单列表 -->
            <section class="orders-list" style="padding: 2rem 0;">
                <div class="container" style="max-width: 800px;">
                    ${sortedOrders.map(order => {
                        const status = statusMap[order.status] || statusMap['pending'];
                        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                        
                        return `
                            <div class="card order-item" style="padding: 1.5rem; margin-bottom: 1.5rem;" data-order-id="${order.id}">
                                <!-- 订单头部 -->
                                <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
                                    <div>
                                        <span style="color: var(--text-secondary); font-size: 0.9rem;">订单号：</span>
                                        <span style="font-family: monospace;">${order.id}</span>
                                    </div>
                                    <div>
                                        <span style="color: var(--text-secondary); font-size: 0.9rem;">下单时间：</span>
                                        <span>${new Date(order.createdAt).toLocaleDateString('zh-CN')}</span>
                                    </div>
                                    <span style="background: ${status.color}; color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem;">
                                        ${status.text}
                                    </span>
                                </div>
                                
                                <!-- 商品列表 -->
                                <div style="margin-bottom: 1rem;">
                                    ${order.items.slice(0, 3).map(item => `
                                        <div style="display: flex; gap: 1rem; padding: 0.75rem 0;">
                                            <div style="width: 60px; height: 60px; background: var(--background-alt); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                                <span style="font-size: 2rem;">${item.emoji}</span>
                                            </div>
                                            <div style="flex: 1;">
                                                <div style="font-weight: 500; margin-bottom: 0.25rem;">${item.name}</div>
                                                <div style="color: var(--text-secondary); font-size: 0.85rem;">¥${item.price} × ${item.quantity}</div>
                                            </div>
                                            <div style="color: var(--primary-color); font-weight: 500;">
                                                ¥${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    `).join('')}
                                    ${order.items.length > 3 ? `
                                        <div style="text-align: center; padding: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
                                            还有 ${order.items.length - 3} 件商品...
                                        </div>
                                    ` : ''}
                                </div>
                                
                                <!-- 订单底部 -->
                                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                                    <div>
                                        <span style="color: var(--text-secondary);">共 ${itemCount} 件商品</span>
                                        <span style="margin-left: 1rem; color: var(--text-secondary);">实付：</span>
                                        <span style="color: var(--primary-color); font-size: 1.3rem; font-weight: bold;">¥${(order.total + order.shipping).toFixed(2)}</span>
                                    </div>
                                    <div style="display: flex; gap: 0.75rem;">
                                        ${order.status === 'pending' ? `
                                            <button class="btn btn-outline cancel-order" style="border-color: var(--error); color: var(--error); padding: 0.5rem 1rem; font-size: 0.9rem;" data-order-id="${order.id}">取消订单</button>
                                            <button class="btn btn-primary pay-order" style="padding: 0.5rem 1rem; font-size: 0.9rem;" data-order-id="${order.id}">立即支付</button>
                                        ` : ''}
                                        ${order.status === 'shipped' ? `
                                            <button class="btn btn-outline view-logistics" style="padding: 0.5rem 1rem; font-size: 0.9rem;" data-order-id="${order.id}">查看物流</button>
                                        ` : ''}
                                        ${order.status === 'delivered' ? `
                                            <button class="btn btn-outline confirm-receive" style="padding: 0.5rem 1rem; font-size: 0.9rem;" data-order-id="${order.id}">确认收货</button>
                                        ` : ''}
                                        <a href="#/order-status/${order.id}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-color: var(--primary-color); color: var(--primary-color);">查看详情</a>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        // 取消订单
        document.querySelectorAll('.cancel-order').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('确定要取消这个订单吗？')) {
                    const orderId = e.target.dataset.orderId;
                    const orders = JSON.parse(localStorage.getItem('beef-orders') || '[]');
                    const index = orders.findIndex(o => o.id === orderId);
                    if (index !== -1) {
                        orders[index].status = 'cancelled';
                        localStorage.setItem('beef-orders', JSON.stringify(orders));
                        window.location.reload();
                    }
                }
            });
        });
        
        // 立即支付
        document.querySelectorAll('.pay-order').forEach(btn => {
            btn.addEventListener('click', (e) => {
                alert('支付功能开发中...');
            });
        });
        
        // 查看物流
        document.querySelectorAll('.view-logistics').forEach(btn => {
            btn.addEventListener('click', (e) => {
                alert('物流功能开发中...');
            });
        });
        
        // 确认收货
        document.querySelectorAll('.confirm-receive').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('确认已收到商品吗？')) {
                    const orderId = e.target.dataset.orderId;
                    const orders = JSON.parse(localStorage.getItem('beef-orders') || '[]');
                    const index = orders.findIndex(o => o.id === orderId);
                    if (index !== -1) {
                        orders[index].status = 'completed';
                        localStorage.setItem('beef-orders', JSON.stringify(orders));
                        window.location.reload();
                    }
                }
            });
        });
    }
};
