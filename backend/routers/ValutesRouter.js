const { Router } = require('express')
const ValutesController = require('../controllers/ValutesController')

const ValutesRouter = new Router()

ValutesRouter.get('/valutes', ValutesController.getAllValutes)

ValutesRouter.put('/valutes', ValutesController.changeValute)

module.exports = ValutesRouter
