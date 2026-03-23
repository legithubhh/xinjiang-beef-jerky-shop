const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let db = null;

async function initialize() {
    const dbPath = path.resolve(process.env.DB_PATH || './data/database.sqlite');
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log(`📁 创建数据库目录：${dbDir}`);
    }
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ 数据库连接失败:', err);
                reject(err);
                return;
            }
            console.log(`✅ 数据库已连接：${dbPath}`);
            createTables()
                .then(() => {
                    console.log('✅ 数据表已创建');
                    resolve();
                })
                .catch(reject);
        });
    });
}

async function createTables() {
    const createUsers = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            phone TEXT,
            nickname TEXT,
            avatar TEXT,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    const createProducts = `
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            original_price REAL,
            stock INTEGER DEFAULT 0,
            sales INTEGER DEFAULT 0,
            category TEXT,
            tags TEXT,
            images TEXT,
            rating REAL DEFAULT 0,
            reviews INTEGER DEFAULT 0,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    const createOrders = `
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT UNIQUE NOT NULL,
            user_id INTEGER NOT NULL,
            total_amount REAL NOT NULL,
            shipping_fee REAL DEFAULT 0,
            final_amount REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            payment_method TEXT,
            shipping_name TEXT,
            shipping_phone TEXT,
            shipping_address TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;
    const createOrderItems = `
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            subtotal REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `;
    const createCarts = `
        CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id),
            UNIQUE(user_id, product_id)
        )
    `;
    await execute(createUsers);
    await execute(createProducts);
    await execute(createOrders);
    await execute(createOrderItems);
    await execute(createCarts);
    await initializeProducts();
}

async function initializeProducts() {
    const count = await getCount('products');
    if (count > 0) return;
    const products = [
        { name: '香辣', price: 109, originalPrice: 120, description: '精选牛肉配秘制辣椒，香辣过瘾', tags: '香辣', emoji: '🌶️' },
        { name: '孜然', price: 109, originalPrice: 120, description: '新疆特色孜然风味，地道烧烤味', tags: '孜然', emoji: '🌿' },
        { name: '麻辣', price: 109, originalPrice: 120, description: '麻辣鲜香，刺激味蕾', tags: '麻辣', emoji: '🔥' }
    ];
    for (const p of products) {
        await execute(
            `INSERT INTO products (name, description, price, original_price, stock, tags, images) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [p.name, p.description, p.price, p.originalPrice, 999, p.tags, p.emoji]
        );
    }
    console.log('✅ 示例产品数据已初始化');
}

function execute(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
}

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function getCount(table) {
    const result = await get(`SELECT COUNT(*) as count FROM ${table}`);
    return result?.count || 0;
}

function close() {
    return new Promise((resolve, reject) => {
        if (db) {
            db.close((err) => {
                if (err) reject(err);
                else {
                    console.log('✅ 数据库连接已关闭');
                    resolve();
                }
            });
        } else resolve();
    });
}

module.exports = { initialize, execute, query, get, getCount, close };
