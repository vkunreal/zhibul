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
  `phone` BIGINT UNSIGNED NOT NULL UNIQUE,
  `name` VARCHAR(50),
  `company` VARCHAR(100),
  `email` VARCHAR(50) UNIQUE,
  `comment` VARCHAR(300)
);

-- categories
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `parent_id` BIGINT,
  `is_contains` BOOLEAN NOT NULL
);

-- items
DROP TABLE IF EXISTS items;
CREATE TABLE items (
  `id` SERIAL PRIMARY KEY,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `brand` VARCHAR(50) NOT NULL,
  `manufacturer` VARCHAR(50) NOT NULL,
  `count` INT UNSIGNED NOT NULL,
  `price` INT UNSIGNED NOT NULL,

  FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
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
INSERT INTO categories(name, parent_id, is_contains)
VALUES
('Компрессоры', null, true);

-- undercategories
INSERT INTO categories(name, parent_id, is_contains)
VALUES
('С прямым приводом', 1, 0),
('С ременным приводом', 1, 0);

-- items
INSERT INTO items(category_id, name, brand, manufacturer, count, price)
VALUES
(2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/С-24.J1047B', 'Intel', 'Польша', 20, 64800),
(2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/С-24.J1048B', 'Intel', 'Германия', 14, 70200),
(2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/C-50.J1047B', 'Intel', 'Польша', 7, 73900),
(3, 'Chocolate', 'Intel', 'Польша', 20, 64800),
(3, 'Chocolate 2', 'Intel', 'Германия', 14, 70200),
(3, 'Chocolate 3', 'Intel', 'Польша', 7, 73900),
(2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/C-50.J1048B', 'Intel', 'Россия', 11, 77300);

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
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7);