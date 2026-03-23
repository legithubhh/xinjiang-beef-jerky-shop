/**
 * 新疆手工牛肉干网站 - 主入口文件
 */

// 导入样式
import './styles/main.css';

// 导入组件
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/Home.js';
import { ProductsPage } from './pages/Products.js';
import { ProductDetailPage } from './pages/ProductDetail.js';
import { CartPage } from './pages/Cart.js';
import { CheckoutPage } from './pages/Checkout.js';
import { OrderSuccessPage } from './pages/OrderSuccess.js';
import { OrderStatusPage } from './pages/OrderStatus.js';
import { OrdersPage } from './pages/Orders.js';
import { AboutPage } from './pages/About.js';
import { initCart, updateHeaderCartCount } from './utils/cart.js';
import { getProductById } from './utils/products.js';

// 全局存储当前页面组件和参数，用于重新渲染
let currentPage = null;
let currentPageArgs = [];

// 简单路由
class Router {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('🥩 新疆手工牛肉干网站初始化...');
        
        // 初始化购物车
        initCart();
        
        // 渲染静态组件
        this.renderStaticComponents();
        
        // 监听 hash 变化
        window.addEventListener('hashchange', () => {
            console.log('🔄 hashchange 事件触发');
            this.handleRoute();
        });
        
        // DOM 加载完成后处理路由
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOMContentLoaded');
                this.handleRoute();
            });
        } else {
            console.log('⚡ DOM 已就绪，直接处理路由');
            this.handleRoute();
        }
    }
    
    renderStaticComponents() {
        console.log('渲染静态组件...');
        
        // 渲染页头
        const header = document.getElementById('header');
        if (header) {
            header.innerHTML = Header.render();
            setTimeout(() => {
                Header.attachListeners();
                updateHeaderCartCount();
            }, 100);
        }
        
        // 渲染页脚
        const footer = document.getElementById('footer');
        if (footer) {
            footer.innerHTML = Footer.render();
        }
    }
    
    handleRoute() {
        const hash = window.location.hash;
        console.log('📍 handleRoute - 完整 hash:', hash || '(空)');
        
        // 解析 hash
        let path = '';
        let params = [];
        
        if (!hash || hash === '' || hash === '#') {
            path = '';
            params = [];
        } else {
            // 移除 # 前缀并清理可能的前导斜杠，支持形式如 "#/products" 或 "#products"
            const hashWithoutHash = (hash || '').slice(1).replace(/^\/+/, '');
            const parts = hashWithoutHash.split('/').filter(Boolean);
            path = parts[0] || '';
            params = parts.slice(1);
        }
        
        console.log('📍 解析结果 - path:', path, 'params:', params);
        
        // 存储当前路由信息
        currentPage = path;
        currentPageArgs = params;
        
        // 路由分发
        if (path === '' || path === '/' || path === 'home') {
            this.renderPage('首页', HomePage);
        } else if (path === 'products') {
            this.renderPage('产品列表', ProductsPage, params[0] || 'all');
        } else if (path === 'product') {
            this.renderProductDetail(params[0]);
        } else if (path === 'cart') {
            this.renderPage('购物车', CartPage);
        } else if (path === 'checkout') {
            this.renderPage('订单结算', CheckoutPage);
        } else if (path === 'order-success') {
            this.renderPage('订单成功', OrderSuccessPage, params[0]);
        } else if (path === 'order-status') {
            this.renderPage('订单状态', OrderStatusPage, params[0]);
        } else if (path === 'orders') {
            this.renderPage('我的订单', OrdersPage);
        } else if (path === 'about') {
            this.renderPage('关于我们', AboutPage);
        } else {
            this.renderNotFound();
        }
        
        // 滚动到顶部
        window.scrollTo(0, 0);
        
        // 更新页头购物车计数
        setTimeout(() => updateHeaderCartCount(), 200);
    }
    
    renderPage(pageName, PageComponent, ...args) {
        const main = document.getElementById('main');
        if (!main) {
            console.error('❌ main 元素不存在');
            return;
        }
        
        console.log(`📄 渲染 ${pageName}...`);
        
        try {
            // 渲染页面内容
            const html = PageComponent.render(...args);
            main.innerHTML = html;
            console.log(`✅ ${pageName} HTML 已设置，长度:`, html.length);
            
            // 存储当前产品（用于详情页）
            if (args[0] && PageComponent === ProductDetailPage) {
                const product = getProductById(args[0]);
                if (product) {
                    window.currentProduct = product;
                    console.log('💾 产品数据已存储:', product.name);
                } else {
                    console.warn('⚠️ 产品不存在:', args[0]);
                }
            }
            
            // 绑定事件监听器 - 使用 requestAnimationFrame 确保 DOM 已更新
            if (typeof PageComponent.attachListeners === 'function') {
                requestAnimationFrame(() => {
                    console.log(`🔗 绑定 ${pageName} 事件监听器...`);
                    PageComponent.attachListeners();
                });
            }
        } catch (error) {
            console.error(`❌ ${pageName} 渲染错误:`, error);
            main.innerHTML = `
                <section class="error" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 5rem;">❌</span>
                        <h2 style="margin-top: 1rem;">页面加载失败</h2>
                        <p style="color: var(--text-secondary); margin: 1rem 0 2rem;">${error.message || '未知错误'}</p>
                        <a href="#/" class="btn btn-primary" style="padding: 1rem 2rem;">返回首页</a>
                    </div>
                </section>
            `;
        }
    }
    
    renderProductDetail(productId) {
        console.log('📄 渲染产品详情，ID:', productId);
        
        const product = getProductById(productId);
        if (!product) {
            console.warn('⚠️ 产品不存在:', productId);
            this.renderNotFound();
            return;
        }
        
        window.currentProduct = product;
        this.renderPage('产品详情', ProductDetailPage, productId);
    }
    
    renderNotFound() {
        const main = document.getElementById('main');
        if (!main) return;
        
        console.log('📄 渲染 404 页面');
        
        main.innerHTML = `
            <section class="not-found" style="padding: 5rem 0; text-align: center;">
                <div class="container">
                    <span style="font-size: 5rem;">😕</span>
                    <h2 style="margin-top: 1rem;">页面不存在</h2>
                    <p style="color: var(--text-secondary); margin: 1rem 0 2rem;">您访问的页面不存在或已被移除</p>
                    <a href="#/" class="btn btn-primary" style="padding: 1rem 2rem;">返回首页</a>
                </div>
            </section>
        `;
    }
}

// 启动应用
console.log('🚀 启动应用...');
new Router();
