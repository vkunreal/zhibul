const Router = require('express')
const ItemsController = require('../controllers/ItemsController')

const ItemsRouter = new Router()

ItemsRouter.get('/items/', ItemsController.getAllItems)
ItemsRouter.get(
  '/items/without-images',
  ItemsController.getAllItemsWithoutImages
)
ItemsRouter.get('/items/:category_url', ItemsController.getItemsFromUrl)

ItemsRouter.get(
  '/items/without-images/:category_url',
  ItemsController.getItemsWithoutImages
)
ItemsRouter.get('/countries', ItemsController.getCountries)

// ItemsRouter.get('/item/:id', ItemsController.getItem)
ItemsRouter.get('/item/:item_url', ItemsController.getItemFromUrl)
ItemsRouter.get('/item/images/:item_id', ItemsController.getItemImages)

ItemsRouter.post('/item/images/:item_id', ItemsController.loadImages)
ItemsRouter.post('/item/', ItemsController.addItem)
ItemsRouter.put('/item/', ItemsController.changeItem)

ItemsRouter.delete('/item/:id', ItemsController.deleteItemById)
ItemsRouter.delete('/item/delete/image', ItemsController.deleteImage)

module.exports = ItemsRouter
