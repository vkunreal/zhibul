USE zhibul;

-- Артикул необязателен: пустое значение хранится как NULL.
-- Несколько NULL в UNIQUE-колонке MySQL допускает.
ALTER TABLE items
  MODIFY COLUMN `code` VARCHAR(6) NULL DEFAULT NULL;
