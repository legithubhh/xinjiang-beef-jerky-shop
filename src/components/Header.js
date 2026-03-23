/**
 * 页头组件
 */
export const Header = {
    render() {
        // 获取购物车数量
        let cartCount = 0;
        try {
            const cart = JSON.parse(localStorage.getItem('beef-cart') || '[]');
            cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        } catch (e) {
            console.error('读取购物车失败:', e);
        }
        
        return `
            <nav class="header" style="background: var(--primary-color); padding: 1rem 0; box-shadow: var(--shadow-md); position: sticky; top: 0; z-index: 1000;">
                <div class="container">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div class="logo">
                            <a href="#/" style="text-decoration: none;">
                                <h1 style="color: white; font-size: 1.5rem; font-weight: bold; margin: 0;">
                                    🥩 新疆手工牛肉干
                                </h1>
                            </a>
                        </div>
                        <div class="nav-menu">
                            <ul style="display: flex; list-style: none; gap: 2rem; margin: 0; padding: 0;">
                                <li><a href="#/" style="color: white; text-decoration: none; font-weight: 500;">首页</a></li>
                                <li><a href="#/products" style="color: white; text-decoration: none; font-weight: 500;">产品</a></li>
                                <li><a href="#/orders" style="color: white; text-decoration: none; font-weight: 500;">我的订单</a></li>
                                <li><a href="#/about" style="color: white; text-decoration: none; font-weight: 500;">关于我们</a></li>
                                <li>
                                    <a href="#/cart" style="color: white; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.25rem;">
                                        🛒 购物车 
                                        <span id="cart-count" style="background: var(--accent-color); color: var(--text-primary); padding: 0.2rem 0.5rem; border-radius: var(--radius-full); font-size: 0.8rem; min-width: 20px; text-align: center;">${cartCount}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    },
    
    attachListeners() {
        // 导航链接点击处理
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                // 让默认行为发生（hash 路由）
                console.log('导航到:', link.getAttribute('href'));
            });
        });
        
        // 更新购物车计数
        this.updateCartCount();
    },
    
    updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('beef-cart') || '[]');
            const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            const countEl = document.getElementById('cart-count');
            if (countEl) {
                countEl.textContent = count;
            }
        } catch (e) {
            console.error('更新购物车计数失败:', e);
        }
    }
};
