const Router = require('express')
const OptionsController = require('../controllers/OptionsController')
const authenticateToken = require('../middlewares/authenticateToken')

const OptionsRouter = new Router()

OptionsRouter.get('/options/:item_id', OptionsController.getOptions)

OptionsRouter.put('/option', authenticateToken, OptionsController.changeOption)
OptionsRouter.put(
  '/option/positions',
  authenticateToken,
  OptionsController.changeOptionsPosition
)

OptionsRouter.post('/option', authenticateToken, OptionsController.addOption)

OptionsRouter.delete(
  '/options/:item_id',
  authenticateToken,
  OptionsController.deleteOptions,
)
OptionsRouter.delete(
  '/option',
  authenticateToken,
  OptionsController.deleteOption
)

module.exports = OptionsRouter
