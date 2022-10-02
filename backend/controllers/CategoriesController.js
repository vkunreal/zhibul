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
    const { name, parent_id } = req.body

    console.log(req.body)

    if (name.length < 2) {
      writeLog('Uncorrected category name')
      res.status(400).json({ status: false })
    }

    const result = await CategoriesServices.addCategory(name, parent_id)

    writeLog('Category was created')
    res.status(201).json(result)
  }

  // change category (body = { id, name })
  async changeCategory(req, res) {
    const { id, name } = req.body

    if (name.length < 2) {
      writeLog('Uncorrected category name')
      res.status(400).json({ status: false })
    }

    const result = await CategoriesServices.changeCategoryById(id, name)
    res.status(200).json(result)
  }

  // delete category (body = { id })
  async deleteCategory(req, res) {
    const categoryId = req.params.id
    console.log(categoryId, !!categoryId)

    if (categoryId === undefined || !String(categoryId).trim()) {
      writeLog('Category id is not found')
      return res.status(400).json({ status: false })
    }

    const result = await CategoriesServices.deleteCategoryById(categoryId)

    writeLog('Category was deleted')
    res.status(200).json(result)
  }
}

module.exports = new CategoriesController()
