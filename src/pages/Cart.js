/**
 * 购物车页面组件
 */
import { loadCart, removeFromCart, updateQuantity, getCartTotal, clearCart, updateHeaderCartCount } from '../utils/cart.js';

export const CartPage = {
    render() {
        const cart = loadCart();
        
        if (cart.length === 0) {
            return `
                <section class="cart-empty" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 5rem;">🛒</span>
                        <h2 style="margin-top: 1rem; color: var(--text-primary);">购物车是空的</h2>
                        <p style="color: var(--text-secondary); margin: 1rem 0 2rem;">快去选购心仪的牛肉干吧！</p>
                        <a href="#/products" class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.1rem;">
                            去选购 →
                        </a>
                    </div>
                </section>
            `;
        }
        
        const total = getCartTotal();
        const shipping = total >= 200 ? 0 : 15;
        const finalTotal = total + shipping;
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        
        return `
            <!-- 页面头部 -->
            <section class="page-header" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 2rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2rem;">🛒 我的购物车</h2>
                    <p style="opacity: 0.9; margin-top: 0.5rem;">共 ${totalItems} 件商品</p>
                </div>
            </section>

            <!-- 购物车内容 -->
            <section class="cart-content" style="padding: 2rem 0;">
                <div class="container">
                    <div class="grid grid-2" style="gap: 2rem; align-items: start;">
                        <!-- 购物车列表 -->
                        <div class="cart-items">
                            ${cart.map(item => `
                                <div class="cart-item card" style="padding: 1.5rem; margin-bottom: 1rem; display: flex; gap: 1.5rem;" data-product-id="${item.id}">
                                    <div style="width: 100px; height: 100px; background: var(--background-alt); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                        <span style="font-size: 3rem;">${item.emoji}</span>
                                    </div>
                                    <div style="flex: 1;">
                                        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">${item.name}</h4>
                                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${item.weight}</p>
                                        <div style="display: flex; align-items: center; justify-content: space-between;">
                                                <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                                    <button type="button" class="qty-btn" style="width: 32px; height: 32px; border: none; background: var(--background-alt); cursor: pointer;" data-action="decrease">-</button>
                                                    <span class="qty-value" style="width: 40px; text-align: center;">${item.quantity}</span>
                                                    <button type="button" class="qty-btn" style="width: 32px; height: 32px; border: none; background: var(--background-alt); cursor: pointer;" data-action="increase">+</button>
                                                </div>
                                            <div style="text-align: right;">
                                                <span style="color: var(--primary-color); font-size: 1.3rem; font-weight: bold;">¥${(item.price * item.quantity).toFixed(2)}</span>
                                                <p style="color: var(--text-light); font-size: 0.85rem;">¥${item.price} / 件</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="remove-btn" style="border: none; background: none; color: var(--text-light); cursor: pointer; font-size: 1.5rem; padding: 0.5rem;" data-product-id="${item.id}" title="删除">✕</button>
                                </div>
                            `).join('')}
                            
                            <button type="button" id="clear-cart" class="btn btn-outline" style="border-color: var(--error); color: var(--error);">
                                🗑️ 清空购物车
                            </button>
                        </div>
                        
                        <!-- 订单摘要 -->
                        <div class="cart-summary card" style="padding: 2rem; position: sticky; top: 2rem;">
                            <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">订单摘要</h3>
                            
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-secondary);">
                                <span>商品金额</span>
                                <span>¥${total.toFixed(2)}</span>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-secondary);">
                                <span>运费</span>
                                <span>${shipping === 0 ? '<span style="color: var(--success);">免运费</span>' : `¥${shipping}`}</span>
                            </div>
                            
                            ${shipping > 0 ? `
                                <div style="background: var(--background-alt); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                                    💡 再买 <span style="color: var(--primary-color); font-weight: 500;">¥${(200 - total).toFixed(2)}</span> 即可免运费
                                </div>
                            ` : `
                                <div style="background: var(--success); color: white; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; text-align: center;">
                                    ✅ 已满足免运费条件
                                </div>
                            `}
                            
                            <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; padding-top: 1.5rem; border-top: 2px solid var(--border-color);">
                                <span style="font-size: 1.2rem; font-weight: 500;">应付总额</span>
                                <span style="color: var(--primary-color); font-size: 1.8rem; font-weight: bold;">¥${finalTotal.toFixed(2)}</span>
                            </div>
                            
                            <a href="#/checkout" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; margin-bottom: 1rem;">
                                ⚡ 去结算
                            </a>
                            
                            <a href="#/products" class="btn btn-outline" style="width: 100%; padding: 1rem; border-color: var(--primary-color); color: var(--primary-color);">
                                ← 继续购物
                            </a>
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
                const itemEl = e.target.closest('.cart-item');
                if (!itemEl) return;

                const productId = parseInt(itemEl.dataset.productId);
                const action = btn.dataset.action;
                const qtySpan = itemEl.querySelector('.qty-value');
                const currentQty = parseInt(qtySpan?.textContent || '0');

                const newQty = action === 'increase' ? currentQty + 1 : currentQty - 1;
                updateQuantity(productId, newQty);

                // 重新渲染页面
                window.location.reload();
            });
        });
        
        // 删除商品
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = parseInt(btn.dataset.productId);
                if (confirm('确定要删除这个商品吗？')) {
                    removeFromCart(productId);
                    window.location.reload();
                }
            });
        });
        
        // 清空购物车
        const clearBtn = document.getElementById('clear-cart');
        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('确定要清空购物车吗？')) {
                    clearCart();
                    window.location.reload();
                }
            });
        }
    }
};
