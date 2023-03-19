const { Router } = require('express')
const { check } = require('express-validator')
const AuthController = require('../controllers/AuthController')

const AuthRouter = new Router()

AuthRouter.post(
  '/login',
  [
    check('name', 'Email must not be empty').notEmpty(),
    check(
      'password',
      'Password length must be between 4 and 32 characters'
    ).isLength({ min: 4, max: 32 }),
  ],
  AuthController.login
)

AuthRouter.post(
  '/singup',
  [
    check('name', 'Username must not be empty').notEmpty(),
    check(
      'password',
      'Password length must be between 4 and 32 characters'
    ).isLength({ min: 4, max: 32 }),
  ],
  AuthController.singup
)

module.exports = AuthRouter
