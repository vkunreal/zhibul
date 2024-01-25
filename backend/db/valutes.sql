USE zhibul;

DROP TABLE IF EXISTS valutes;
CREATE TABLE valutes (
    `id` SERIAL PRIMARY KEY,
    `title` VARCHAR(3) UNIQUE NOT NULL,
    `value` FLOAT NOT NULL
);

INSERT INTO valutes (title, value)
VALUES
('USD', 3.26),
('EUR', 3.56),
('RUB', 0.036);

ALTER TABLE items
ADD valute_id BIGINT UNSIGNED NOT NULL DEFAULT 1;

ALTER TABLE items
ADD purchase_price FLOAT;

ALTER TABLE items
ADD profitabilaty FLOAT;

ALTER TABLE items
ADD price_postfix VARCHAR(50);

ALTER TABLE items
ADD FOREIGN KEY (valute_id) REFERENCES valutes(id);
