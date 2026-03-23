/**
 * 结算页面组件
 */
import { loadCart, getCartTotal, clearCart } from '../utils/cart.js';

// 中国省市区数据（简化版）
const locationData = {
    '新疆': { cities: ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉州', '伊犁州', '喀什地区', '阿克苏地区'] },
    '北京': { cities: ['北京市'] },
    '上海': { cities: ['上海市'] },
    '广东': { cities: ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '东莞市', '中山市'] },
    '浙江': { cities: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市'] },
    '江苏': { cities: ['南京市', '苏州市', '无锡市', '常州市', '南通市', '扬州市'] },
    '其他': { cities: ['请选择城市'] }
};

export const CheckoutPage = {
    render() {
        const cart = loadCart();
        
        if (cart.length === 0) {
            // 重定向到购物车
            setTimeout(() => { window.location.hash = '#/cart'; }, 100);
            return `
                <section class="loading" style="padding: 5rem 0; text-align: center;">
                    <div class="container">
                        <span style="font-size: 3rem;">⏳</span>
                        <p style="margin-top: 1rem;">正在跳转...</p>
                    </div>
                </section>
            `;
        }
        
        const total = getCartTotal();
        const shipping = total >= 200 ? 0 : 15;
        const finalTotal = total + shipping;
        
        // 生成省份选项
        const provinceOptions = Object.keys(locationData).map(province => 
            `<option value="${province}">${province}</option>`
        ).join('');
        
        return `
            <!-- 页面头部 -->
            <section class="page-header" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%); color: white; padding: 2rem 0; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2rem;">💳 订单结算</h2>
                    <p style="opacity: 0.9; margin-top: 0.5rem;">填写收货信息并完成支付</p>
                </div>
            </section>

            <!-- 结算内容 -->
            <section class="checkout-content" style="padding: 2rem 0;">
                <div class="container">
                    <form id="checkout-form">
                        <div class="grid grid-2" style="gap: 2rem; align-items: start;">
                            <!-- 左侧：收货信息和支付方式 -->
                            <div>
                                <!-- 收货信息 -->
                                <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                                    <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                                        📍 收货信息
                                    </h3>
                                    
                                    <div class="form-group" style="margin-bottom: 1.5rem;">
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-primary);">收货人姓名 <span style="color: var(--error);">*</span></label>
                                        <input type="text" name="name" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem;" placeholder="请输入收货人姓名" />
                                    </div>
                                    
                                    <div class="form-group" style="margin-bottom: 1.5rem;">
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-primary);">手机号码 <span style="color: var(--error);">*</span></label>
                                        <input type="tel" name="phone" required pattern="[0-9]{11}" maxlength="11" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem;" placeholder="请输入 11 位手机号码" />
                                    </div>
                                    
                                    <div class="form-group" style="margin-bottom: 1.5rem;">
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-primary);">所在地区 <span style="color: var(--error);">*</span></label>
                                        <select name="province" id="province-select" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem; margin-bottom: 0.5rem;">
                                            <option value="">选择省份</option>
                                            ${provinceOptions}
                                        </select>
                                        <select name="city" id="city-select" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem; margin-bottom: 0.5rem;" disabled>
                                            <option value="">请先选择省份</option>
                                        </select>
                                        <select name="district" id="district-select" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem;" disabled>
                                            <option value="">请先选择城市</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group" style="margin-bottom: 1.5rem;">
                                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-primary);">详细地址 <span style="color: var(--error);">*</span></label>
                                        <textarea name="address" required rows="3" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem; resize: vertical;" placeholder="请输入详细街道地址，如：XX 路 XX 号 XX 小区 X 栋 X 单元 X 室"></textarea>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                            <input type="checkbox" name="default" style="width: 18px; height: 18px;" />
                                            <span style="color: var(--text-secondary);">设为默认收货地址</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- 支付方式 -->
                                <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                                    <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                                        💳 支付方式
                                    </h3>
                                    
                                    <div class="payment-methods">
                                        <label class="payment-option" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid var(--primary-color); border-radius: var(--radius-md); margin-bottom: 1rem; cursor: pointer; background: rgba(196, 30, 58, 0.05);">
                                            <input type="radio" name="payment" value="wechat" checked style="width: 20px; height: 20px;" />
                                            <span style="font-size: 1.5rem;">💚</span>
                                            <div>
                                                <div style="font-weight: 500;">微信支付</div>
                                                <div style="color: var(--text-secondary); font-size: 0.85rem;">推荐使用</div>
                                            </div>
                                        </label>
                                        
                                        <label class="payment-option" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 1rem; cursor: pointer;">
                                            <input type="radio" name="payment" value="alipay" style="width: 20px; height: 20px;" />
                                            <span style="font-size: 1.5rem;">💙</span>
                                            <div>
                                                <div style="font-weight: 500;">支付宝</div>
                                                <div style="color: var(--text-secondary); font-size: 0.85rem;">安全可靠</div>
                                            </div>
                                        </label>
                                        
                                        <label class="payment-option" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer;">
                                            <input type="radio" name="payment" value="bank" style="width: 20px; height: 20px;" />
                                            <span style="font-size: 1.5rem;">🏦</span>
                                            <div>
                                                <div style="font-weight: 500;">银行卡支付</div>
                                                <div style="color: var(--text-secondary); font-size: 0.85rem;">支持各大银行</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                
                                <!-- 买家留言 -->
                                <div class="card" style="padding: 2rem;">
                                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                                        📝 买家留言
                                    </h3>
                                    <textarea name="message" rows="3" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 1rem; resize: vertical;" placeholder="选填：对本订单的说明（如配送时间要求等）"></textarea>
                                </div>
                            </div>
                            
                            <!-- 右侧：订单摘要 -->
                            <div>
                                <div class="card" style="padding: 2rem; position: sticky; top: 2rem;">
                                    <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                                        📦 订单摘要
                                    </h3>
                                    
                                    <!-- 商品列表 -->
                                    <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1.5rem;">
                                        ${cart.map(item => `
                                            <div style="display: flex; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                                                <div style="width: 50px; height: 50px; background: var(--background-alt); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                                    <span style="font-size: 1.5rem;">${item.emoji}</span>
                                                </div>
                                                <div style="flex: 1;">
                                                    <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">${item.name}</div>
                                                    <div style="font-size: 0.85rem; color: var(--text-secondary);">¥${item.price} × ${item.quantity}</div>
                                                </div>
                                                <div style="color: var(--primary-color); font-weight: 500;">
                                                    ¥${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    
                                    <!-- 金额明细 -->
                                    <div style="margin-bottom: 1.5rem;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-secondary);">
                                            <span>商品金额</span>
                                            <span>¥${total.toFixed(2)}</span>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-secondary);">
                                            <span>运费</span>
                                            <span>${shipping === 0 ? '<span style="color: var(--success);">免运费</span>' : `¥${shipping}`}</span>
                                        </div>
                                        <div style="display: flex; justify-content: space-between; padding-top: 1rem; border-top: 2px solid var(--border-color);">
                                            <span style="font-size: 1.2rem; font-weight: 500;">应付总额</span>
                                            <span style="color: var(--primary-color); font-size: 1.8rem; font-weight: bold;">¥${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <!-- 提交订单 -->
                                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1.25rem; font-size: 1.2rem; margin-bottom: 1rem;">
                                        ✅ 提交订单
                                    </button>
                                    
                                    <p style="text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
                                        提交订单即表示同意 <a href="#/terms" style="color: var(--primary-color);">《服务条款》</a> 和 <a href="#/privacy" style="color: var(--primary-color);">《隐私政策》</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        `;
    },
    
    attachListeners() {
        const form = document.getElementById('checkout-form');
        if (!form) return;
        
        // 省份选择联动
        const provinceSelect = document.getElementById('province-select');
        const citySelect = document.getElementById('city-select');
        const districtSelect = document.getElementById('district-select');
        
        if (provinceSelect) {
            provinceSelect.addEventListener('change', (e) => {
                const province = e.target.value;
                
                // 重置城市和区县
                citySelect.innerHTML = '<option value="">选择城市</option>';
                districtSelect.innerHTML = '<option value="">请先选择城市</option>';
                districtSelect.disabled = true;
                
                if (province && locationData[province]) {
                    const cities = locationData[province].cities;
                    citySelect.innerHTML = '<option value="">选择城市</option>' + 
                        cities.map(city => `<option value="${city}">${city}</option>`).join('');
                    citySelect.disabled = false;
                } else {
                    citySelect.disabled = true;
                }
            });
        }
        
        // 城市选择联动
        if (citySelect) {
            citySelect.addEventListener('change', (e) => {
                const city = e.target.value;
                
                // 重置区县
                districtSelect.innerHTML = '<option value="">选择区县</option>';
                
                if (city) {
                    // 简化处理，使用通用区县
                    const districts = ['XX 区', 'XX 县', 'XX 市'];
                    districtSelect.innerHTML = '<option value="">选择区县</option>' + 
                        districts.map(d => `<option value="${d}">${d}</option>`).join('');
                    districtSelect.disabled = false;
                } else {
                    districtSelect.disabled = true;
                }
            });
        }
        
        // 表单提交
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const orderData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                province: formData.get('province'),
                city: formData.get('city'),
                district: formData.get('district'),
                address: formData.get('address'),
                payment: formData.get('payment'),
                message: formData.get('message') || ''
            };
            
            // 验证数据
            if (!orderData.name || !orderData.phone || !orderData.province || !orderData.city || !orderData.address) {
                alert('请填写完整的收货信息');
                return;
            }
            
            // 验证手机号
            if (!/^[0-9]{11}$/.test(orderData.phone)) {
                alert('请输入正确的 11 位手机号码');
                return;
            }
            
            // 生成订单号
            const orderId = 'XJ' + Date.now();
            
            // 保存订单到 localStorage
            const orders = JSON.parse(localStorage.getItem('beef-orders') || '[]');
            orders.push({
                id: orderId,
                ...orderData,
                items: loadCart(),
                total: getCartTotal(),
                shipping: getCartTotal() >= 200 ? 0 : 15,
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('beef-orders', JSON.stringify(orders));
            
            // 清空购物车
            clearCart();
            
            // 跳转到订单成功页
            window.location.hash = `#/order-success/${orderId}`;
        });
    }
};
