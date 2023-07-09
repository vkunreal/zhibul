const Router = require('express')
const CategoriesController = require('../controllers/CategoriesController')
const authenticateToken = require('../middlewares/authenticateToken')

const categoriesRouter = new Router()

categoriesRouter.get('/categories/', CategoriesController.getAllCategories)
categoriesRouter.get(
  '/categories/:id',
  CategoriesController.getAllCategoriesById
)

categoriesRouter.post(
  '/category/',
  authenticateToken,
  CategoriesController.addCategory
)

categoriesRouter.put(
  '/category/',
  authenticateToken,
  CategoriesController.changeCategory
)

categoriesRouter.delete(
  '/category/:id',
  authenticateToken,
  CategoriesController.deleteCategory
)

module.exports = categoriesRouter
