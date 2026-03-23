/**
 * 订单成功页面组件
 */
export const OrderSuccessPage = {
    render(orderId) {
        const orders = JSON.parse(localStorage.getItem('beef-orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        
        if (!order) {
            return `
                <section class="not-found" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 5rem;">😕</span>
                        <h2 style="margin-top: 1rem;">订单不存在</h2>
                        <a href="#/products" class="btn btn-primary" style="margin-top: 1rem;">去选购</a>
                    </div>
                </section>
            `;
        }
        
        const estimatedDate = new Date();
        estimatedDate.setDate(estimatedDate.getDate() + 5);
        
        return `
            <section class="order-success" style="padding: 4rem 0;">
                <div class="container" style="max-width: 600px;">
                    <div class="card" style="padding: 3rem; text-align: center;">
                        <div style="font-size: 5rem; margin-bottom: 1rem;">✅</div>
                        <h1 style="color: var(--success); margin-bottom: 0.5rem;">订单提交成功！</h1>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                            订单号：<span style="color: var(--text-primary); font-weight: 500; font-family: monospace;">${order.id}</span>
                        </p>
                        
                        <div style="background: var(--background-alt); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem; text-align: left;">
                            <h3 style="margin-bottom: 1rem; font-size: 1.1rem;">📦 订单信息</h3>
                            <div style="display: grid; gap: 0.75rem; font-size: 0.95rem;">
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary);">收货人</span>
                                    <span>${order.name} ${order.phone}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary);">收货地址</span>
                                    <span style="text-align: right;">${order.province}${order.city}${order.district}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="color: var(--text-secondary);">支付方式</span>
                                    <span>${order.payment === 'wechat' ? '微信支付' : order.payment === 'alipay' ? '支付宝' : '银行卡'}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid var(--border-color);">
                                    <span style="font-weight: 500;">订单金额</span>
                                    <span style="color: var(--primary-color); font-weight: bold; font-size: 1.2rem;">¥${(order.total + order.shipping).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: #fff3cd; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 2rem; text-align: left;">
                            <div style="display: flex; gap: 0.75rem;">
                                <span style="font-size: 1.5rem;">📬</span>
                                <div>
                                    <div style="font-weight: 500; margin-bottom: 0.25rem;">订单处理中</div>
                                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                                        预计 <span style="color: var(--primary-color); font-weight: 500;">${estimatedDate.toLocaleDateString('zh-CN')}</span> 送达
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 1rem;">
                            <a href="#/order-status/${order.id}" class="btn btn-primary" style="flex: 1; padding: 1rem;">
                                查看订单
                            </a>
                            <a href="#/products" class="btn btn-outline" style="flex: 1; padding: 1rem; border-color: var(--primary-color); color: var(--primary-color);">
                                继续购物
                            </a>
                        </div>
                        
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 1.5rem;">
                            📞 如有疑问，请联系客服：400-XXX-XXXX
                        </p>
                    </div>
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        // 页面加载后无特殊操作
    }
};
