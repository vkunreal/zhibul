const CategoriesServices = require('../services/CategoriesServices')
const { writeLog } = require('../writeLog')

class CategoriesController {
  // get all categories (body = { parent_id })
  async getAllCategoriesById(req, res) {
    const parent_id = req.body.parent_id

    if (parent_id === undefined || !String(parent_id).trim()) {
      writeLog('Parent id is not found')
      res.status(400).json({ status: false })
    } else {
      const categories = await CategoriesServices.getAllCategoriesByParentId(
        parent_id
      )
      res.status(200).json(categories)
    }
  }

  // add new category (body = { name, parent_id })
  async addCategory(req, res) {
    const { name, parent_id } = req.body

    if (name.length < 2) {
      writeLog('Uncorrected category name')
      res.status(400).json({ status: false })
    }

    const result = await CategoriesServices.addCategory(name, parent_id)

    writeLog('Category was created')
    res.status(201).json(result)
  }

  // delete category (body = { id })
  async deleteCategory(req, res) {
    const categoryId = req.body.id

    if (!categoryId || !String(categoryId).trim()) {
      writeLog('Category id is not found')
      return res.status(400).json({ status: false })
    }

    const result = await CategoriesServices.deleteCategoryById(categoryId)

    writeLog('Category was deleted')
    res.status(200).json(result)
  }
}

module.exports = new CategoriesController()
