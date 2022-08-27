const Router = require('express')
const UsersController = require('../controllers/UsersController')

const UsersRouter = new Router()

// users
UsersRouter.get('/users/', UsersController.getAllUsers)
UsersRouter.get('/user/:id', UsersController.getUserById)

UsersRouter.post('/user/', UsersController.addUser)

UsersRouter.delete('/user/', UsersController.deleteUser)

// candidates
UsersRouter.get('/candidates', UsersController.getAllCandidates)
UsersRouter.get('/candidate/:id', UsersController.getCandidateById)

UsersRouter.post('/candidate', UsersController.addCandidate)

UsersRouter.delete('/candidate', UsersController.deleteCandidate)

module.exports = UsersRouter