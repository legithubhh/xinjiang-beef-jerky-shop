/**
 * 首页组件
 *
 * [AI-GENERATED] 2026-04-25 - OpenClaw
 * 功能说明：
 * - 首页中间白色背景区域添加美食图片滚动展示区（热销产品与特色优势之间）
 * - 左侧顺序播放，右侧倒序播放
 * - 食欲刺激视觉效果（悬停缩放、光晕脉动）
 * 更新记录：
 * - 2026-04-25：将滚动展示区从英雄区域移至白色背景区域
 */
import { getAllProducts, getProductById } from '../utils/products.js';
import { addToCart } from '../utils/cart.js';

// 美食图片配置（顺序）- 使用 /images/ 公共路径
const foodImages = [
    { name: '鸡爪', img: '/images/鸡爪.jpg' },
    { name: '烤鸡', img: '/images/烤鸡.jpg' },
    { name: '牛板筋', img: '/images/牛板筋.jpg' },
    { name: '牛肉干', img: '/images/牛肉干.jpg' },
    { name: '牛肉袈裟', img: '/images/牛肉袈裟.jpg' },
    { name: '牛肉酱', img: '/images/牛肉酱.jpg' },
    { name: '牛肉丸', img: '/images/牛肉丸.jpg' },
];

// 生成滚动图片 HTML
function createScrollGalleryHTML(images, isReverse = false) {
    // 倒序则反转数组
    const displayImages = isReverse ? [...images].reverse() : images;
    // 复制一份用于无缝滚动（首尾衔接）
    const allImages = [...displayImages, ...displayImages];

    return allImages.map(item => `
        <div class="scroll-item">
            <div class="scroll-item-inner">
                <img src="${item.img}" alt="${item.name}" loading="eager">
                <span class="scroll-item-label">${item.name}</span>
            </div>
        </div>
    `).join('');
}

export const HomePage = {
    render() {
        return `
            <!-- 英雄区域 -->
            <section class="hero" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 5rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold;">
                        🥩 正宗新疆手工牛肉干
                    </h2>
                    <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
                        传统工艺 · 优质牛肉 · 地道新疆味
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <a href="#/products" class="btn" style="background: var(--accent-color); color: var(--text-primary); font-size: 1.1rem; padding: 1rem 2rem;">
                            立即选购
                        </a>
                        <a href="#/about" class="btn" style="background: transparent; border: 2px solid white; color: white; font-size: 1.1rem; padding: 1rem 2rem;">
                            了解更多
                        </a>
                    </div>
                </div>
            </section>

            <!-- 特色产品 -->
            <section class="featured-products" style="padding: 4rem 0;">
                <div class="container">
                    <h3 style="text-align: center; font-size: 2rem; margin-bottom: 0.5rem; color: var(--text-primary);">
                        🔥 热销产品
                    </h3>
                    <p style="text-align: center; color: var(--text-secondary); margin-bottom: 3rem;">
                        精选新疆手工牛肉干，每一口都是正宗味道
                    </p>
                    
                    <div class="grid grid-3" style="gap: 2rem;">
                        ${['麻辣','香辣','孜然'].map(name => {
                            const product = getProductById(getAllProducts().find(p => p.name === name)?.id || -1);
                            if (!product) return '';
                            return `
                        <div class="card product-card">
                            <div style="height: 200px; background: var(--background-alt); display: flex; align-items: center; justify-content: center;">
                                ${product.images && product.images.length ? `<img src="${product.images[0]}" alt="${product.name}" style="max-height:160px; max-width:100%; object-fit:contain;">` : `<span style="font-size: 4rem;">${product.emoji}</span>`}
                            </div>
                            <div class="card-content" style="padding: 1.5rem;">
                                <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${product.name}</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                                    ${product.description}
                                </p>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <span style="color: var(--primary-color); font-size: 1.5rem; font-weight: bold;">¥${product.price}/kg</span>
                                        ${product.originalPrice > product.price ? `<span style="margin-left:0.5rem; color: var(--text-light); text-decoration: line-through;">¥${product.originalPrice}</span>` : ''}
                                    </div>
                                    <button type="button" class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">加入购物车</button>
                                </div>
                            </div>
                        </div>
                            `;
                        }).join('')}
                    </div>

                    <div style="text-align: center; margin-top: 3rem;">
                        <a href="#/products" class="btn btn-outline" style="font-size: 1.1rem; padding: 1rem 2rem;">
                            查看全部产品 →
                        </a>
                    </div>
                </div>
            </section>

            <!-- 美食滚动展示区（白色背景，左右两侧播放） -->
            <section class="scroll-showcase-section" style="background: var(--background); padding: 3rem 0;">
                <div class="scroll-showcase-wrapper">
                    <!-- 左侧滚动展示区（顺序播放） -->
                    <div class="scroll-gallery-left">
                        <div class="scroll-track scroll-track-left" id="scroll-left">
                            ${createScrollGalleryHTML(foodImages, false)}
                        </div>
                    </div>

                    <!-- 中间装饰区域 -->
                    <div class="scroll-showcase-center">
                        <div class="showcase-slogan">
                            <h3>美食随心选</h3>
                            <p>同店更多爆品美食将陆续上线</p>
                            <p>精选食材 · 匠心制作</p>
                        </div>
                    </div>

                    <!-- 右侧滚动展示区（倒序播放） -->
                    <div class="scroll-gallery-right">
                        <div class="scroll-track scroll-track-right" id="scroll-right">
                            ${createScrollGalleryHTML(foodImages, true)}
                        </div>
                    </div>
                </div>
            </section>

            <!-- 特色优势 -->
            <section class="features" style="background: var(--background-alt); padding: 4rem 0;">
                <div class="container">
                    <h3 style="text-align: center; font-size: 2rem; margin-bottom: 3rem; color: var(--text-primary);">
                        为什么选择我们
                    </h3>
                    <div class="grid grid-4" style="gap: 2rem;">
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🐂</div>
                            <h4 style="margin-bottom: 0.5rem;">优质牛肉</h4>
                            <p style="color: var(--text-secondary);">精选新疆本地优质黄牛</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍🍳</div>
                            <h4 style="margin-bottom: 0.5rem;">手工制作</h4>
                            <p style="color: var(--text-secondary);">传统工艺，匠心制作</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">🚚</div>
                            <h4 style="margin-bottom: 0.5rem;">新鲜配送</h4>
                            <p style="color: var(--text-secondary);">现做现发，保证新鲜</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                            <h4 style="margin-bottom: 0.5rem;">品质保证</h4>
                            <p style="color: var(--text-secondary);">不满意包退换</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        console.log('🔗 首页事件监听器绑定');
        
        // 加入购物车按钮事件
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = parseInt(btn.dataset.productId);
                console.log('🛒 添加产品到购物车:', productId);
                
                const product = getProductById(productId);
                if (!product) {
                    alert('产品信息加载失败，请刷新页面重试');
                    return;
                }
                
                addToCart(product);
                
                // 显示成功提示
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
