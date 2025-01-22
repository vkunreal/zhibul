DROP TABLE IF EXISTS slider_images;
DROP TABLE IF EXISTS slides;

CREATE TABLE slides (
  `id` SERIAL PRIMARY KEY,
  `url` VARCHAR(70) NOT NULL,
  `title` VARCHAR(120) NOT NULL,
  `brand` VARCHAR(70) NOT NULL
);

CREATE TABLE slider_images (
  `slide_id` BIGINT UNSIGNED NOT NULL,
  `display` VARCHAR(50) NOT NULL,
  `src` VARCHAR(200) NOT NULL,

  FOREIGN KEY (slide_id) REFERENCES slides(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- slider
INSERT INTO slides (url, title, brand)
VALUES
('/news/depur_new', '', ''),
('/menu/spray_guns/carbonio_evo_hte_clear', '', ''),
('/menu/painting_supplies/360_true_light_evo_meter', '', '');

-- slider images
INSERT INTO slider_images (slide_id, display, src)
VALUES
(1, 'desktop', 'https://api.zhbl.by/slider/desktop-1.png'),
(2, 'desktop', 'https://api.zhbl.by/slider/desktop-2-new.png'),
(3, 'desktop', 'https://api.zhbl.by/slider/desktop-2.png'),
(1, 'mobile', 'https://api.zhbl.by/slider/mobile-1.png'),
(2, 'desktop', 'https://api.zhbl.by/slider/mobile-2-new.png'),
(3, 'mobile', 'https://api.zhbl.by/slider/mobile-2.png');
