INSERT INTO categories (name, url, parent_id, is_contains)
VALUES
('Запчасти для краскораспылителей', 'zapasnyechasti', null, true),
('Компрессоры', 'kompressory', null, true),
('Краскораспылители', 'kraskoraspyliteli', null, true),
('Пневмоинструмент', 'pnevmoinstrument', null, true),
('Соеденительные элементы Aignep', 'soedinitelnyeelementy', null, true),
('Шланги и трубки', 'trubki_shlangi_rvd', null, false),
('Бачки', 'zapasnyechasti', 1, false),
('Регуляторы давления', 'zapasnyechasti', 1, false),
('Серия Carbonio', 'test1', 1, false),
('Серия Ego', 'test2', 1, false),
('Серия Genesi', 'test4', 1, false),
('Серия Kombat', 'test5', 1, false),
('Серия Slim', 'test6', 1, false),
('Серия Xlight', 'test7', 1, false),
('Компрессоры с прямым приводом', 'kompressoryspryamymprivodom', 2, false),
('Компрессоры с ременным приводом', 'kompressoryporshnevye', 2, false),
('Серия Carbonio', 'test8', 3, false),
('Серия Ego', 'test9', 3, false),
('Серия Genesi', 'test10', 3, false),
('Серия Kombat', 'test11', 3, false),
('Серия Slim', 'test12', 3, false),
('Серия Xlight', 'test13', 3, false),
('Гвоздезабивные пистолеты', 'gvozdezabivnyepistolety', 4, false),
('Скобозабивные пистолеты', 'skobozabivnie_pistoleti', 4, false),
('Шпилько-штифтозабивной пистолет', 'shtiftozabivnyepistolety', 4, false),
('Быстросъемные соединения', 'test14', 5, false),
('Глушители', 'test15', 5, false),
('Клапаны', 'test16', 5, false),
('Краны', 'test17', 5, false),
('Резьбовые переходники', 'test18', 5, false),
('Цанговые соединения', 'test19', 5, false);

-- test
INSERT INTO users (phone, name, company, email, comment)
VALUES
('+7 812 055-33-25', 'Виктор', 'ООО Прямые руки', 'pryam@ruki.ru', 'Прошу связаться со мной по поводу распылителя'),
('+7 892 885-53-52', 'Алексей', 'ИП Петров А. И.', 'fdsa@ruwerki.ru', 'Рассматривайте предложения о сотрудничестве?'),
('+7 911 100-89-43', 'Анна', 'ООО Эконом маркет', 'econom@market.ru', 'Здраствуйте, мне нужна информация по товару'),
('+7 874 535-88-30', 'Дмитрий', 'АО Рестор', 'restore@gmail.com', 'Готовы сделать заказ'),
('+7 534 832-78-15', 'Анастасия', 'ООО ДНС', 'anastasia.dns@yandex.ru', 'Можно ли забрать 2 распылителя 18 апреля?'),
('+7 973 453-22-48', 'Даниил', 'ИП Магаданов Д. А.', 'guru12@mail.ru', 'Возможно сделать заказ оптом?'),
('+7 354 877-35-45', 'Ольга', 'ООО АлЭкспромт', 'alXspromt@mail.ru', 'Нужна косультация по товару'),
('+7 783 453-978-35', 'Тимофей', 'ООО Пятерочка', '5opka@yandex.ru', 'Позвоните по номеру +7 923 453 23 43'),
('+7 351 543-78-12', 'Екатерина', 'ООО Иностранные Товары', 'foreignitems@gmail.com', 'Нужно уточнить про доставку'),
('+7 678 456-15-67', 'Владимир', 'РУВД', 'gosorgan@mvd.ru', 'Есть ли еще цвета?');

INSERT INTO candidates (phone, name)
VALUES
('Алгормат', '+918 44 125-22-84'),
('Дед мороз', '+111 111-11-11'),
('Виталий', '+7 981 865-45-38'),
('Валентин', '+33 25 354-87-78'),
('Картонуз', '+375 29 545-21-87');

-- items
INSERT INTO items (category_id, name, description, brand, manufacturer, price)
VALUES
(9, 'КРАСКОРАСПЫЛИТЕЛЬ WALCOM SLIM XLIGHT HTE SR', 'Поставка осуществляется в кейсе без редуктора-регулятора давления.', 'WALCOM', 'WALCOM (Италия)', '390.00'),
(9, 'КРАСКОРАСПЫЛИТЕЛЬ WALCOM SLIM XLIGHT HTE', 'Поставка осуществляется в кейсе с редуктором-регулятором давления.', 'WALCOM', 'WALCOM (Италия)', '440.00'),
(9, 'КРАСКОРАСПЫЛИТЕЛЬ WALCOM SLIM XLIGHT HVLP', 'Поставка осуществляется в кейсе с редуктором-регулятором давления.', 'WALCOM', 'WALCOM (Италия)', '465.00'),
(9, 'КРАСКОРАСПЫЛИТЕЛЬ WALCOM GENESI HTE', 'Поставка осуществляется в кейсе с регулятором давления воздуха ТОР с манометром.', 'WALCOM', 'WALCOM (Италия)', '1065.00'),
(11, 'Cola', 'Sugar water', 'WALCOM', 'WALCOM (Италия)', '390.00'),
(11, 'Pepsi', 'Sugar water', 'WALCOM', 'WALCOM (Италия)', '440.00'),
(15, 'Cs go', 'Game', 'WALCOM', 'WALCOM (Италия)', '465.00'),
(15, 'Dota', 'Game', 'WALCOM', 'WALCOM (Италия)', '1065.00');

-- images
INSERT INTO images (item_id, src)
VALUES
(1, 'http://localhost:5000/images/Genesi%20HTE.png'),
(2, 'http://localhost:5000/images/Genesi%20HVLP.png'),
(3, 'http://localhost:5000/images/GenesiGEO.png');

INSERT INTO pages (url, name, text, seo_title, seo_description, seo_keywords)
VALUES
('delivery1', 'Доставка и оплата', 'Раздел доставки', 'Доставка', 'Доставка очень удобный раздел', 'доставка'),
('delivery2', 'Доставка и оплата', 'Раздел доставки', 'Доставка', 'Доставка очень удобный раздел', 'доставка'),
('delivery3', 'Доставка и оплата', 'Раздел доставки', 'Доставка', 'Доставка очень удобный раздел', 'доставка'),
('delivery4', 'Доставка и оплата', 'Раздел доставки', 'Доставка', 'Доставка очень удобный раздел', 'доставка'),
('delivery5', 'Доставка и оплата', 'Раздел доставки', 'Доставка', 'Доставка очень удобный раздел', 'доставка');