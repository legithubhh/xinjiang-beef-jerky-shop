/**
 * 购物车工具函数
 */

// 购物车数据存储
let cart = [];

// 从 localStorage 加载购物车
export function loadCart() {
    try {
        const saved = localStorage.getItem('beef-cart');
        if (saved) {
            cart = JSON.parse(saved);
        }
    } catch (e) {
        console.error('加载购物车失败:', e);
        cart = [];
    }
    return cart;
}

// 保存购物车到 localStorage
export function saveCart() {
    try {
        localStorage.setItem('beef-cart', JSON.stringify(cart));
        updateCartCount();
        updateHeaderCartCount();
    } catch (e) {
        console.error('保存购物车失败:', e);
    }
}

// 更新本地购物车计数
export function updateCartCount() {
    if (typeof document === 'undefined') return;
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        countEl.textContent = total;
    }
}

// 更新页头购物车计数（重新加载页头时）
export function updateHeaderCartCount() {
    try {
        if (typeof document === 'undefined') return;
        const cartData = JSON.parse(localStorage.getItem('beef-cart') || '[]');
        const total = cartData.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const countEl = document.getElementById('cart-count');
        if (countEl) {
            countEl.textContent = total;
        }
    } catch (e) {
        console.error('更新页头购物车计数失败:', e);
    }
}

// 添加商品到购物车
export function addToCart(product) {
    if (!product || !product.id) {
        console.error('无效的商品:', product);
        return cart;
    }
    
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    return cart;
}

// 从购物车移除商品
export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    return cart;
}

// 更新商品数量
export function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
        }
    }
    return cart;
}

// 清空购物车
export function clearCart() {
    cart = [];
    saveCart();
    return cart;
}

// 获取购物车总金额
export function getCartTotal() {
    return cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
}

// 获取购物车商品总数
export function getCartTotalItems() {
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

// 初始化购物车
export function initCart() {
    loadCart();
    updateCartCount();
}

// 获取购物车数据（用于调试）
export function getCart() {
    return [...cart];
}
