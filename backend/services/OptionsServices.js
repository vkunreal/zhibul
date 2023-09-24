const { request } = require('../db/database')
const { replaceQuotes } = require('../utils/quotes')
const { writeLog } = require('../writeLog')

class OptionsServices {
  // get all options by item id
  async getOptionsByItemId(id) {
    return await request(`SELECT * FROM options WHERE item_id = "${id}";`)
  }

  // change option by id
  async changeOptionById({ option_id, name, value, is_dropdown, show_menu }) {
    let response

    await request(
      `UPDATE options SET name = "${replaceQuotes(
        name
      )}" WHERE id = "${option_id}"`
    ).catch(() => {
      writeLog('Changing name was failed')
      response = { status: false }
    })

    await request(
      `UPDATE options SET value = "${replaceQuotes(
        value
      )}" WHERE id = "${option_id}"`
    ).catch(() => {
      writeLog('Changing value was failed')
      response = { status: false }
    })

    await request(
      `UPDATE options SET is_dropdown = "${
        is_dropdown ? 1 : 0
      }" WHERE id = "${option_id}"`
    ).catch(() => {
      writeLog('Changing is_dropdown was failed')
      response = { status: false }
    })

    await request(
      `UPDATE options SET show_menu = "${
        show_menu ? 1 : 0
      }" WHERE id = "${option_id}"`
    ).catch(() => {
      writeLog('Changing show_menu was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Option was changed')
      response = { status: true }
    }

    return response
  }

  async changeOptionsPosition(positions) {
    let response
    for (let i = 0; i < positions.length; i++) {
      await request(
        `UPDATE options SET position = "${positions[i].position}" WHERE id = "${positions[i].id}"`
      )
        .then(() => {
          response = { status: true }
        })
        .catch(console.log)
    }
    return response
  }

  // add option by item id
  async addOptionByItemId({ item_id, name, value, position }) {
    let response

    await request(`
      INSERT INTO options (item_id, name, value, position)
      VALUES ("${item_id}", "${replaceQuotes(name)}", "${replaceQuotes(
      value
    )}", "${position}")
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
