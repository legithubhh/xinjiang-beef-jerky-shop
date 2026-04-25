/**
 * 产品详情页组件
 */
import { getProductById } from '../utils/products.js';
import { addToCart } from '../utils/cart.js';

export const ProductDetailPage = {
    render(productId) {
        const product = getProductById(productId);
        
        if (!product) {
            return `
                <section class="not-found" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 5rem;">😕</span>
                        <h2 style="margin-top: 1rem;">产品不存在</h2>
                        <a href="#/products" class="btn btn-primary" style="margin-top: 1rem;">返回产品列表</a>
                    </div>
                </section>
            `;
        }
        
        // 存储产品到全局，供事件监听器使用
        window.currentProduct = product;
        
        return `
            <!-- 产品详情 -->
            <section class="product-detail" style="padding: 3rem 0;">
                <div class="container">
                    <div class="grid grid-2" style="gap: 3rem; align-items: start;">
                        <!-- 产品图片 -->
                        <div class="product-image" style="background: var(--background-alt); border-radius: var(--radius-lg); height: 400px; display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 10rem;">${product.emoji}</span>
                        </div>
                        
                        <!-- 产品信息 -->
                        <div class="product-info">
                            <div style="margin-bottom: 1rem;">
                                ${product.tags.map(tag => `<span style="background: var(--primary-color); color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem; margin-right: 0.5rem;">${tag}</span>`).join('')}
                            </div>
                            
                            <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">${product.name}</h1>
                            
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                                <span style="color: var(--warning); font-size: 1.2rem;">⭐ ${product.rating}</span>
                                <span style="color: var(--text-secondary);">${product.reviews} 条评价</span>
                                <span style="color: var(--text-secondary);">已售 ${product.sales}</span>
                            </div>
                            
                            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem;">
                                <span style="color: var(--primary-color); font-size: 2.5rem; font-weight: bold;">¥${product.price}/kg</span>
                                ${product.originalPrice > product.price ? `<span style="color: var(--text-light); font-size: 1.5rem; text-decoration: line-through;">¥${product.originalPrice}</span>` : ''}
                                <span style="color: var(--text-secondary);">/${product.weight}</span>
                            </div>
                            
                            <p style="color: var(--text-secondary); line-height: 2; margin-bottom: 2rem;">${product.description}</p>
                            
                            <!-- 数量选择 -->
                            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                                <span style="color: var(--text-primary); font-weight: 500;">数量：</span>
                                <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                    <button type="button" class="qty-btn" data-action="decrease" style="width: 40px; height: 40px; border: none; background: var(--background-alt); cursor: pointer; font-size: 1.2rem;">-</button>
                                    <input type="number" id="product-quantity" value="1" min="1" max="99" style="width: 60px; height: 40px; border: none; text-align: center; font-size: 1rem;" />
                                    <button type="button" class="qty-btn" data-action="increase" style="width: 40px; height: 40px; border: none; background: var(--background-alt); cursor: pointer; font-size: 1.2rem;">+</button>
                                </div>
                                <span style="color: var(--text-light); font-size: 0.9rem;">库存：${product.stock}</span>
                            </div>
                            
                            <!-- 购买按钮 -->
                            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                                <button type="button" id="add-to-cart-btn" class="btn btn-primary" style="flex: 1; padding: 1rem 2rem; font-size: 1.1rem;">
                                    🛒 加入购物车
                                </button>
                                <button type="button" id="buy-now-btn" class="btn" style="background: var(--secondary-color); color: white; flex: 1; padding: 1rem 2rem; font-size: 1.1rem;">
                                    ⚡ 立即购买
                                </button>
                            </div>
                            
                            <!-- 配送信息 -->
                            <div style="background: var(--background-alt); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
                                <div style="display: flex; gap: 1rem; margin-bottom: 0.75rem;">
                                    <span style="color: var(--text-secondary); width: 80px;">配送</span>
                                    <span>🚚 新疆发货 · 满 200 元包邮</span>
                                </div>
                                <div style="display: flex; gap: 1rem; margin-bottom: 0.75rem;">
                                    <span style="color: var(--text-secondary); width: 80px;">服务</span>
                                    <span>✅ 7 天无理由退换 · 正品保证</span>
                                </div>
                                <div style="display: flex; gap: 1rem;">
                                    <span style="color: var(--text-secondary); width: 80px;">保质期</span>
                                    <span>📅 ${product.shelfLife}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 产品详情标签页 -->
                    <div class="product-tabs" style="margin-top: 4rem;">
                        <div class="tab-headers" style="display: flex; border-bottom: 2px solid var(--border-color); margin-bottom: 2rem;">
                            <button type="button" class="tab-btn active" data-tab="detail" style="padding: 1rem 2rem; border: none; background: none; font-size: 1.1rem; font-weight: 500; color: var(--primary-color); border-bottom: 2px solid var(--primary-color); margin-bottom: -2px; cursor: pointer;">商品详情</button>
                            <button type="button" class="tab-btn" data-tab="params" style="padding: 1rem 2rem; border: none; background: none; font-size: 1.1rem; font-weight: 500; color: var(--text-secondary); cursor: pointer;">规格参数</button>
                            <button type="button" class="tab-btn" data-tab="reviews" style="padding: 1rem 2rem; border: none; background: none; font-size: 1.1rem; font-weight: 500; color: var(--text-secondary); cursor: pointer;">用户评价 (${product.reviews})</button>
                        </div>
                        
                        <div class="tab-content" id="tab-detail">
                            <div style="line-height: 2; color: var(--text-secondary);">
                                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">产品介绍</h3>
                                <p>正宗新疆手工牛肉干，选用优质黄牛后腿肉，传统工艺手工制作。经过多道工序精心制作，保留牛肉的营养和鲜美口感。</p>
                                <p style="margin-top: 1rem;">每一块牛肉干都经过严格筛选，确保品质上乘。不添加防腐剂，健康美味，是您休闲零食和送礼的绝佳选择。</p>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="tab-params" style="display: none;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 1rem; background: var(--background-alt); font-weight: 500; width: 150px;">产品名称</td>
                                    <td style="padding: 1rem;">${product.name}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 1rem; background: var(--background-alt); font-weight: 500;">规格</td>
                                    <td style="padding: 1rem;">${product.weight}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 1rem; background: var(--background-alt); font-weight: 500;">配料</td>
                                    <td style="padding: 1rem;">${product.ingredients}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 1rem; background: var(--background-alt); font-weight: 500;">保质期</td>
                                    <td style="padding: 1rem;">${product.shelfLife}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 1rem; background: var(--background-alt); font-weight: 500;">储存方法</td>
                                    <td style="padding: 1rem;">${product.storage}</td>
                                </tr>
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 1rem; background: var(--background-alt); font-weight: 500;">产地</td>
                                    <td style="padding: 1rem;">${product.origin}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div class="tab-content" id="tab-reviews" style="display: none;">
                            <div style="text-align: center; padding: 3rem 0; color: var(--text-secondary);">
                                <span style="font-size: 3rem;">⭐</span>
                                <p style="margin-top: 1rem;">用户评价功能开发中...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        // 数量增减
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const input = document.getElementById('product-quantity');
                if (!input) return;
                
                const currentValue = parseInt(input.value) || 1;
                const action = btn.dataset.action;
                
                if (action === 'increase') {
                    input.value = Math.min(currentValue + 1, 99);
                } else if (action === 'decrease') {
                    input.value = Math.max(currentValue - 1, 1);
                }
            });
        });
        
        // 加入购物车
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const product = window.currentProduct;
                const quantityInput = document.getElementById('product-quantity');
                const quantity = parseInt(quantityInput?.value || '1');
                
                if (!product) {
                    alert('产品信息加载失败，请刷新页面重试');
                    return;
                }
                
                for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                }
                
                // 显示成功提示
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = '✅ 已添加到购物车';
                addToCartBtn.style.background = 'var(--success)';
                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                    addToCartBtn.style.background = '';
                }, 1500);
            });
        }
        
        // 立即购买
        const buyNowBtn = document.getElementById('buy-now-btn');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const product = window.currentProduct;
                const quantityInput = document.getElementById('product-quantity');
                const quantity = parseInt(quantityInput?.value || '1');
                
                if (!product) {
                    alert('产品信息加载失败，请刷新页面重试');
                    return;
                }
                
                for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                }
                window.location.hash = '#/cart';
            });
        }
        
        // 标签页切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = btn.dataset.tab;
                
                // 更新按钮样式
                document.querySelectorAll('.tab-btn').forEach(b => {
                    b.style.color = 'var(--text-secondary)';
                    b.style.borderBottom = 'none';
                });
                btn.style.color = 'var(--primary-color)';
                btn.style.borderBottom = '2px solid var(--primary-color)';
                
                // 切换内容
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                const targetTab = document.getElementById(`tab-${tabId}`);
                if (targetTab) {
                    targetTab.style.display = 'block';
                }
            });
        });
    }
};
