-- ========================================================================
-- SEED DATA: Tap-a-Latte Self-Ordering Kiosk
-- Location: Kabacan, North Cotabato
-- ========================================================================

-- Users
INSERT INTO users (id, name, email, phone, role, pin, status) VALUES
('user-admin', 'Kier Dela Cruz', 'admin@tapalatte.ph', '0917-555-0192', 'admin', '1234', 'active'),
('user-cashier', 'Maria Santos', 'cashier@tapalatte.ph', '0928-555-4421', 'cashier', '2222', 'active'),
('user-staff', 'Rico Tan', 'barista@tapalatte.ph', '0919-555-8812', 'staff', '3333', 'active'),
('user-customer', 'Guest Customer', 'guest@tapalatte.ph', NULL, 'customer', NULL, 'active');

-- Categories
INSERT INTO categories (id, name, slug, icon, sort_order) VALUES
('cat-espresso', 'Espresso & Classics', 'espresso-classics', 'Coffee', 1),
('cat-lattes', 'Signature Lattes', 'signature-lattes', 'Sparkles', 2),
('cat-coldbrew', 'Cold Brew & Iced', 'coldbrew-iced', 'IceCream', 3),
('cat-frappes', 'Blended Frappes', 'blended-frappes', 'Zap', 4),
('cat-noncoffee', 'Non-Coffee & Matcha', 'non-coffee-matcha', 'CupSoda', 5),
('cat-pastries', 'Pastries & Bakes', 'pastries-bakes', 'Cookie', 6);

-- Ingredients with Initial Stock & Min Thresholds
INSERT INTO ingredients (id, name, unit, current_stock, min_threshold, unit_cost, category) VALUES
('ing-beans', 'Arabica Coffee Beans (Mt. Apo/Cotabato)', 'kg', 3.50, 5.00, 650.00, 'beans'), -- Low stock
('ing-milk', 'Full Cream Dairy Fresh Milk', 'L', 18.00, 10.00, 95.00, 'dairy'),
('ing-oatmilk', 'Barista Edition Oat Milk', 'L', 2.00, 4.00, 190.00, 'dairy'), -- Low stock
('ing-condensed', 'Sweetened Condensed Milk', 'kg', 12.00, 5.00, 85.00, 'dairy'),
('ing-caramel', 'Salted Caramel Sauce & Syrup', 'L', 1.50, 3.00, 350.00, 'syrups'), -- Low stock
('ing-vanilla', 'Madagascar Vanilla Syrup', 'L', 4.50, 2.00, 320.00, 'syrups'),
('ing-cup-16oz', '16oz Clear Iced Cups', 'pcs', 85.00, 150.00, 5.00, 'packaging'); -- Low stock

-- Products
INSERT INTO products (id, category_id, name, slug, description, base_price, image_url, is_available, is_featured) VALUES
('prod-spanish-latte', 'cat-lattes', 'Kabacan Spanish Latte', 'kabacan-spanish-latte', 'Espresso with rich condensed milk and steamed fresh milk. Our #1 bestseller in Kabacan!', 135.00, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', TRUE, TRUE),
('prod-caramel-macchiato', 'cat-lattes', 'Salted Caramel Macchiato', 'salted-caramel-macchiato', 'Layered vanilla milk marked with espresso and golden caramel grid.', 145.00, 'https://images.unsplash.com/photo-1485808191679-5f86510681a2', TRUE, TRUE),
('prod-americano', 'cat-espresso', 'Cotabato Highland Americano', 'cotabato-highland-americano', 'Double shot of locally sourced Mt. Apo Arabica espresso.', 100.00, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd', TRUE, FALSE),
('prod-matcha-latte', 'cat-noncoffee', 'Kyoto Dirty Matcha Latte', 'kyoto-dirty-matcha-latte', 'Ceremonial grade Uji matcha whisked with fresh milk and espresso.', 155.00, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a', TRUE, TRUE);

-- Addons
INSERT INTO addons (id, name, category, price, is_available) VALUES
('addon-shot', 'Extra Espresso Shot', 'shots', 25.00, TRUE),
('addon-vanilla', 'French Vanilla Syrup', 'syrups', 20.00, TRUE),
('addon-caramel', 'Salted Caramel Drizzle', 'syrups', 20.00, TRUE),
('addon-oat', 'Oat Milk Sub (Gluten-Free)', 'milks', 35.00, TRUE);
