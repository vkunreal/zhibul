const CategoriesServices = require('../services/CategoriesServices')
const { writeLog } = require('../writeLog')

class CategoriesController {
  async getAllCategories(req, res) {
    const categories = await CategoriesServices.getAllCategories()

    res.status(200).json(categories)
  }

  // get all categories (body = { parent_id })
  async getAllCategoriesById(req, res) {
    const parent_id = req.params.parent_id

    const categories = await CategoriesServices.getAllCategoriesByParentId(
      parent_id
    )
    res.status(200).json(categories)
  }

  // add new category (body = { name, parent_id })
  async addCategory(req, res) {
    try {
      const { name, parent_id } = req.body

      if (name.length < 2) {
        writeLog('Uncorrected category name')
        res.status(400).json({ status: false })
      }

      const result = await CategoriesServices.addCategory(name, parent_id)

      writeLog('Category was created')
      res.status(201).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  // change category (body = { id, name })
  async changeCategory(req, res) {
    try {
      const { id, name } = req.body

      if (name.length < 2) {
        writeLog('Uncorrected category name')
        res.status(400).json({ status: false })
      }

      const result = await CategoriesServices.changeCategoryById(id, name)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  // delete category (body = { id })
  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id

      if (categoryId === undefined || !String(categoryId).trim()) {
        writeLog('Category id is not found')
        return res.status(400).json({ status: false })
      }

      const result = await CategoriesServices.deleteCategoryById(categoryId)

      writeLog('Category was deleted')
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = new CategoriesController()
