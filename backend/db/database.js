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

// request to database function
// const request = async (sqlRequest, func = defaultRequestFunc) => {
//   let data

//   try {
//     await connection
//       .query(sqlRequest)
//       .then((results) => (data = func(results)))
//       .catch((e) => console.error(e))
//   } catch (e) {
//     console.error(e)
//   }

//   return data
// }
const request = (sqlRequest, func = defaultRequestFunc) =>
  new Promise((resolve, reject) => {
    connection
      .query(sqlRequest)
      .then((results) => resolve(func(results)))
      .catch(reject)
  })

module.exports = { connection, request }
