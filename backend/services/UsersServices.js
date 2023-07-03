const { request } = require('../db/database')
const { writeLog } = require('../writeLog')

class UsersServices {
  // get all users
  async getAllUsers() {
    return await request('SELECT * FROM users;')
  }

  // get user by id
  async getUserById(id) {
    return await request(
      `SELECT * FROM users WHERE id = "${id}"`,
      (res) => res[0][0]
    )
  }

  // add a new user
  async addUser({ phone, name, company, email, comment }) {
    let response

    const time = new Date().getTime()

    await request(`
      INSERT INTO users (phone, name, company, email, comment, time)
      VALUES ("${phone}", "${name}", ${company ? `"${company}"` : null}, ${
      email ? `"${email}"` : null
    }, ${comment ? `"${comment}"` : null}, "${time}")
    `).catch(() => {
      writeLog('Creating user was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('User was created')
      response = { status: true }
    }

    return response
  }

  // delete user by id
  async deleteUser(id) {
    await request(`DELETE FROM users WHERE id = "${id}"`).then(() =>
      writeLog('User was created')
    )
    return { status: true }
  }

  // get all candidates
  async getAllCandidates() {
    return await request('SELECT * FROM candidates')
  }

  // get candidate by id
  async getCandidateById(id) {
    return await request(
      `SELECT * FROM candidates WHERE id = "${id}"`,
      (res) => res[0][0]
    )
  }

  // add a new canididate
  async addCandidate({ phone, name, company, email, comment }) {
    let response

    await request(`
      INSERT INTO candidates (phone, name, company, email, comment)
      VALUES ("${phone}", ${name ? `"${name}"` : null}, ${
      company ? `"${company}"` : null
    }, ${email ? `"${email}"` : null}, ${comment ? `"${comment}"` : null})
    `).catch(() => {
      writeLog('Creating candidate was failed')
      response = { status: false }
    })

    if (!response) {
      writeLog('Candidate was created')
      response = { status: true }
    }

    return response
  }

  // delete candidate by id
  async deleteCandidate(id) {
    await request(`DELETE FROM candidates WHERE id = "${id}"`)
    writeLog('User was deleted')
    return { status: true }
  }
}

module.exports = new UsersServices()
