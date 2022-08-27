const UsersServices = require("../services/UsersServices")

class UsersController {
  // get all users
  async getAllUsers (req, res) {
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
    const user = req.body

    if (!user.phone) {
      return res.status(400).json({ message: 'Phone is not defined' })
    }

    await UsersServices.addUser(user)

    res.status(201).json(user)
  }

  // delete user by id (body = { id })
  async deleteUser (req, res) {
    const id = req.body.id

    if (!id) {
      return res.status(400).json({ message: 'Id is not defined' })
    }
    
    await UsersServices.deleteUser(id)

    res.status(200).json({ message: 'User was deleted' })
  }

  // get all candidates
  async getAllCandidates (req, res) {
    const candidates = await UsersServices.getAllCandidates()

    res.status(200).json(candidates)
  }

  // get one candidate by id
  async getCandidateById (req, res) {
    const id = req.params.id
    const candidate = await UsersServices.getCandidateById(id)
    
    res.status(200).json(candidate)
  }

  // add a new candidate (body = { phone (required), name, company, email, comment })
  async addCandidate (req, res) {
    const candidate = req.body
    await UsersServices.addCandidate(candidate)

    res.status(201).json(candidate)
  }

  // delete candidate by id
  async deleteCandidate (req, res) {
    const id = req.body.id
    await UsersServices.deleteCandidate(id)

    res.status(200).json({ message: 'Candidate was deleted' })
  }
}

module.exports = new UsersController()