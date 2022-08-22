const mysql = require('mysql2')

// connection to database
const connection = mysql
  .createConnection({
    host: 'localhost',
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
  })
  .promise()

const defaultRequestFunc = (results) => results[0]

// request to database function
const request = async (sqlRequest, func = defaultRequestFunc) => {
  let data

  try {
    await connection
      .query(sqlRequest)
      .then((results) => (data = func(results)))
      .catch((e) => console.error(e))
  } catch (e) {
    console.error(e)
  }

  return data
}

module.exports = { connection, request }
