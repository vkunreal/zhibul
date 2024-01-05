const { Router } = require('express')
const NewsController = require('../controllers/NewsController')
const authenticateToken = require('../middlewares/authenticateToken')

const NewsRouter = new Router()

NewsRouter.get('/news', NewsController.getNews)
NewsRouter.get('/news/id/:id', NewsController.getNewsItem)
NewsRouter.get('/news/:url', NewsController.getNewsItemByUrl)
NewsRouter.get('/news/media/:news_id', NewsController.getNewsItemMedia)

NewsRouter.post('/news/', authenticateToken, NewsController.addNewsItem)
NewsRouter.post(
  '/news/media/:news_id',
  authenticateToken,
  NewsController.addNewsMedia
)

NewsRouter.put('/news/', authenticateToken, NewsController.changeNewsItem)

NewsRouter.delete('/news/', authenticateToken, NewsController.deleteNewsItem)
NewsRouter.delete(
  '/news/media',
  authenticateToken,
  NewsController.deleteNewsImage
)

module.exports = NewsRouter
