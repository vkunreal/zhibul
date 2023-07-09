const Router = require('express')
const VariablesController = require('../controllers/VariablesController')
const authenticateToken = require('../middlewares/authenticateToken')

const VariablesRouter = new Router()

VariablesRouter.get('/variables', VariablesController.getVariables)

VariablesRouter.put(
  '/variable',
  authenticateToken,
  VariablesController.changeVariable
)

VariablesRouter.post(
  '/variable',
  authenticateToken,
  VariablesController.addVariable
)

VariablesRouter.delete(
  '/variable',
  authenticateToken,
  VariablesController.deleteVariable
)

module.exports = VariablesRouter
