DROP DATABASE IF EXISTS zhibul;
CREATE DATABASE zhibul;
USE zhibul;

/* Create tables */

-- users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  `id` SERIAL PRIMARY KEY,
  `phone` BIGINT NOT NULL,
  `name` VARCHAR(50),
  `company` VARCHAR(100),
  `email` VARCHAR(50),
  `comment` VARCHAR(300)
);

-- candidates
DROP TABLE IF EXISTS candidates;
CREATE TABLE candidates (
  `id` SERIAL PRIMARY KEY,
  `phone` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(50),
  `company` VARCHAR(100),
  `email` VARCHAR(50),
  `comment` VARCHAR(300)
);

-- categories
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL
);

-- undercategories
DROP TABLE IF EXISTS undercategories;
CREATE TABLE undercategories (
  `id` SERIAL PRIMARY KEY,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,

  FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- items
DROP TABLE IF EXISTS items;
CREATE TABLE items (
  `id` SERIAL PRIMARY KEY,
  `undercategory_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `manufacturer` VARCHAR(50) NOT NULL,
  `count` INT UNSIGNED NOT NULL,
  `price` INT UNSIGNED NOT NULL,

  FOREIGN KEY (undercategory_id) REFERENCES undercategories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- options
DROP TABLE IF EXISTS options;
CREATE TABLE options (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `value` VARCHAR(50) NOT NULL
);

-- items <-> options
DROP TABLE IF EXISTS items_options;
CREATE TABLE items_options (
  `item_id` BIGINT UNSIGNED NOT NULL,
  `option_id` BIGINT UNSIGNED NOT NULL,

  FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (option_id) REFERENCES options(id) ON UPDATE CASCADE ON DELETE CASCADE
);

/* load data */

-- categories
INSERT INTO categories(name)
VALUES
('Компрессоры');

-- undercategories
INSERT INTO undercategories(category_id, name)
VALUES
(1, 'С прямым приводом'),
(1, 'С ременным приводом');

-- items
INSERT INTO items(undercategory_id, name, brand, manufacturer, count, price)
VALUES
(1, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/С-24.J1047B', 'Intel', 'Польша', 20, 64800),
(1, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/С-24.J1048B', 'Intel', 'Германия', 14, 70200),
(1, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/C-50.J1047B', 'Intel', 'Польша', 7, 73900),
(2, 'Chocolate', 'Intel', 'Польша', 20, 64800),
(2, 'Chocolate 2', 'Intel', 'Германия', 14, 70200),
(2, 'Chocolate 3', 'Intel', 'Польша', 7, 73900),
(1, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/C-50.J1048B', 'Intel', 'Россия', 11, 77300);

-- options
INSERT INTO options(name, value)
VALUES
('Объем ресивера', '24'),
('Цилиндров / Ступеней', '1/1'),
('Литр / Мин', '200'),
('Атмосфер', '8'),
('Мощность (кВт)', '1,5'),
('Напряжение (В)', '220'),
('Вес (кг)', '27');

-- items_options
INSERT INTO items_options(item_id, option_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);