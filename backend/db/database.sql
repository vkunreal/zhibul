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

DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL
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
  `url` VARCHAR(70) NOT NULL,
  `parent_id` BIGINT,
  `is_contains` BOOLEAN NOT NULL,
  `seo_title` VARCHAR(70),
  `seo_description` VARCHAR(250),
  `seo_keywords` VARCHAR(150)
);

-- items
DROP TABLE IF EXISTS items;
CREATE TABLE items (
  `id` SERIAL PRIMARY KEY,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `url` VARCHAR(120) NOT NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `description` VARCHAR(500),
  `brand` VARCHAR(50),
  `manufacturer_id` BIGINT UNSIGNED NOT NULL,
  `price` VARCHAR(20) NOT NULL,
  `seo_title` VARCHAR(70),
  `seo_description` VARCHAR(250),
  `seo_keywords` VARCHAR(150),

  FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (manufacturer_id) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE CASCADE
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

-- slider
DROP TABLE IF EXISTS slides;
CREATE TABLE slides (
  `id` SERIAL PRIMARY KEY,
  `url` VARCHAR(70) NOT NULL,
  `title` VARCHAR(120) NOT NULL,
  `brand` VARCHAR(70) NOT NULL
);

-- slider images
DROP TABLE IF EXISTS slider_images;
CREATE TABLE slider_images (
  `slide_id` BIGINT UNSIGNED NOT NULL,
  `display` VARCHAR(50) NOT NULL,
  `src` VARCHAR(200) NOT NULL,

  FOREIGN KEY (slide_id) REFERENCES slides(id) ON UPDATE CASCADE ON DELETE CASCADE
);
