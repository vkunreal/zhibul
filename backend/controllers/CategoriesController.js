const CategoriesServices = require('../services/CategoriesServices')
const path = require('path')
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
      const category = req.body

      if (category.name.length < 2) {
        writeLog('Uncorrected category name')
        return res.status(400).json({ status: false })
      } else if (!category.url) {
        writeLog('Uncorrected category url')
        return res.status(400).json({ status: false })
      }

      const result = await CategoriesServices.addCategory(category)

      writeLog('Category was created')
      res.status(201).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  // change category (body = { id, name })
  async changeCategory(req, res) {
    try {
      const category = req.body

      if (category.name.length < 2) {
        writeLog('Uncorrected category name')
        return res.status(400).json({ status: false })
      } else if (!category.id) {
        writeLog('Uncorrected category id')
        return res.status(400).json({ status: false })
      } else if (!category.url) {
        writeLog('Uncorrected category url')
        return res.status(400).json({ status: false })
      }

      const result = await CategoriesServices.changeCategoryById(category)
      res.status(200).json(result)
    } catch (e) {
      console.error(e)
    }
  }

  async changeCategoryImage(req, res) {
    try {
      const { category_id } = req.params
      if (!req.files) {
        return res.status(400), json({ status: false })
      }
      const file = Object.values(req.files)[0]
      const imageName = `image-${category_id}-${Date.now()}.${file.name
        .split('.')
        .pop()}`
      const imagePath = path.resolve(
        __dirname,
        '..',
        'public',
        'images',
        imageName
      )
      const imageUrl = 'http://localhost:5000/images/' + imageName
      await file.mv(imagePath, async (err) => {
        if (err) {
          console.error(err)
          return res.status(500).json({ status: false })
        }
        await CategoriesServices.changeCategoryImage({
          id: category_id,
          url: imageUrl,
        })
      })

      res.status(201).json({ status: true, url: imageUrl })
    } catch (e) {
      console.error(e)
    }
  }

  async changeCategoryActive(req, res) {
    try {
      const { active, id } = req.body

      if (!id) {
        return res.status(400).json({ status: false })
      }

      await CategoriesServices.changeCategoryActiveById(active, id)

      res.status(200).json({ active })
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
