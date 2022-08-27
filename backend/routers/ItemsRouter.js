const Router = require('express')
const ItemsController = require('../controllers/ItemsController')

const ItemsRouter = new Router()

ItemsRouter.get('/items/', ItemsController.getItemsFromCategory)
ItemsRouter.get('/item/:id', ItemsController.getItem)

ItemsRouter.delete('/item/', ItemsController.deleteItemById)

module.exports = ItemsRouter
