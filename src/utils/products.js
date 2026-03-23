/**
 * 产品数据
 */
import spicyImg from '../assets/images/spicy-beef.jpg';
import cuminImg from '../assets/images/cumin-beef.jpg';
import malaImg from '../assets/images/mala-beef.jpg';

export const products = [
    {
        id: 1,
        name: '香辣',
        emoji: '🌶️',
        price: 109,
        originalPrice: 120,
        description: '精选牛肉配秘制辣椒，香辣过瘾，回味无穷',
        weight: '250g',
        ingredients: '牛肉、辣椒、花椒、盐、糖、香辛料',
        shelfLife: '12 个月',
        storage: '阴凉干燥处保存',
        origin: '新疆',
        sales: 1258,
        stock: 999,
        rating: 4.9,
        reviews: 326,
        images: [spicyImg],
        tags: ['香辣']
    },
    {
        id: 4,
        name: '孜然',
        emoji: '🌿',
        price: 109,
        originalPrice: 120,
        description: '新疆特色孜然风味，地道烧烤味',
        weight: '250g',
        ingredients: '牛肉、孜然、辣椒、盐、香辛料',
        shelfLife: '12 个月',
        storage: '阴凉干燥处保存',
        origin: '新疆',
        sales: 1567,
        stock: 999,
        rating: 4.9,
        reviews: 423,
        images: [cuminImg],
        tags: ['孜然']
    },
    {
        id: 6,
        name: '麻辣',
        emoji: '🔥',
        price: 109,
        originalPrice: 120,
        description: '麻辣鲜香，刺激味蕾，过瘾十足',
        weight: '250g',
        ingredients: '牛肉、辣椒、花椒、麻椒、盐、香辛料',
        shelfLife: '12 个月',
        storage: '阴凉干燥处保存',
        origin: '新疆',
        sales: 1345,
        stock: 999,
        rating: 4.9,
        reviews: 389,
        images: [malaImg],
        tags: ['麻辣']
    }
];

// 获取所有产品
export function getAllProducts() {
    return products;
}

// 根据 ID 获取产品
export function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// 根据标签筛选产品
export function getProductsByTag(tag) {
    return products.filter(p => p.tags.includes(tag));
}

// 搜索产品
export function searchProducts(keyword) {
    const lower = keyword.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
}

// 获取热销产品
export function getHotProducts(limit = 4) {
    return [...products]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, limit);
}

// 获取特价产品
export function getSaleProducts() {
    return products.filter(p => p.originalPrice > p.price);
}
