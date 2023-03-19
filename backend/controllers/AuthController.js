const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/src/validation-result')
const authServices = require('../services/AuthServices')

const generateAccessToken = (id) => {
  const payload = { id }
  return jwt.sign(payload, process.env.secret_key, { expiresIn: '24h' })
}

class AuthController {
  async login(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors })
      }

      const { name, password } = req.body

      const user = await authServices.getAdminDB(name)

      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: 'Uncorrected data' })
      }

      const validPassword = bcrypt.compareSync(password, user.password_hash)

      if (!validPassword) {
        return res
          .status(400)
          .json({ status: false, message: 'Uncorrected data' })
      }

      const token = generateAccessToken(user.id)
      return res.status(200).json({ token })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: false, message: 'Server error' })
    }
  }

  async singup(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors })
      }

      const { name, password } = req.body

      const candidate = await authServices.getAdminDB(name)

      console.log(candidate)

      if (candidate) {
        return res
          .status(400)
          .json({ status: false, message: 'User already exists' })
      }

      const hashedPassword = bcrypt.hashSync(password, 7)
      const user = await authServices.addAdminDB(name, hashedPassword)

      const token = generateAccessToken(user.id)

      return res
        .status(201)
        .json({ status: true, token, message: 'User was created' })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: false, message: 'Server error' })
    }
  }
}

module.exports = new AuthController()
