const { Router } = require('express')
const FilesController = require('../controllers/FilesController')
const authenticateToken = require('../middlewares/authenticateToken')

const FilesRouter = new Router()

FilesRouter.get('/files/:item_id', FilesController.getFiles)

FilesRouter.post('/file', authenticateToken, FilesController.addFile)

FilesRouter.delete('/file', authenticateToken, FilesController.deleteFile)

module.exports = FilesRouter
