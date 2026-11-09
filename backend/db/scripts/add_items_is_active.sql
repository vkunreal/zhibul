USE zhibul;

-- Товары: видимость и «только по заказу»
ALTER TABLE items
  ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT TRUE
    AFTER `price_postfix`,
  ADD COLUMN `is_order_only` BOOLEAN NOT NULL DEFAULT FALSE
    AFTER `is_active`;

-- Категории: как сортировать товары на фронте
-- manual    — вручную (поле position)
-- alphabet  — по алфавиту
-- random    — случайно
-- price_asc — по возрастанию цены
-- price_desc — по убыванию цены
-- newest    — по новизне (сначала новые)
ALTER TABLE categories
  ADD COLUMN `sort_mode` ENUM(
    'manual',
    'alphabet',
    'random',
    'price_asc',
    'price_desc',
    'newest'
  ) NOT NULL DEFAULT 'manual'
    AFTER `seo_keywords`;
