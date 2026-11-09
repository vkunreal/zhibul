const { request } = require('../db/database')

class AuthServices {
  async getAdminDB(name) {
    return await request(
      'SELECT * FROM admins WHERE name = ?',
      [name],
      (res) => res[0][0]
    )
  }

  async addAdminDB(name, password_hash) {
    return await request('INSERT INTO admins SET ?', [{ name, password_hash }])
  }
}

module.exports = new AuthServices()
