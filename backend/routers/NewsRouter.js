const { Router } = require('express')
const NewsController = require('../controllers/NewsController')

const NewsRouter = new Router()

NewsRouter.get('/news', NewsController.getNews)
NewsRouter.get('/news/:id', NewsController.getNewsItem)

module.exports = NewsRouter
