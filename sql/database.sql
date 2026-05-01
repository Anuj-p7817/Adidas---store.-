-- Create database
CREATE DATABASE IF NOT EXISTS adidas_store;
USE adidas_store;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(50),
    zip_code VARCHAR(10),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(10, 2)
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    size VARCHAR(10),
    color VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample products
INSERT INTO products (name, description, category, price, stock, image) VALUES
('Adidas Ultra Boost', 'Premium running shoe with ultra boost technology', 'shoes', 189.99, 50, 'images/ultraboost.jpg'),
('Adidas NMD', 'Sleek and comfortable shoe', 'shoes', 129.99, 40, 'images/nmd.jpg'),
('Adidas T-Shirt', 'Classic Adidas cotton t-shirt', 'apparel', 39.99, 100, 'images/tshirt.jpg'),
('Adidas Running Shorts', 'Breathable running shorts', 'apparel', 49.99, 60, 'images/shorts.jpg'),
('Adidas Sports Cap', 'Adjustable sports cap', 'accessories', 24.99, 80, 'images/cap.jpg'),
('Adidas Water Bottle', 'Insulated water bottle', 'accessories', 34.99, 120, 'images/bottle.jpg');