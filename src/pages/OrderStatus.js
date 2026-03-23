/**
 * 订单状态页面组件
 */
export const OrderStatusPage = {
    render(orderId) {
        const orders = JSON.parse(localStorage.getItem('beef-orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        
        if (!order) {
            return `
                <section class="not-found" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 5rem;">😕</span>
                        <h2 style="margin-top: 1rem;">订单不存在</h2>
                        <a href="#/orders" class="btn btn-primary" style="margin-top: 1rem;">查看我的订单</a>
                    </div>
                </section>
            `;
        }
        
        const statusMap = {
            'pending': { text: '待付款', color: 'var(--warning)', icon: '⏳' },
            'paid': { text: '已付款', color: 'var(--info)', icon: '💳' },
            'processing': { text: '配货中', color: 'var(--primary-color)', icon: '📦' },
            'shipped': { text: '已发货', color: 'var(--info)', icon: '🚚' },
            'delivered': { text: '已签收', color: 'var(--success)', icon: '✅' },
            'completed': { text: '已完成', color: 'var(--success)', icon: '🎉' }
        };
        
        const status = statusMap[order.status] || statusMap['pending'];
        
        // 订单时间线
        const timeline = [
            { status: 'pending', label: '订单提交', time: order.createdAt, completed: true },
            { status: 'paid', label: '订单支付', time: null, completed: order.status !== 'pending' },
            { status: 'processing', label: '配货完成', time: null, completed: ['processing', 'shipped', 'delivered', 'completed'].includes(order.status) },
            { status: 'shipped', label: '已发货', time: null, completed: ['shipped', 'delivered', 'completed'].includes(order.status) },
            { status: 'delivered', label: '已签收', time: null, completed: ['delivered', 'completed'].includes(order.status) }
        ];
        
        return `
            <!-- 页面头部 -->
            <section class="page-header" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 2rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2rem;">📦 订单详情</h2>
                    <p style="opacity: 0.9; margin-top: 0.5rem;">订单号：${order.id}</p>
                </div>
            </section>

            <!-- 订单内容 -->
            <section class="order-detail" style="padding: 2rem 0;">
                <div class="container" style="max-width: 800px;">
                    <!-- 订单状态 -->
                    <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                            <div>
                                <span style="font-size: 2rem; margin-right: 0.75rem;">${status.icon}</span>
                                <span style="font-size: 1.5rem; font-weight: 500; color: ${status.color};">${status.text}</span>
                            </div>
                            ${order.status === 'pending' ? `
                                <button class="btn btn-primary" onclick="alert('支付功能开发中...')">立即支付</button>
                            ` : ''}
                            ${order.status === 'delivered' ? `
                                <button class="btn btn-primary" onclick="alert('确认收货功能开发中...')">确认收货</button>
                            ` : ''}
                        </div>
                        
                        <!-- 时间线 -->
                        <div class="order-timeline" style="position: relative; padding: 1rem 0;">
                            <div style="position: absolute; top: 20px; left: 0; right: 0; height: 2px; background: var(--border-color);"></div>
                            <div style="display: flex; justify-content: space-between; position: relative;">
                                ${timeline.map((item, index) => `
                                    <div style="text-align: center; flex: 1;">
                                        <div style="width: 40px; height: 40px; margin: 0 auto 0.75rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: ${item.completed ? 'var(--primary-color)' : 'var(--border-color)'}; color: white; font-size: 1.2rem; position: relative; z-index: 1;">
                                            ${item.completed ? '✓' : index + 1}
                                        </div>
                                        <div style="font-size: 0.9rem; font-weight: 500; margin-bottom: 0.25rem;">${item.label}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-light);">${item.time ? new Date(item.time).toLocaleDateString('zh-CN') : '-'}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- 收货信息 -->
                    <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                            📍 收货信息
                        </h3>
                        <div style="display: grid; gap: 0.75rem;">
                            <div><span style="color: var(--text-secondary);">收货人：</span>${order.name}</div>
                            <div><span style="color: var(--text-secondary);">手机号：</span>${order.phone}</div>
                            <div><span style="color: var(--text-secondary);">地址：</span>${order.province}${order.city}${order.district}${order.address}</div>
                        </div>
                    </div>
                    
                    <!-- 商品列表 -->
                    <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                            📦 商品信息
                        </h3>
                        ${order.items.map(item => `
                            <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                                <div style="width: 80px; height: 80px; background: var(--background-alt); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <span style="font-size: 2.5rem;">${item.emoji}</span>
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 500; margin-bottom: 0.5rem;">${item.name}</div>
                                    <div style="color: var(--text-secondary); font-size: 0.9rem;">${item.weight}</div>
                                    <div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">¥${item.price} × ${item.quantity}</div>
                                </div>
                                <div style="color: var(--primary-color); font-weight: 500; font-size: 1.2rem;">
                                    ¥${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        `).join('')}
                        
                        <div style="display: flex; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border-color);">
                            <span style="font-size: 1.2rem; font-weight: 500;">订单总额</span>
                            <span style="color: var(--primary-color); font-size: 1.5rem; font-weight: bold;">¥${(order.total + order.shipping).toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <!-- 操作按钮 -->
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        ${order.status === 'pending' ? `
                            <button class="btn btn-outline" style="border-color: var(--error); color: var(--error);" onclick="alert('取消订单功能开发中...')">取消订单</button>
                            <button class="btn btn-primary" onclick="alert('支付功能开发中...')">立即支付</button>
                        ` : ''}
                        ${order.status === 'shipped' ? `
                            <button class="btn btn-primary" onclick="alert('查看物流功能开发中...')">🚚 查看物流</button>
                        ` : ''}
                        ${order.status === 'delivered' ? `
                            <button class="btn btn-outline" onclick="alert('申请售后功能开发中...')">申请售后</button>
                            <button class="btn btn-primary" onclick="alert('评价功能开发中...')">评价商品</button>
                        ` : ''}
                        <a href="#/orders" class="btn btn-outline" style="border-color: var(--primary-color); color: var(--primary-color);">返回订单列表</a>
                    </div>
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        // 页面加载后无特殊操作
    }
};
