CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microfiber Cloths", "Basics", 14.99, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blue Heels", "Footwear", 39.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels", "Basics", 10.99, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Running Sneakers", "Footwear", 69.99, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stainless Steel Pot Set", "Kitchen", 99.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pot Holders", "Kitchen", 14.99, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beach Umbrella's", "Seasonal", 39.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sunscreen", "Seasonal", 14.99, 125);

SELECT * FROM products ORDER BY department_name