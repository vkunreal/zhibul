const { request } = require("../db/database");

class UsersServices {
  // get all users
  async getAllUsers () {
    return await request('SELECT * FROM users;')
  }

  // get user by id
  async getUserById (id) {
    return await request(`SELECT * FROM users WHERE id = "${id}"`, (res) => res[0][0])
  }

  // add a new user
  async addUser ({ phone, name, company, email, comment}) {
    return await request(`
      INSERT INTO users (phone, name, company, email, comment)
      VALUES ("${phone}", "${name}", ${company ? `"${company}"` : null}, ${email ? `"${email}"` : null}, ${comment ? `"${comment}"` : null})
    `)
  }

  // delete user by id
  async deleteUser (id) {
    return await request(`DELETE FROM users WHERE id = "${id}"`)
  }

  // get all candidates
  async getAllCandidates () {
    return await request('SELECT * FROM candidates')
  }

  // get candidate by id
  async getCandidateById (id) {
    return await request(`SELECT * FROM candidates WHERE id = "${id}"`, (res) => res[0][0])
  }

  // add a new canididate
  async addCandidate ({ phone, name, company, email, comment}) {
    return await request(`
      INSERT INTO candidates (phone, name, company, email, comment)
      VALUES ("${phone}", ${name ? `"${name}"` : null}, ${company ? `"${company}"` : null}, ${email ? `"${email}"` : null}, ${comment ? `"${comment}"` : null})
    `)
  }

  // delete candidate by id
  async deleteCandidate (id) {
    return await request(`DELETE FROM candidates WHERE id = "${id}"`)
  }
}

module.exports = new UsersServices()