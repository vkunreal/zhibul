const Router = require('express')
const ItemsController = require('../controllers/ItemsController')

const ItemsRouter = new Router()

ItemsRouter.get('/items/', ItemsController.getItemsFromCategory)
ItemsRouter.get('/item/:id', ItemsController.getItem)
ItemsRouter.get('/item/images/:item_id', ItemsController.getItemImages)

ItemsRouter.post('/item/images/:item_id', ItemsController.loadImages)
ItemsRouter.post('/item/', ItemsController.addItem)
ItemsRouter.put('/item/', ItemsController.changeItem)

ItemsRouter.delete('/item/:id', ItemsController.deleteItemById)
ItemsRouter.delete('/item/delete/image', ItemsController.deleteImage)

module.exports = ItemsRouter
