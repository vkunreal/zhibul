const Router = require('express')
const VariablesController = require('../controllers/VariablesController')

const VariablesRouter = new Router()

VariablesRouter.get('/variables', VariablesController.getVariables)

VariablesRouter.put('/variable', VariablesController.changeVariable)

VariablesRouter.post('/variable', VariablesController.addVariable)

VariablesRouter.delete('/variable', VariablesController.deleteVariable)

module.exports = VariablesRouter
