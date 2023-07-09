const Router = require('express')
const PagesController = require('../controllers/PagesController')
const authenticateToken = require('../middlewares/authenticateToken')

const PagesRouter = new Router()

PagesRouter.get('/pages/', PagesController.getPages)
PagesRouter.get('/pages/:url', PagesController.getPageByUrl)
PagesRouter.get('/pages/images/:url', PagesController.getPageImages)

PagesRouter.post('/page/', authenticateToken, PagesController.addPage)

PagesRouter.put('/page/', authenticateToken, PagesController.changePage)

PagesRouter.delete('/page/', authenticateToken, PagesController.deletePage)
PagesRouter.delete(
  '/page/image/',
  authenticateToken,
  PagesController.deleteImage
)

module.exports = PagesRouter
