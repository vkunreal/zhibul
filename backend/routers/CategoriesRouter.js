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

categoriesRouter.post(
  '/category/image/:category_id',
  authenticateToken,
  CategoriesController.changeCategoryImage
)

categoriesRouter.put(
  '/category/',
  authenticateToken,
  CategoriesController.changeCategory
)

categoriesRouter.put(
  '/category/active',
  authenticateToken,
  CategoriesController.changeCategoryActive
)

categoriesRouter.delete(
  '/category/:id',
  authenticateToken,
  CategoriesController.deleteCategory
)

module.exports = categoriesRouter
