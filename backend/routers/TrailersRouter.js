const { Router } = require('express')
const TrailersController = require('../controllers/TrailersController')

const TrailersRouter = new Router()

TrailersRouter.get('/trailers-rent', TrailersController.getTrailersRent)
TrailersRouter.get('/trailers-rent/:url', TrailersController.getTrailersByUrl)
TrailersRouter.get('/trailers-union', TrailersController.getTrailersUnion)
TrailersRouter.get('/trailers', TrailersController.getTrailers)
TrailersRouter.get(
  '/trailer/:trailer_id/options',
  TrailersController.getTrailerOptions
)
TrailersRouter.get('/trailer/:trailer_id/', TrailersController.getTrailerImages)

TrailersRouter.post('/trailer', TrailersController.addTrailer)
TrailersRouter.post('/trailer/option', TrailersController.addOption)
TrailersRouter.post('/trailer/image', TrailersController.addImageDB)

TrailersRouter.put('/trailer', TrailersController.changeTrailer)
TrailersRouter.put('/trailer/option', TrailersController.changeOption)

TrailersRouter.delete('/trailer', TrailersController.deleteTrailer)
TrailersRouter.delete('/trailer/option', TrailersController.deleteTrailerOption)
TrailersRouter.delete('/trailer/image', TrailersController.deleteTrailerImage)

module.exports = TrailersRouter
