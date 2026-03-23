/**
 * 页脚组件
 */
export const Footer = {
    render() {
        return `
            <footer class="footer" style="background: var(--text-primary); color: white; padding: 3rem 0; margin-top: 4rem;">
                <div class="container">
                    <div class="grid grid-4" style="gap: 2rem;">
                        <div>
                            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">🥩 新疆手工牛肉干</h3>
                            <p style="color: var(--text-light); line-height: 1.8;">
                                正宗新疆风味，传统手工制作工艺，选用优质牛肉，为您带来地道的新疆味道。
                            </p>
                        </div>
                        <div>
                            <h4 style="color: var(--accent-color); margin-bottom: 1rem;">快速链接</h4>
                            <ul style="list-style: none; line-height: 2;">
                                <li><a href="#/" style="color: var(--text-light); text-decoration: none;">首页</a></li>
                                <li><a href="#/products" style="color: var(--text-light); text-decoration: none;">全部产品</a></li>
                                <li><a href="#/about" style="color: var(--text-light); text-decoration: none;">关于我们</a></li>
                                <li><a href="#/contact" style="color: var(--text-light); text-decoration: none;">联系我们</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style="color: var(--accent-color); margin-bottom: 1rem;">客户服务</h4>
                            <ul style="list-style: none; line-height: 2;">
                                <li><a href="#/shipping" style="color: var(--text-light); text-decoration: none;">配送说明</a></li>
                                <li><a href="#/returns" style="color: var(--text-light); text-decoration: none;">退换货政策</a></li>
                                <li><a href="#/faq" style="color: var(--text-light); text-decoration: none;">常见问题</a></li>
                                <li><a href="#/privacy" style="color: var(--text-light); text-decoration: none;">隐私政策</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style="color: var(--accent-color); margin-bottom: 1rem;">联系方式</h4>
                            <ul style="list-style: none; line-height: 2; color: var(--text-light);">
                                <li>📧 contact@xinjiangbeef.com</li>
                                <li>📱 400-XXX-XXXX</li>
                                <li>📍 新疆维吾尔自治区</li>
                                <li>⏰ 9:00 - 21:00</li>
                            </ul>
                        </div>
                    </div>
                    <div style="border-top: 1px solid var(--text-secondary); margin-top: 2rem; padding-top: 2rem; text-align: center; color: var(--text-light);">
                        <p>&copy; 2026 新疆手工牛肉干。All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
};
