/**
 * 关于我们页面组件
 */
export const AboutPage = {
    render() {
        return `
            <!-- 页面头部 -->
            <section class="page-header" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 4rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">🏔️ 关于我们</h2>
                    <p style="font-size: 1.2rem; opacity: 0.9;">传承新疆味道，匠心制作每一块牛肉干</p>
                </div>
            </section>

            <!-- 品牌故事 -->
            <section class="brand-story" style="padding: 4rem 0;">
                <div class="container" style="max-width: 900px;">
                    <div class="grid grid-2" style="gap: 3rem; align-items: center;">
                        <div>
                            <span style="font-size: 5rem;">🏔️</span>
                        </div>
                        <div>
                            <h3 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--text-primary);">源自新疆，传承经典</h3>
                            <p style="line-height: 2; color: var(--text-secondary); margin-bottom: 1rem;">
                                我们来自美丽的新疆维吾尔自治区，这里有着得天独厚的自然环境和优质的畜牧资源。世代生活在这里的牧民们，传承着古老的手工制作牛肉干的技艺。
                            </p>
                            <p style="line-height: 2; color: var(--text-secondary); margin-bottom: 1rem;">
                                每一块牛肉干都选用新疆本地优质黄牛的后腿肉，经过传统工艺腌制、风干、烘烤而成。不添加任何防腐剂，保留牛肉最原始的营养和鲜美。
                            </p>
                            <p style="line-height: 2; color: var(--text-secondary);">
                                我们的使命是将这份地道的新疆味道带给全国各地的朋友，让更多人品尝到正宗的新疆手工牛肉干。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 核心优势 -->
            <section class="features" style="background: var(--background-alt); padding: 4rem 0;">
                <div class="container">
                    <h3 style="text-align: center; font-size: 2rem; margin-bottom: 3rem; color: var(--text-primary);">
                        为什么选择我们
                    </h3>
                    <div class="grid grid-4" style="gap: 2rem;">
                        <div class="card" style="padding: 2rem; text-align: center;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🐂</div>
                            <h4 style="margin-bottom: 1rem; font-size: 1.2rem;">优质原料</h4>
                            <p style="color: var(--text-secondary); line-height: 1.8;">
                                精选新疆本地优质黄牛，天然放养，肉质鲜美
                            </p>
                        </div>
                        <div class="card" style="padding: 2rem; text-align: center;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">👨‍🍳</div>
                            <h4 style="margin-bottom: 1rem; font-size: 1.2rem;">手工制作</h4>
                            <p style="color: var(--text-secondary); line-height: 1.8;">
                                传承百年工艺，每一道工序都精心把控
                            </p>
                        </div>
                        <div class="card" style="padding: 2rem; text-align: center;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🌿</div>
                            <h4 style="margin-bottom: 1rem; font-size: 1.2rem;">天然健康</h4>
                            <p style="color: var(--text-secondary); line-height: 1.8;">
                                不添加防腐剂，零添加，吃得放心
                            </p>
                        </div>
                        <div class="card" style="padding: 2rem; text-align: center;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🚚</div>
                            <h4 style="margin-bottom: 1rem; font-size: 1.2rem;">新鲜直达</h4>
                            <p style="color: var(--text-secondary); line-height: 1.8;">
                                现做现发，真空包装，保证新鲜送达
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 制作工艺 -->
            <section class="process" style="padding: 4rem 0;">
                <div class="container" style="max-width: 900px;">
                    <h3 style="text-align: center; font-size: 2rem; margin-bottom: 3rem; color: var(--text-primary);">
                        传统制作工艺
                    </h3>
                    <div style="position: relative;">
                        <div style="position: absolute; top: 40px; left: 0; right: 0; height: 2px; background: var(--border-color); z-index: 0;"></div>
                        <div class="grid grid-4" style="gap: 1rem; position: relative; z-index: 1;">
                            <div style="text-align: center;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">1</div>
                                <h4 style="margin-bottom: 0.5rem;">精选牛肉</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem;">选用优质黄牛后腿肉</p>
                            </div>
                            <div style="text-align: center;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">2</div>
                                <h4 style="margin-bottom: 0.5rem;">秘制腌制</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem;">传统配方腌制入味</p>
                            </div>
                            <div style="text-align: center;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">3</div>
                                <h4 style="margin-bottom: 0.5rem;">自然风干</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem;">新疆气候自然风干</p>
                            </div>
                            <div style="text-align: center;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">4</div>
                                <h4 style="margin-bottom: 0.5rem;">低温烘烤</h4>
                                <p style="color: var(--text-secondary); font-size: 0.9rem;">锁住营养和美味</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 联系我们 -->
            <section class="contact" style="background: var(--text-primary); color: white; padding: 4rem 0;">
                <div class="container" style="max-width: 600px; text-align: center;">
                    <h3 style="font-size: 2rem; margin-bottom: 2rem;">📞 联系我们</h3>
                    <div style="display: grid; gap: 1.5rem;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">📧</span>
                            <span>contact@xinjiangbeef.com</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">📱</span>
                            <span>400-XXX-XXXX</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">📍</span>
                            <span>新疆维吾尔自治区乌鲁木齐市</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                            <span style="font-size: 1.5rem;">⏰</span>
                            <span>客服时间：9:00 - 21:00</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        // 页面无特殊交互
    }
};
