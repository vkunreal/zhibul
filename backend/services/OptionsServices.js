const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

class OptionsServices {
  // get all options by item id
  async getOptionsByItemId(id) {
    return await request(`SELECT * FROM options WHERE item_id = "${id}";`)
  }

  // change option by id
  async changeOptionById({ option_id, name, value }) {
    let response

    await request(
      `UPDATE options SET name = "${name}" WHERE id = "${option_id}"`
    ).catch(() => {
      writeLog('Changing name was failed')
      response = { status: false }
    })

    await request(
      `UPDATE options SET value = "${value}" WHERE id = "${option_id}"`
    ).catch(() => {
      ;+writeLog('Changing value was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Option was changed')
      response = { status: true }
    }

    return response
  }

  // add option by item id
  async addOptionByItemId({ item_id, name, value }) {
    let response

    await request(`
      INSERT INTO options (item_id, name, value)
      VALUES ("${item_id}", "${name}", "${value}")
    `).catch(() => {
      writeLog('Adding option was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Option was added')
      response = { status: true }
    }

    return response
  }

  // delete option by id
  async deleteOptionById(option_id) {
    let response

    await request(`DELETE FROM options WHERE id = "${option_id}"`).catch(() => {
      writeLog('Deleting option was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Deleting option was success')
      response = { status: true }
    }

    return response
  }
}

module.exports = new OptionsServices()
