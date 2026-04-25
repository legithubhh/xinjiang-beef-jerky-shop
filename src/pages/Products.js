/**
 * 产品列表页组件
 */
import { getAllProducts, getProductsByTag, getProductById } from '../utils/products.js';
import { addToCart } from '../utils/cart.js';

export const ProductsPage = {
    render(filter = 'all') {
        let products = getAllProducts();
        
        if (filter !== 'all') {
            products = getProductsByTag(filter);
        }
        
        const tags = ['all', '热销', '经典', '新品', '特色', '礼盒'];
        
        return `
            <!-- 页面头部 -->
            <section class="page-header" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 3rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒 全部产品</h2>
                    <p style="opacity: 0.9;">精选新疆手工牛肉干，总有一款适合你</p>
                </div>
            </section>

            <!-- 筛选标签 -->
            <section class="filter-section" style="padding: 2rem 0; background: var(--background-alt);">
                <div class="container">
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        ${tags.map(tag => `
                            <button type="button" class="filter-btn btn ${tag === filter ? 'btn-primary' : 'btn-outline'}" 
                                    data-filter="${tag}"
                                    style="${tag === filter ? '' : 'border-color: var(--primary-color); color: var(--primary-color);'}">
                                ${tag === 'all' ? '全部' : tag}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- 产品网格 -->
            <section class="products-grid" style="padding: 3rem 0;">
                <div class="container">
                    <div class="grid grid-4" style="gap: 1.5rem;">
                        ${products.map(product => `
                            <div class="card product-card" data-product-id="${product.id}">
                                <div style="height: 180px; background: var(--background-alt); display: flex; align-items: center; justify-content: center; position: relative;">
                                    <span style="font-size: 5rem;">${product.emoji}</span>
                                    ${product.tags.includes('热销') ? '<span style="position: absolute; top: 10px; left: 10px; background: var(--primary-color); color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem;">🔥 热销</span>' : ''}
                                    ${product.tags.includes('新品') ? '<span style="position: absolute; top: 10px; left: 10px; background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem;">✨ 新品</span>' : ''}
                                    ${product.originalPrice > product.price ? '<span style="position: absolute; top: 10px; right: 10px; background: var(--error); color: white; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.75rem;">特价</span>' : ''}
                                </div>
                                <div class="card-content" style="padding: 1.25rem;">
                                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</h4>
                                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.description}</p>
                                    <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.75rem;">
                                        <span style="color: var(--primary-color); font-size: 1.3rem; font-weight: bold;">¥${product.price}/kg</span>
                                        ${product.originalPrice > product.price ? `<span style="color: var(--text-light); font-size: 0.9rem; text-decoration: line-through;">¥${product.originalPrice}</span>` : ''}
                                        <span style="color: var(--text-light); font-size: 0.85rem; margin-left: auto;">${product.weight}</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem;">
                                        <span style="color: var(--warning);">⭐ ${product.rating}</span>
                                        <span style="color: var(--text-light);">(${product.reviews} 条)</span>
                                        <span style="color: var(--text-light); margin-left: auto;">已售 ${product.sales}</span>
                                    </div>
                                    <button type="button" class="btn btn-primary add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" style="width: 100%;">
                                        🛒 加入购物车
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${products.length === 0 ? `
                        <div style="text-align: center; padding: 4rem 0;">
                            <span style="font-size: 4rem;">😕</span>
                            <p style="color: var(--text-secondary); margin-top: 1rem;">暂无产品</p>
                        </div>
                    ` : ''}
                    
                    ${products.length > 0 ? `
                        <div style="text-align: center; margin-top: 2rem; color: var(--text-secondary); font-size: 0.9rem;">
                            共 ${products.length} 款产品
                        </div>
                    ` : ''}
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        // 筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.dataset.filter;
                console.log('筛选:', filter);
                window.location.hash = `#/products/${filter}`;
            });
        });
        
        // 加入购物车
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const productId = parseInt(btn.dataset.productId);
                
                // 从产品数据中获取产品
                const product = getProductById(productId);
                
                if (!product) {
                    alert('产品信息加载失败，请刷新页面重试');
                    return;
                }
                
                addToCart(product);
                
                // 显示提示
                const originalText = btn.textContent;
                btn.textContent = '✅ 已添加';
                btn.style.background = 'var(--success)';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 1500);
            });
        });
    }
};
