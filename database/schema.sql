-- ========================================================================
-- DATABASE SCHEMA: Tap-a-Latte Self-Ordering Kiosk & Cafe Management System
-- Location: Kabacan, North Cotabato
-- Supported Engines: MySQL 8.0+ / PostgreSQL 14+ / SQLite 3
-- ========================================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'cashier', 'staff', 'admin')),
    pin VARCHAR(10), -- Quick 4-6 digit PIN for staff/cashier/admin terminal access
    password_hash VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    allows_customization BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_sizes (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- 'Regular (12oz)', 'Large (16oz)', 'Grande (22oz)'
    volume_oz INT NOT NULL,
    price_delta DECIMAL(10, 2) DEFAULT 0.00,
    is_default BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS addons (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(30) CHECK (category IN ('shots', 'syrups', 'toppings', 'milks')),
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ingredients (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    unit VARCHAR(20) NOT NULL, -- 'kg', 'L', 'ml', 'pcs', 'bottles'
    current_stock DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    min_threshold DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Low stock alert triggered when <= min_threshold
    unit_cost DECIMAL(10, 2) DEFAULT 0.00,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_recipes (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    ingredient_id VARCHAR(36) NOT NULL,
    amount_required DECIMAL(10, 4) NOT NULL, -- e.g. 0.02 kg coffee beans, 0.2 L milk
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(30) NOT NULL UNIQUE, -- e.g. '#LATT-101'
    order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('dine_in', 'take_out')),
    customer_name VARCHAR(100) NOT NULL DEFAULT 'Guest Customer',
    customer_phone VARCHAR(30),
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('gcash', 'paymaya', 'cash')),
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
    order_status VARCHAR(20) NOT NULL CHECK (order_status IN ('new', 'brewing', 'ready', 'completed', 'cancelled')),
    payment_reference VARCHAR(100), -- GCash / PayMaya Reference or Cash Register Token
    cash_tendered DECIMAL(10, 2),
    change_amount DECIMAL(10, 2),
    cashier_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cashier_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    cup_size VARCHAR(50) NOT NULL,
    sugar_level VARCHAR(20) NOT NULL, -- '0%', '25%', '50%', '75%', '100%'
    milk_option VARCHAR(50) NOT NULL, -- 'Fresh Milk', 'Oat Milk', 'Almond Milk'
    temperature VARCHAR(20) NOT NULL, -- 'Hot', 'Iced'
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_item_addons (
    id VARCHAR(36) PRIMARY KEY,
    order_item_id VARCHAR(36) NOT NULL,
    addon_id VARCHAR(36) NOT NULL,
    addon_name VARCHAR(100) NOT NULL,
    addon_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
    FOREIGN KEY (addon_id) REFERENCES addons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_logs (
    id VARCHAR(36) PRIMARY KEY,
    ingredient_id VARCHAR(36) NOT NULL,
    change_type VARCHAR(30) NOT NULL CHECK (change_type IN ('order_deduction', 'restock', 'waste', 'manual_adjustment')),
    quantity_changed DECIMAL(10, 2) NOT NULL,
    stock_after DECIMAL(10, 2) NOT NULL,
    reference_order_id VARCHAR(36),
    user_id VARCHAR(36),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
    FOREIGN KEY (reference_order_id) REFERENCES orders(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for optimal kiosk query performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_status ON orders(order_status, payment_status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_ingredients_stock ON ingredients(current_stock, min_threshold);
