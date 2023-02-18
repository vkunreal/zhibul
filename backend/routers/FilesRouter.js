const { Router } = require('express')
const FilesController = require('../controllers/FilesController')

const FilesRouter = new Router()

FilesRouter.get('/files/:item_id', FilesController.getFiles)

FilesRouter.post('/file', FilesController.addFile)

FilesRouter.delete('/file', FilesController.deleteFile)

module.exports = FilesRouter
