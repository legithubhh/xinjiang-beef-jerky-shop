import { describe, it, beforeEach, beforeAll, expect } from 'vitest';
import { addToCart, loadCart, updateQuantity, clearCart, getCartTotal } from '../../src/utils/cart.js';

// Provide a minimal localStorage mock for Node test environment
beforeAll(() => {
    if (typeof globalThis.localStorage === 'undefined') {
        const store = {};
        globalThis.localStorage = {
            getItem(key) { return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null; },
            setItem(key, value) { store[key] = String(value); },
            removeItem(key) { delete store[key]; },
            clear() { for (const k of Object.keys(store)) delete store[k]; }
        };
    }
});

beforeEach(() => {
    // reset localStorage and cart
    localStorage.clear();
    clearCart();
});

describe('cart utils', () => {
    it('addToCart and updateQuantity should work', () => {
        // create a fake product
        const product = { id: 9999, name: '测试牛肉干', price: 109 };
        addToCart(product);
        let cart = loadCart();
        expect(cart.length).toBe(1);
        expect(cart[0].quantity).toBe(1);
        expect(getCartTotal()).toBeCloseTo(109);

        updateQuantity(9999, 3);
        cart = loadCart();
        expect(cart[0].quantity).toBe(3);
        expect(getCartTotal()).toBeCloseTo(327);

        updateQuantity(9999, 0);
        cart = loadCart();
        expect(cart.length).toBe(0);
    });
});
