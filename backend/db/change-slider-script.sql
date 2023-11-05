-- slider
DROP TABLE IF EXISTS slider_images;
DROP TABLE IF EXISTS slides;
CREATE TABLE slides (
  `id` SERIAL PRIMARY KEY,
  `url` VARCHAR(70) NOT NULL,
  `title` TEXT NOT NULL,
  `brand` TEXT NOT NULL
);

-- slider images
CREATE TABLE slider_images (
  `slide_id` BIGINT UNSIGNED NOT NULL,
  `display` VARCHAR(50) NOT NULL,
  `src` VARCHAR(200) NOT NULL,

  FOREIGN KEY (slide_id) REFERENCES slides(id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO slides (url, title, brand)
VALUES
('/menu/seriya_carbonio_evo', 'WALCOM GENESI CARBONIO 360 EVO', ''),
('/menu/seriya_genesi_alluminio', 'WALCOM GENESI ALLUMINIO', 'Genesi Alluminio пришел на замену серии Genesi Top Line, которая была снята с производства. Преимущества этой серии заключается в увеличенной производительности, уменьшении веса и улучшенной эргономики.'),
('/menu/nasosy', 'НАСОСЫ ШЕСТЕРЕННЫЕ МОСГИДРОПРИВОД', 'Замкнутый производственный цикл, опыт специалистов завода позволяют выпускать продукцию, отвечающую требованиям государственных стандартов. Насосы шестеренные НШ 10У-3, НШ 14У-3, НШ 16У-3, НШ 32У-3, НШ 32А-3, НШ 50У-3, НШ 50А-3, НШ 100А-3.');

-- slider images
INSERT INTO slider_images (slide_id, display, src)
VALUES
(1, 'desktop', 'https://api.zhbl.by/slider/new-slide1.png'),
(2, 'desktop', 'https://api.zhbl.by/slider/new-slide2.png'),
(3, 'desktop', 'https://api.zhbl.by/slider/new-slide3.png'),
(1, 'mobile', 'https://api.zhbl.by/slider/mob-slide1.png'),
(2, 'mobile', 'https://api.zhbl.by/slider/mob-slide2.png'),
(3, 'mobile', 'https://api.zhbl.by/slider/mob-slide3.png');