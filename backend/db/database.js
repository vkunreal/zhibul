const mysql = require('mysql2')

// connection to database
const connection = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise()

const defaultRequestFunc = (results) => results[0]

// Защита от SQL-инъекций: значения никогда не вклеиваются в текст запроса,
// а передаются отдельно в params. mysql2 сам подставляет их на место плейсхолдеров
// и экранирует по типу, поэтому кавычки и слэши во вводе остаются обычным текстом.
//
//   ?        — значение: строка, число, null, массив для IN (?)
//              request('SELECT * FROM news WHERE url = ?', [url])
//   SET ?    — объект { колонка: значение } для INSERT и UPDATE
//              request('INSERT INTO files SET ?', [{ item_id, src }])
//              request('UPDATE items SET ? WHERE id = ?', [{ name, price }, id])
//
// Ключи объекта становятся именами колонок, поэтому объект собирается в коде
// из явного списка полей — req.body целиком передавать нельзя.
// Имена колонок, ORDER BY и другие куски SQL плейсхолдером не подставить:
// они берутся только из белого списка в коде.
const request = (sql, params = [], func = defaultRequestFunc) =>
  connection.query(sql, params).then(func)

module.exports = { connection, request }
