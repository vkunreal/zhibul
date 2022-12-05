DROP DATABASE IF EXISTS zhibul;
CREATE DATABASE zhibul;
USE zhibul;

/* Create tables */

-- app variables
DROP TABLE IF EXISTS app_variables;
CREATE TABLE app_variables (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `value` VARCHAR(100) NOT NULL
);

-- users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  `id` SERIAL PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `company` VARCHAR(100),
  `email` VARCHAR(50),
  `comment` VARCHAR(500)
);

-- candidates
DROP TABLE IF EXISTS candidates;
CREATE TABLE candidates (
  `id` SERIAL PRIMARY KEY,
  `phone` VARCHAR(20),
  `name` VARCHAR(50),
  `company` VARCHAR(100),
  `email` VARCHAR(50),
  `comment` VARCHAR(500)
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
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(200),
  `brand` VARCHAR(50) NOT NULL,
  `manufacturer` VARCHAR(50) NOT NULL,
  `price` VARCHAR(20) NOT NULL,

  FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- images
DROP TABLE IF EXISTS images;
CREATE TABLE images (
  `item_id` BIGINT UNSIGNED NOT NULL,
  `src` VARCHAR(200) NOT NULL,

  FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- options
DROP TABLE IF EXISTS options;
CREATE TABLE options (
  `id` SERIAL PRIMARY KEY,
  `item_id` BIGINT UNSIGNED NOT NULL,
  `position` INT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `value` VARCHAR(50) NOT NULL,
  
  FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- pages
DROP TABLE IF EXISTS pages;
CREATE TABLE pages (
  `url` VARCHAR(70) NOT NULL PRIMARY KEY,
  `name` VARCHAR(70) NOT NULL,
  `text` VARCHAR(3000),
  `seo_title` VARCHAR(70),
  `seo_description` VARCHAR(250),
  `seo_keywords` VARCHAR(150)
);

-- page images
DROP TABLE IF EXISTS page_images;
CREATE TABLE page_images (
  `page_url` VARCHAR(70) NOT NULL,
  `src` VARCHAR(200) NOT NULL,

  FOREIGN KEY (page_url) REFERENCES pages(url) ON UPDATE CASCADE ON DELETE CASCADE
);

/* load data */

-- categories
-- INSERT INTO categories(name, parent_id, is_contains)
-- VALUES
-- ('Компрессоры', null, true);

-- undercategories
-- INSERT INTO categories(name, parent_id, is_contains)
-- VALUES
-- ('С прямым приводом', 1, 0),
-- ('С ременным приводом', 1, 0);

-- items
-- INSERT INTO items(category_id, name, brand, manufacturer, price)
-- VALUES
-- (2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/С-24.J1047B', 'Intel', 'Польша', "648"),
-- (2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/С-24.J1048B', 'Intel', 'Германия', "702.02"),
-- (2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/C-50.J1047B', 'Intel', 'Польша', "739"),
-- (3, 'Chocolate', 'Intel', 'Польша', "648"),
-- (3, 'Chocolate 2', 'Intel', 'Германия', "702"),
-- (3, 'Chocolate 3', 'Intel', 'Польша', "739"),
-- (2, 'КОМПРЕССОР ПОРШНЕВОЙ СБ4/C-50.J1048B', 'Intel', 'Россия', "773");

-- options
-- INSERT INTO options(item_id, name, value)
-- VALUES
-- (2, 'Объем ресивера', '24'),
-- (2, 'Цилиндров / Ступеней', '1/1'),
-- (2, 'Литр / Мин', '200'),
-- (2, 'Атмосфер', '8'),
-- (2, 'Мощность (кВт)', '1,5'),
-- (2, 'Напряжение (В)', '220'),
-- (2, 'Вес (кг)', '27');