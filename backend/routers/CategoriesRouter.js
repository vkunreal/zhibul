const Router = require('express')
const CategoriesController = require('../controllers/CategoriesController')

const categoriesRouter = new Router()

categoriesRouter.post('/categories/', CategoriesController.getAllCategoriesById)

categoriesRouter.post('/category/', CategoriesController.addCategory)

categoriesRouter.delete('/category/', CategoriesController.deleteCategory)

module.exports = categoriesRouter
