const UsersServices = require('../services/UsersServices')
const { sendRequestToBot } = require('../utils/tgBot')
const { writeLog } = require('../writeLog')

class UsersController {
  // get all users
  async getAllUsers(req, res) {
    const users = await UsersServices.getAllUsers()

    res.status(200).json(users)
  }

  // get one user by id
  async getUserById(req, res) {
    const id = req.params.id

    const user = await UsersServices.getUserById(id)

    res.status(200).json(user)
  }

  // add a new user (body = { phone (required), name (required), company, email, comment })
  async addUser(req, res) {
    try {
      const user = req.body

      if (!user.phone || !user.phone.trim()) {
        writeLog('Phone is not defined')
        return res.status(400).json({ status: false })
      } else if (!user.name || !user.name.trim()) {
        writeLog('Name is not defined')
        return res.status(400).json({ status: false })
      }

      const result = await UsersServices.addUser(user)

      await sendRequestToBot(user)

      res.status(201).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  // delete user by id (body = { id })
  async deleteUser(req, res) {
    try {
      const id = req.body.id

      if (!id) {
        writeLog('Id is not defined')
        return res.status(400).json({ status: false })
      }

      const result = await UsersServices.deleteUser(id)

      res.status(200).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  // get all candidates
  async getAllCandidates(req, res) {
    const candidates = await UsersServices.getAllCandidates()

    res.status(200).json(candidates)
  }

  // get one candidate by id
  async getCandidateById(req, res) {
    const id = req.params.id
    const candidate = await UsersServices.getCandidateById(id)

    res.status(200).json(candidate)
  }

  // add a new candidate (body = { phone (required), name, company, email, comment })
  async addCandidate(req, res) {
    try {
      const candidate = req.body

      if (!candidate.phone || !candidate.phone.trim()) {
        writeLog('Phone is not defined')
        return res.status(400).json({ status: false })
      }

      const result = await UsersServices.addCandidate(candidate)

      res.status(201).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  // delete candidate by id
  async deleteCandidate(req, res) {
    try {
      const id = req.body.id
      const result = await UsersServices.deleteCandidate(id)

      res.status(200).json(result)
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = new UsersController()
