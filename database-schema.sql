-- Coffee Shop Telegram Bot Database Schema
-- Execute these commands in Supabase SQL Editor

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  language_code TEXT DEFAULT 'uz',
  role TEXT DEFAULT 'client',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Products table (simplified - no categories)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  description_uz TEXT,
  description_ru TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  min_order INTEGER DEFAULT 1,
  weight_grams INTEGER,
  roast_level TEXT,
  origin_country TEXT,
  product_type TEXT DEFAULT 'coffee',
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id BIGINT REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_name TEXT,
  delivery_address TEXT,
  comment TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id BIGINT REFERENCES users(id),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  admin_response TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);

-- 7. Insert sample coffee products
INSERT INTO products (name, name_uz, name_ru, name_en, description, description_uz, description_ru, description_en, price, stock_quantity, min_order, weight_grams, roast_level, origin_country, product_type) VALUES
('Premium Arabica Coffee Beans', 'Premium Arabika kofe donalari', 'Премиум зерна арабики', 'Premium Arabica Coffee Beans', 'High quality arabica coffee beans', 'Yuqori sifatli arabika kofe donalari', 'Высококачественные зерна арабики', 'High quality arabica coffee beans', 45000, 100, 1, 250, 'Medium', 'Brazil', 'coffee'),
('Strong Robusta Coffee', 'Kuchli Robusta kofe', 'Крепкий кофе робуста', 'Strong Robusta Coffee', 'Bold and strong robusta coffee', 'Dadli va kuchli robusta kofe', 'Смелый и крепкий кофе робуста', 'Bold and strong robusta coffee', 35000, 150, 1, 500, 'Dark', 'Vietnam', 'coffee'),
('Colombian Supreme', 'Kolumbiya Supreme', 'Колумбия Супрем', 'Colombian Supreme', 'Premium Colombian coffee beans', 'Premium Kolumbiya kofe donalari', 'Премиум колумбийские кофейные зерна', 'Premium Colombian coffee beans', 55000, 80, 1, 250, 'Medium', 'Colombia', 'coffee'),
('Instant Coffee Premium', 'Premium eriydigan kofe', 'Растворимый кофе премиум', 'Instant Coffee Premium', 'Quick and convenient instant coffee', 'Tez va qulay eriydigan kofe', 'Быстрый и удобный растворимый кофе', 'Quick and convenient instant coffee', 25000, 200, 1, 100, 'Medium', 'Colombia', 'coffee'),
('Coffee Grinder', 'Kofe maydalagich', 'Кофемолка', 'Coffee Grinder', 'Manual coffee grinder', 'Qo''l bilan ishlaydigan kofe maydalagich', 'Ручная кофемолка', 'Manual coffee grinder', 85000, 25, 1, 800, NULL, 'China', 'accessory'),
('Coffee Filter Papers', 'Kofe filtr qog''ozlari', 'Фильтры для кофе', 'Coffee Filter Papers', 'Premium coffee filter papers', 'Premium kofe filtr qog''ozlari', 'Премиум фильтры для кофе', 'Premium coffee filter papers', 15000, 500, 1, 50, NULL, 'Germany', 'accessory')
ON CONFLICT (id) DO NOTHING;