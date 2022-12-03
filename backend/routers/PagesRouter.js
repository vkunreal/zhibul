const Router = require('express')
const PagesController = require('../controllers/PagesController')

const PagesRouter = new Router()

PagesRouter.get('/pages/', PagesController.getPages)
PagesRouter.get('/pages/:url', PagesController.getPageByUrl)
PagesRouter.get('/pages/images/:url', PagesController.getPageImages)

PagesRouter.post('/page/', PagesController.addPage)

PagesRouter.put('/page/', PagesController.changePage)

PagesRouter.delete('/page/', PagesController.deletePage)
PagesRouter.delete('/page/image/', PagesController.deleteImage)

module.exports = PagesRouter
