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

-- admins
DROP TABLE IF EXISTS admins;
CREATE TABLE admins (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(120) UNIQUE NOT NULL,
  `password_hash` VARCHAR(200) NOT NULL
);

-- users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  `id` SERIAL PRIMARY KEY,
  `phone` VARCHAR(20) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `company` VARCHAR(100),
  `email` VARCHAR(70),
  `comment` TEXT,
  `time` VARCHAR(120)
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
  `position` INT default 0,
  `name` VARCHAR(50) NOT NULL,
  `description` text,
  `image` VARCHAR(150),
  `url` VARCHAR(70) NOT NULL,
  `parent_id` BIGINT,
  `is_contains` BOOLEAN NOT NULL,
  `seo_title` TEXT,
  `seo_description` TEXT,
  `seo_keywords` TEXT
);

-- items
DROP TABLE IF EXISTS items;
CREATE TABLE items (
  `id` SERIAL PRIMARY KEY,
  `position` INT default 0,
  `code` VARCHAR(6) UNIQUE NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `url` VARCHAR(120) NOT NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `description` TEXT,
  `brand` VARCHAR(50),
  `manufacturer_id` BIGINT UNSIGNED NOT NULL,
  `price` VARCHAR(50) NOT NULL,
  `seo_title` TEXT,
  `seo_description` TEXT,
  `seo_keywords` TEXT,

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

-- files
DROP TABLE IF EXISTS files;
CREATE TABLE files (
  `item_id` BIGINT UNSIGNED NOT NULL,
  `src` VARCHAR(200) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `icon` VARCHAR(70) NOT NULL,

  FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- options
DROP TABLE IF EXISTS options;
CREATE TABLE options (
  `id` SERIAL PRIMARY KEY,
  `item_id` BIGINT UNSIGNED NOT NULL,
  `position` INT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `value` VARCHAR(150) NOT NULL,
  `show_item` INT default 1,
  `show_menu` INT default 0,
  `is_dropdown` INT default 0,
  
  FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- pages
DROP TABLE IF EXISTS pages;
CREATE TABLE pages (
  `url` VARCHAR(70) UNIQUE NOT NULL PRIMARY KEY,
  `name` VARCHAR(70) NOT NULL,
  `text` TEXT,
  `seo_title` VARCHAR(70),
  `seo_description` TEXT,
  `seo_keywords` TEXT
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

-- trailer rent
DROP TABLE IF EXISTS trailer_rent;
CREATE TABLE trailer_rent (
  `id` SERIAL PRIMARY KEY,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `url` VARCHAR(150) UNIQUE NOT NULL,
  `image_src` TEXT,
  `seo_title` TEXT,
  `seo_description` TEXT,
  `seo_keywords` TEXT
);

-- trailers
DROP TABLE IF EXISTS trailers;
CREATE TABLE trailers (
  `id` SERIAL PRIMARY KEY,
  `trailer_rent_id` BIGINT UNSIGNED NOT NULL,
  `title` VARCHAR(250) NOT NULL,
  `text` text NOT NULL,

  FOREIGN KEY (trailer_rent_id) REFERENCES trailer_rent(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- trailer options
DROP TABLE IF EXISTS trailer_options;
CREATE TABLE trailer_options (
  `id` SERIAL PRIMARY KEY,
  `trailer_id` BIGINT UNSIGNED NOT NULL,
  `icon` VARCHAR(120) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `text` VARCHAR(250) NOT NULL,

  FOREIGN KEY (trailer_id) REFERENCES trailer_rent(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- trailer images
DROP TABLE IF EXISTS trailer_images;
CREATE TABLE trailer_images (
  `trailer_id` BIGINT UNSIGNED NOT NULL,
  `src` VARCHAR(200) NOT NULL,

  FOREIGN KEY (trailer_id) REFERENCES trailer_rent(id) ON UPDATE CASCADE ON DELETE CASCADE
);