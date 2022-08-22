const Router = require('express')
const ItemsController = require('../controllers/ItemsController')

const ItemsRouter = new Router()

ItemsRouter.get('/items/', ItemsController.getItemsFromCategory)
ItemsRouter.get('/item/', ItemsController.getItem)

ItemsRouter.post(
  '/item/:undercategory_id',
  ItemsController.addItemFromUndercategoryId
)

ItemsRouter.delete('/item/:item_id', ItemsController.deleteItemFromId)

module.exports = ItemsRouter
