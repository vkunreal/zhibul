USE zhibul;

DROP TABLE IF EXISTS news_media;
DROP TABLE IF EXISTS news_files;
DROP TABLE IF EXISTS news;
CREATE TABLE news (
    `id` SERIAL PRIMARY KEY,
    `url` VARCHAR(200) UNIQUE NOT NULL,
    `title` TEXT NOT NULL,
    `text` TEXT NOT NULL,
    `short_text` TEXT NOT NULL,
    `date` VARCHAR(100) NOT NULL,
    `seo_title` TEXT NOT NULL,
    `seo_description` TEXT NOT NULL,
    `seo_keywords` TEXT NOT NULL
);

CREATE TABLE news_media (
    `news_id` BIGINT UNSIGNED NOT NULL,
    `src` TEXT NOT NULL,
    `position` INT NOT NULL,

    FOREIGN KEY (news_id) REFERENCES news(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE news_files (
    `news_id` BIGINT UNSIGNED NOT NULL,
    `src` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `icon` VARCHAR(70) NOT NULL,

    FOREIGN KEY (news_id) REFERENCES news(id) ON UPDATE CASCADE ON DELETE CASCADE
);
