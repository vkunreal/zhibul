const CategoriesServices = require('../services/CategoriesServices')

class CategoriesController {
  // get all categories (body = { parent_id })
  async getAllCategoriesById(req, res) {
    const parent_id = req.body.parent_id

    if (parent_id === undefined) {
      res.status(400).json({ message: 'Parent id is not found' })
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
      res.status(400).json({ message: 'Uncorrected category name' })
    }

    await CategoriesServices.addCategory(name, parent_id).then(() => {
      res.status(201).json({ message: `Category ${name} was created` })
    })
  }

  // delete category (body = { id })
  async deleteCategory(req, res) {
    const categoryId = req.body.id
    await CategoriesServices.deleteCategoryById(categoryId).then(() => {
      res.status(200).json({ message: 'Category was deleted' })
    })
  }
}

module.exports = new CategoriesController()
