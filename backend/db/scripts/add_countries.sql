USE zhibul;

INSERT INTO countries(`name`)
VALUES
('Япония'),
('Финляндия');

ALTER TABLE valutes MODIFY title VARCHAR(15);

INSERT INTO valutes(`title`, `value`)
VALUES
('USD_NB', 2.85),
('EUR_NB', 3.41);