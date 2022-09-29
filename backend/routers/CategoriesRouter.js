const Router = require('express')
const CategoriesController = require('../controllers/CategoriesController')

const categoriesRouter = new Router()

categoriesRouter.get('/categories/', CategoriesController.getAllCategories)
categoriesRouter.get(
  '/categories/:id',
  CategoriesController.getAllCategoriesById
)

categoriesRouter.post('/category/', CategoriesController.addCategory)

categoriesRouter.delete('/category/:id', CategoriesController.deleteCategory)

module.exports = categoriesRouter
