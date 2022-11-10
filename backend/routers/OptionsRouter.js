const Router = require('express')
const OptionsController = require('../controllers/OptionsController')

const OptionsRouter = new Router()

OptionsRouter.get('/options/:item_id', OptionsController.getOptions)

OptionsRouter.put('/option', OptionsController.changeOption)
OptionsRouter.put('/option/positions', OptionsController.changeOptionsPosition)

OptionsRouter.post('/option', OptionsController.addOption)

OptionsRouter.delete('/option', OptionsController.deleteOption)

module.exports = OptionsRouter
