INSERT INTO categories (name, parent_id, is_contains)
VALUES
('Главная', null, false),
('Крепеж для пневмоинструмента', null, true),
('Пневмоинструмент', null, true),
('Компрессоры', null, true),
('Комплектующие и расходные материалы', null, true),
('Ремонт пневмоинструмента', null, false),
('Аренда автоприцепа', null, false),
('Контакты', null, false),
('Скобы', 2, false),
('Штифты', 2, false),
('Шпилька', 2, false),
('Гвозди', 2, false),
('Скобозабивные пистолеты', 3, false),
('Штифто-шпилькозабивные пистолеты', 3, false),
('Гвоздезабивные пистолеты', 3, false),
('Краскораспылители', 3, false),
('Обдувочные пистолеты', 3, false),
('С прямым приводом', 4, false),
('С ременным приводом', 4, false),
('Соединительные элементы', 5, false),
('Расходные материалы', 5, false),
('Запчасти для компрессоров и пневмоинструмента', 5, false),
-- test
('Test 1', 9, false),
('Test 2', 9, false),
('Test 3', 9, false);