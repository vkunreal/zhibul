const { Router } = require('express')
const TrailersController = require('../controllers/TrailersController')
const authenticateToken = require('../middlewares/authenticateToken')

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

TrailersRouter.post(
  '/trailer',
  authenticateToken,
  TrailersController.addTrailer
)
TrailersRouter.post(
  '/trailer/option',
  authenticateToken,
  TrailersController.addOption
)
TrailersRouter.post(
  '/trailer/image',
  authenticateToken,
  TrailersController.addImageDB
)

TrailersRouter.put(
  '/trailer',
  authenticateToken,
  TrailersController.changeTrailer
)
TrailersRouter.put(
  '/trailer/option',
  authenticateToken,
  TrailersController.changeOption
)

TrailersRouter.delete(
  '/trailer',
  authenticateToken,
  TrailersController.deleteTrailer
)
TrailersRouter.delete(
  '/trailer/option',
  authenticateToken,
  TrailersController.deleteTrailerOption
)
TrailersRouter.delete(
  '/trailer/image',
  authenticateToken,
  TrailersController.deleteTrailerImage
)

module.exports = TrailersRouter
