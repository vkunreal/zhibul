const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

class VariablesServices {
  async getVariables() {
    return await request('SELECT * FROM app_variables')
  }

  async createVariable(name, value) {
    await request(
      `INSERT INTO app_variables(name, value) VALUES ("${name}", "${value}")`
    )
  }

  async changeVariable(id, name, value) {
    let response

    await request(
      `UPDATE app_variables SET name = "${name}" WHERE id = "${id}"`
    ).catch(() => {
      writeLog('Changing variable was failed')
      response = { status: false }
    })

    await request(
      `UPDATE app_variables SET value = "${value}" WHERE id = "${id}"`
    ).catch(() => {
      writeLog('Changing variable was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Changing variable was success')
      response = { status: true }
    }

    return response
  }

  async deleteVariableById(id) {
    let response

    await request(`DELETE FROM app_variables WHERE id = "${id}"`).catch(() => {
      writeLog('Deleting variable was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Deleting variable was success')
      response = { status: true }
    }

    return response
  }
}

module.exports = new VariablesServices()
