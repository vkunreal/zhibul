USE zhibul;

-- Артикул необязателен: у копии товара он остаётся пустым.
-- Несколько NULL в UNIQUE-колонке MySQL допускает.
ALTER TABLE items
  MODIFY COLUMN `code` VARCHAR(6) NULL DEFAULT NULL;
