const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

class OptionsServices {
  // get all options by item id
  async getOptionsByItemId(id) {
    return await request(
      'SELECT * FROM options WHERE item_id = ? ORDER BY position ASC, id ASC',
      [id],
    )
  }

  // change option by id
  async changeOptionById({ option_id, name, value, is_dropdown, show_menu }) {
    let response

    await request('UPDATE options SET ? WHERE id = ?', [
      {
        name,
        value,
        is_dropdown: is_dropdown ? 1 : 0,
        show_menu: show_menu ? 1 : 0,
      },
      option_id,
    ]).catch(() => {
      writeLog('Changing option was failed')
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
      await request('UPDATE options SET position = ? WHERE id = ?', [
        positions[i].position,
        positions[i].id,
      ])
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

    await request('INSERT INTO options SET ?', [
      { item_id, name, value, position },
    ]).catch(() => {
      writeLog('Adding option was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Option was added')
      response = { status: true }
    }

    return response
  }

  async deleteOptionsByItemId(item_id) {
    const safeId = parseInt(item_id, 10)
    if (!safeId) return { status: false }

    await request('DELETE FROM options WHERE item_id = ?', [safeId])
    writeLog('Options were deleted')
    return { status: true }
  }

  // delete option by id
  async deleteOptionById(option_id) {
    let response

    await request('DELETE FROM options WHERE id = ?', [option_id]).catch(() => {
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
