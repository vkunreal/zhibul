const { request } = require('../db/database')

class ValutesServices {
  async getAllValutes() {
    return await request('SELECT * FROM valutes')
  }

  async changeValuteValue(id, value) {
    await request('UPDATE valutes SET value = ? WHERE id = ?', [value, id])
  }
}

module.exports = new ValutesServices()
