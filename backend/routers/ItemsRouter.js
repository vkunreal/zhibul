const Router = require('express')
const ItemsController = require('../controllers/ItemsController')

const ItemsRouter = new Router()

ItemsRouter.get('/items/', ItemsController.getItemsFromCategory)
ItemsRouter.get('/item/:id', ItemsController.getItem)

ItemsRouter.post('/item/', ItemsController.addItem)
ItemsRouter.post('/change/item', ItemsController.changeItem)

ItemsRouter.delete('/item/', ItemsController.deleteItemById)

module.exports = ItemsRouter
