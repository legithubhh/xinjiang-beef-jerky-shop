import { describe, it, expect } from 'vitest';
import { getAllProducts } from '../../src/utils/products.js';

describe('products data', () => {
    it('should expose 3 sale products with correct prices', () => {
        const products = getAllProducts();
        expect(products.length).toBe(3);
        for (const p of products) {
            expect(p.price).toBe(109);
            expect(p.originalPrice).toBe(120);
            expect(['香辣','孜然','麻辣']).toContain(p.name);
        }
    });
});
