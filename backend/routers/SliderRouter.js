const Router = require('express')
const SliderController = require('../controllers/SliderController')

const SliderRouter = new Router()

SliderRouter.get('/slider', SliderController.getSlider)

module.exports = SliderRouter
